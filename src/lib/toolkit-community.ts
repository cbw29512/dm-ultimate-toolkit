import type { ToolkitProject } from "./toolkit-schema";

export const COMMUNITY_PROJECTS: readonly ToolkitProject[] = [
  { id: "dinner-dice", title: "Dinner, Dice & Dragons", category: "community", icon: "people",
    description: "Bring players, Game Masters, and venues together for a real game night.",
    destination: { kind: "external", url: "https://dinnerdiceanddragons.netlify.app/" }, repository: "dinnerdiceanddragons" },
  { id: "guild", title: "Light Tower Guild", category: "community", icon: "people",
    description: "A welcoming way into tabletop games, community resources, teaching, and local chapters.",
    destination: { kind: "external", url: "https://lighttowertabletopguild.netlify.app/" }, repository: "FlorenceRPGWebsite" },
  { id: "learn", title: "Learn to Play TTRPG", category: "community", icon: "book",
    description: "Player and GM learning paths with clear system and edition boundaries.",
    destination: { kind: "external", url: "https://cbw29512.github.io/L2PTTRPG/" }, repository: "L2PTTRPG" },
];
