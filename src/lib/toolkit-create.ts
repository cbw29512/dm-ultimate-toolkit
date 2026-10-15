import type { ToolkitProject } from "./toolkit-schema";

export const CREATE_PROJECTS: readonly ToolkitProject[] = [
  { id: "oneshot-forge", title: "One-Shot Forge", category: "create", icon: "book", featured: true,
    description: "Prepare your next adventure with scene-based packages, NPCs, clues, and a GM runner.",
    destination: { kind: "external", url: "https://99centoneshot.netlify.app/" }, repository: "oneshot-forge" },
  { id: "tomeforge", title: "TomeForge Journal", category: "create", icon: "pen",
    description: "Give your character or campaign a tome. Keep your notes in a flexible, offline-friendly journal.",
    destination: { kind: "external", url: "https://tomeforge-journal.netlify.app/" }, repository: "tomeforge-journal" },
  { id: "black-ink", title: "Black-Ink Bestiary", category: "create", icon: "art",
    description: "The monster-art production studio: habitat-driven coloring pages, reviewed and approved one at a time.",
    destination: { kind: "source", url: "https://github.com/cbw29512/blackinkbestiary" }, repository: "blackinkbestiary" },
  { id: "session-scribe", title: "Tabletop Scribe", category: "create", icon: "mic",
    description: "The local session-recording and transcript/recap project. Separate from the simple notes workbench.",
    destination: { kind: "source", url: "https://github.com/cbw29512/tabletop-scribe" }, repository: "tabletop-scribe" },
  { id: "tavern", title: "Black Anvil Tavern", category: "create", icon: "spark",
    description: "A seeded tavern generator and location project for giving your party somewhere to meet.",
    destination: { kind: "source", url: "https://github.com/cbw29512/black-anvil-tavern" }, repository: "black-anvil-tavern" },
  { id: "fantasy-voice", title: "Fantasy Language Audio", category: "create", icon: "mic",
    description: "Planned spoken fantasy dialogue and gibberish audio. The voice workflow is still a specification.",
    destination: { kind: "source", url: "https://github.com/cbw29512/DNDLanguageTranslator" }, repository: "DNDLanguageTranslator" },
];
