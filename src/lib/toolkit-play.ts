import type { ToolkitProject } from "./toolkit-schema";

export const PLAY_PROJECTS: readonly ToolkitProject[] = [
  { id: "combat-companion", title: "Combat Companion", category: "play", icon: "swords", featured: true,
    description: "Your DM combat desk. Monster cards, initiative, spell rolls, and encounter tracking.",
    destination: { kind: "external", url: "https://cbw29512.github.io/DnD-Combat-Companion/" }, repository: "DnD-Combat-Companion" },
  { id: "blocks", title: "DND Blocks", category: "play", icon: "map", featured: true,
    description: "Build a room, place the party, and bring your battlefield to life with blocks.",
    destination: { kind: "external", url: "https://cbw29512.github.io/DNDblocksbattlemaps/" }, repository: "DNDblocksbattlemaps" },
  { id: "dice", title: "Nothing But a Dice Roller", category: "play", icon: "dice",
    description: "Roll 3D dice, save shortcuts, and give your dice a personality of their own.",
    destination: { kind: "external", url: "https://nothingbutattrpgdiceroller.netlify.app/" }, repository: "nothingbutadiceroller" },
  { id: "healing", title: "Cleric in a Box", category: "play", icon: "heart",
    description: "Share your party's homebrew artifact, divine charges, potions, and cleric scrolls.",
    destination: { kind: "external", url: "https://cbw29512.github.io/healingbox/" }, repository: "healingbox" },
  { id: "player-display", title: "Portable Player Display", category: "play", icon: "cards",
    description: "Laptop controls and a player-facing screen for rolls, initiative, buffs, and debuffs. Runs locally.",
    destination: { kind: "source", url: "https://github.com/cbw29512/DNDcellphonehelper" }, repository: "DNDcellphonehelper" },
  { id: "iron-pit", title: "The Iron Pit", category: "play", icon: "swords",
    description: "A place reserved for your automated combat simulator. Its engine and current site stay separate.",
    destination: { kind: "placeholder" } },
];
