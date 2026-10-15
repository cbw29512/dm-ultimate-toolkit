import { TOOLKIT_PROJECTS } from "./toolkit-projects";

export type HubGroup = "Play" | "Prep" | "Table" | "Guild" | "Adventures" | "Notes";
export type HubApp = {
  slug: string;
  title: string;
  blurb: string;
  group: HubGroup;
  badge: string;
  to?: "/pit/combat" | "/pit/dice" | "/pit/heal" | "/pit/forge" | "/pit/bestiary" | "/pit/maps" | "/pit/cards" | "/pit/tables" | "/pit/guild" | "/pit/courtroom" | "/pit/adventures" | "/pit/tome" | "/pit/scribe" | "/pit/translator";
  live?: string;
  repo?: string;
};
export const HUB_GROUPS: HubGroup[] = ["Play", "Prep", "Table", "Guild", "Adventures", "Notes"];

// Existing review marks remain attached to the same specialist tools.
const LEGACY_SLUGS: Record<string, string> = {
  "character-forge": "forge-live", dice: "dice-live", "dinner-dice": "dinner-dice",
  tomeforge: "tome-live", "rules-cards": "dungeon-cards", "dungeon-cards": "dnd-cards",
  "living-table": "web-ttrpg", "campaign-characters": "character-forge-old",
  "dm-forge": "bestiary", healing: "healing-box", guild: "ltg-live", learn: "l2p",
};
const GROUPS: Record<string, HubGroup> = { play: "Play", prepare: "Prep", create: "Adventures", community: "Table" };

export const HUB_APPS: HubApp[] = TOOLKIT_PROJECTS.map((project) => ({
  slug: LEGACY_SLUGS[project.id] ?? project.id,
  title: project.title,
  blurb: project.description,
  group: GROUPS[project.category],
  badge: project.destination.kind === "external" ? "Linked tool" : project.destination.kind === "placeholder" ? "Reserved" : "Project source",
  // A reserved entry has no external site, repository link, or batch-review target.
  ...(project.destination.kind === "external" ? { live: project.destination.url } : {}),
  ...(project.destination.kind === "placeholder" ? { to: "/pit/combat" as const } : {}),
  ...(project.repository ? { repo: `https://github.com/cbw29512/${project.repository}` } : {}),
}));

export function appsIn(group: HubGroup) {
  return HUB_APPS.filter((app) => app.group === group);
}
export function grouped(list: HubApp[]) {
  return HUB_GROUPS.map((group) => ({ group, apps: list.filter((app) => app.group === group) })).filter((group) => group.apps.length > 0);
}
export function liveApps() {
  return HUB_APPS.filter((app) => Boolean(app.live));
}
export function workbenchApps() {
  return HUB_APPS.filter((app) => Boolean(app.to) && !app.live && app.badge !== "Reserved");
}
export function repoOnlyApps() {
  return HUB_APPS.filter((app) => Boolean(app.repo) && !app.live && !app.to);
}
export function liveBySlug(slug: string) {
  return liveApps().find((app) => app.slug === slug);
}
export function liveNeighbors(slug: string) {
  const list = liveApps();
  const index = list.findIndex((app) => app.slug === slug);
  return { index, total: list.length, prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined, current: index >= 0 ? list[index] : undefined };
}
export function hubHref(app: HubApp) {
  return app.live ?? app.to ?? app.repo ?? "/";
}
export function hubIsInternal(app: HubApp) {
  return Boolean(app.to) && !app.live;
}
