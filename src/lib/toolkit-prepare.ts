import type { ToolkitProject } from "./toolkit-schema";

export const PREPARE_PROJECTS: readonly ToolkitProject[] = [
  { id: "character-forge", title: "Character Forge", category: "prepare", icon: "hero", featured: true,
    description: "Build a rules-checked 2014 or 2024 pregen, save your party, and print character sheets.",
    destination: { kind: "external", url: "https://characterforgerdnd.netlify.app/" }, repository: "dnd-character-forge" },
  { id: "dm-forge", title: "DM Forge", category: "prepare", icon: "spark",
    description: "Campaign prep, encounters, NPCs, loot, magic items, and printable table packets.",
    destination: { kind: "external", url: "https://cbw29512.github.io/monstercardforge/" }, repository: "monstercardforge" },
  { id: "rules-cards", title: "Rules & Roll Cards", category: "prepare", icon: "cards",
    description: "Browse edition-labeled rules, spell and monster references, printable cards, and workspaces.",
    destination: { kind: "external", url: "https://cbw29512.github.io/DungeonCards/?system=dnd&page=compendium" }, repository: "DungeonCards" },
  { id: "dungeon-cards", title: "Dungeon Cards", category: "prepare", icon: "cards",
    description: "The standalone card-adventure library, hero packs, printable cards, and DM/player table.",
    destination: { kind: "external", url: "https://cbw29512.github.io/DNDCards/" }, repository: "DNDCards" },
  { id: "living-table", title: "The Living Table", category: "prepare", icon: "map",
    description: "Explore the scene-based seven-slot DM board and saved adventure workflow.",
    destination: { kind: "external", url: "https://cbw29512.github.io/DNDWebTTRPG/" }, repository: "DNDWebTTRPG" },
  { id: "campaign-characters", title: "Campaign Character Manager", category: "prepare", icon: "hero",
    description: "CharacterForge's separate account, campaign, template, and character-management project.",
    destination: { kind: "source", url: "https://github.com/cbw29512/CharacterForge" }, repository: "CharacterForge" },
];
