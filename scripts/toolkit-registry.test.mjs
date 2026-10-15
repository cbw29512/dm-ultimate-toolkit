import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

// Exercise the actual TypeScript registry in Node without adding a runtime dependency.
const directory = await mkdtemp(join(tmpdir(), "toolkit-registry-"));
let registry;
let hub;
let audit;
let decisions;
let backup;
try {
  await writeFile(join(directory, "package.json"), '{"type":"module"}');
  for (const name of ["toolkit-schema", "toolkit-play", "toolkit-prepare", "toolkit-create", "toolkit-community", "toolkit-projects", "hub", "toolkit-audit-schema", "toolkit-audit-data", "toolkit-legacy-backup"]) {
    const source = await readFile(new URL(`../src/lib/${name}.ts`, import.meta.url), "utf8");
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
    await writeFile(join(directory, `${name}.js`), outputText.replace(/from "(\.\/[^".]+)"/g, 'from "$1.js"'));
  }
  registry = await import(pathToFileURL(join(directory, "toolkit-projects.js")).href);
  hub = await import(pathToFileURL(join(directory, "hub.js")).href);
  audit = await import(pathToFileURL(join(directory, "toolkit-audit-data.js")).href);
  decisions = await import(pathToFileURL(join(directory, "toolkit-audit-schema.js")).href);
  backup = await import(pathToFileURL(join(directory, "toolkit-legacy-backup.js")).href);
} catch (error) {
  console.error("[toolkit:test] Cannot load the project registry", error);
  throw error;
} finally {
  await rm(directory, { recursive: true, force: true });
}

test("Iron Pit has one non-actionable placeholder and cannot enter batch review", () => {
  const records = registry.TOOLKIT_PROJECTS.filter((project) => /iron.?pit/i.test(project.id));
  assert.equal(records.length, 1);
  assert.deepEqual(records[0].destination, { kind: "placeholder" });
  assert.equal(records[0].repository, undefined);
  assert.ok(hub.liveApps().every((app) => !/iron.?pit/i.test(`${app.slug} ${app.live} ${app.repo}`)));
  assert.equal(hub.liveBySlug("iron-pit-live"), undefined);
});

test("project identities and destinations remain unique and safe", () => {
  const projects = registry.TOOLKIT_PROJECTS;
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
  assert.equal(new Set(hub.HUB_APPS.map((app) => app.slug)).size, hub.HUB_APPS.length);
  for (const project of projects) {
    assert.ok(["play", "prepare", "create", "community"].includes(project.category));
    if (project.destination.kind !== "placeholder") {
      const url = new URL(project.destination.url);
      assert.equal(url.protocol, "https:");
      assert.equal(url.username, "");
      assert.equal(url.password, "");
      if (project.destination.kind === "source") assert.equal(url.hostname, "github.com");
    }
  }
});

test("category and multiword search compose and reset predictably", () => {
  assert.equal(registry.filterProjects("  COMBAT desk  ", "play")[0]?.id, "combat-companion");
  assert.equal(registry.filterProjects("combat desk", "community").length, 0);
  assert.ok(registry.filterProjects("", "prepare").every((project) => project.category === "prepare"));
  assert.equal(registry.filterProjects("not-a-real-project", "all").length, 0);
  assert.equal(registry.filterProjects("", "all").length, registry.TOOLKIT_PROJECTS.length);
});

test("recent projects and existing review identities survive consolidation", () => {
  for (const id of ["combat-companion", "blocks", "oneshot-forge", "black-ink", "player-display"]) {
    assert.ok(registry.TOOLKIT_PROJECTS.some((project) => project.id === id));
  }
  assert.equal(hub.liveBySlug("forge-live")?.repo, "https://github.com/cbw29512/dnd-character-forge");
  assert.equal(hub.liveBySlug("dice-live")?.repo, "https://github.com/cbw29512/nothingbutadiceroller");
});

test("audit covers each linked project and does not certify page delivery as a complete workflow", () => {
  const external = registry.TOOLKIT_PROJECTS.filter((project) => project.destination.kind === "external").map((project) => project.id).sort();
  assert.deepEqual(audit.PROJECT_AUDITS.map((entry) => entry.id).sort(), external);
  assert.ok(!audit.PROJECT_AUDITS.some((entry) => entry.id === "iron-pit"));
  for (const entry of audit.PROJECT_AUDITS) {
    assert.ok(Number.isFinite(Date.parse(entry.checkedAt)));
    if (entry.fullAuditCompleted) assert.equal(entry.workflow, "browser-tested");
    if (entry.workflow === "pending" || entry.workflow === "source-tested") assert.equal(entry.fullAuditCompleted, false);
  }
});

test("every retired duplicate has a usable selected specialist destination", () => {
  const routes = decisions.RETIRED_DUPLICATES.map((entry) => entry.route);
  assert.equal(new Set(routes).size, routes.length);
  for (const decision of decisions.RETIRED_DUPLICATES) {
    const project = registry.TOOLKIT_PROJECTS.find((entry) => entry.id === decision.projectId);
    assert.equal(project?.destination.kind, "external");
    assert.ok(decision.reason.length > 20);
  }
});

test("old local saves export byte-for-byte even when their format is unknown", () => {
  for (const raw of ['{"state":{"deck":["old-card"]}}', "earlier unsupported format", ""]) {
    const reads = [];
    const result = backup.earlierWorkbenchBackup({ getItem: (key) => { reads.push(key); return raw; } });
    assert.equal(result.status, "available");
    assert.equal(JSON.parse(result.json).originalValue, raw);
    assert.deepEqual(reads, ["iron-pit-hall"]);
  }
  assert.equal(backup.earlierWorkbenchBackup({ getItem: () => null }).status, "empty");
});
