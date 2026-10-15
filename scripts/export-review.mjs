import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

// The private review uses the real production renderer, with no second UI implementation.
const root = process.cwd();
const output = resolve(root, "review-dist");
const serverDirectory = resolve(root, ".netlify/functions-internal/server/_ssr");

async function sourceRoutes(directory, prefix = "") {
  const routes = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) routes.push(...await sourceRoutes(join(directory, entry.name), path));
    else if (entry.name.endsWith(".tsx") && !path.includes("$") && !["__root.tsx", "route.tsx"].includes(entry.name)) {
      routes.push(path.replace(/\/index\.tsx$/, "/").replace(/\.tsx$/, ""));
    }
  }
  return routes;
}

try {
  const files = await readdir(serverDirectory);
  const registryFile = files.find((file) => /^hub-.*\.mjs$/.test(file));
  if (!registryFile) throw new Error("Build the Netlify target before exporting the review.");
  const hub = await import(pathToFileURL(join(serverDirectory, registryFile)).href);
  const liveApps = Object.values(hub).find((value) => typeof value === "function" && value.name === "liveApps");
  if (!liveApps) throw new Error("The built hub does not expose the expected review registry.");
  const { default: server } = await import(pathToFileURL(join(serverDirectory, "ssr.mjs")).href);
  const routes = [...new Set([...await sourceRoutes(join(root, "src/routes")), ...liveApps().map((app) => `/batch/${app.slug}`)])];
  // Only this generated directory is replaced; application/user storage is never read.
  await rm(output, { recursive: true, force: true });
  await cp(resolve(root, "dist"), output, { recursive: true });
  let rendered = 0;
  for (const route of routes) {
    const response = await server.fetch(new Request(`https://toolkit-review.example${route}`));
    if (response.status >= 300 && response.status < 400) continue;
    if (response.status !== 200) throw new Error(`Cannot render ${route}: HTTP ${response.status}`);
    const html = await response.text();
    if (!html.includes("<html")) throw new Error(`The renderer returned no document for ${route}`);
    const directory = join(output, route.replace(/^\//, ""));
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, "index.html"), html);
    rendered += 1;
  }
  console.log(`[toolkit] Exported ${rendered} real app routes for the private review.`);
} catch (error) {
  console.error("[toolkit] Could not export the private review", error);
  process.exitCode = 1;
}
