export type HubGroup = "Play" | "Prep" | "Table" | "Guild" | "Adventures" | "Notes";

export type HubApp = {
  slug: string;
  title: string;
  blurb: string;
  group: HubGroup;
  badge: string;
  to?:
    | "/pit/combat"
    | "/pit/dice"
    | "/pit/heal"
    | "/pit/forge"
    | "/pit/bestiary"
    | "/pit/maps"
    | "/pit/cards"
    | "/pit/tables"
    | "/pit/guild"
    | "/pit/courtroom"
    | "/pit/adventures"
    | "/pit/tome"
    | "/pit/scribe"
    | "/pit/translator";
  live?: string;
  repo?: string;
};

export const HUB_GROUPS: HubGroup[] = ["Play", "Prep", "Table", "Guild", "Adventures", "Notes"];

export const HUB_APPS: HubApp[] = [
  {
    slug: "iron-pit-starter",
    title: "Iron Pit · starter fight",
    blurb: "Level 1 fighter vs two goblins. One attack each, the round loops until someone drops. Not the certified engine.",
    group: "Play",
    badge: "On this hub",
    to: "/pit/combat",
  },
  {
    slug: "iron-pit-live",
    title: "The Iron Pit",
    blurb: "The live 5e 2024 combat simulator. Full engine on its own site.",
    group: "Play",
    badge: "Live",
    live: "https://ironpit.netlify.app",
    repo: "https://github.com/cbw29512/D20-ironpit",
  },
  {
    slug: "d20-iron-pit-dup",
    title: "D20-iron-pit",
    blurb: "Duplicate repo of the pit. Stays listed until you say to pull it.",
    group: "Play",
    badge: "Repo",
    repo: "https://github.com/cbw29512/D20-iron-pit",
  },
  {
    slug: "dice-hub",
    title: "Dice at the table",
    blurb: "Notation roller on this hub. d20, advantage, a log.",
    group: "Play",
    badge: "On this hub",
    to: "/pit/dice",
  },
  {
    slug: "dice-live",
    title: "Nothing But A Dice Roller",
    blurb: "The live 3D TTRPG dice roller.",
    group: "Play",
    badge: "Live",
    live: "https://nothingbutattrpgdiceroller.netlify.app",
    repo: "https://github.com/cbw29512/nothingbutadiceroller",
  },
  {
    slug: "healing-box",
    title: "Healing Box",
    blurb: "Potions and a short rest for the starter fighter. Drink, don’t invent HP.",
    group: "Play",
    badge: "On this hub",
    to: "/pit/heal",
    repo: "https://github.com/cbw29512/healingbox",
  },
  {
    slug: "l2p",
    title: "L2P TTRPG",
    blurb: "Learn-to-play table experiment.",
    group: "Play",
    badge: "Repo",
    repo: "https://github.com/cbw29512/L2PTTRPG",
  },
  {
    slug: "web-ttrpg",
    title: "DNDWebTTRPG",
    blurb: "Seven-slot DM board. Folded into Tome on this hub; repo stays listed.",
    group: "Play",
    badge: "Repo",
    to: "/pit/tome",
    repo: "https://github.com/cbw29512/DNDWebTTRPG",
  },
  {
    slug: "forge-hub",
    title: "Character Forge",
    blurb: "Pregens that refuse illegal SRD mixes. Print the sheet.",
    group: "Prep",
    badge: "On this hub",
    to: "/pit/forge",
  },
  {
    slug: "forge-live",
    title: "D&D 5e Character Forge",
    blurb: "The live rules-validated pregen generator.",
    group: "Prep",
    badge: "Live",
    live: "https://characterforgerdnd.netlify.app",
    repo: "https://github.com/cbw29512/dnd-character-forge",
  },
  {
    slug: "forge-live-alt",
    title: "D&D Character Forge",
    blurb: "Second live forge deploy. Listed until you pick one door.",
    group: "Prep",
    badge: "Live",
    live: "https://dnd-character-forge.netlify.app",
  },
  {
    slug: "character-forge-old",
    title: "CharacterForge",
    blurb: "Earlier AI character builder. Superseded, still listed.",
    group: "Prep",
    badge: "Repo",
    repo: "https://github.com/cbw29512/CharacterForge",
  },
  {
    slug: "bestiary",
    title: "Monster Card Forge",
    blurb: "SRD-shaped stat blocks for the table.",
    group: "Prep",
    badge: "On this hub",
    to: "/pit/bestiary",
    repo: "https://github.com/cbw29512/monstercardforge",
  },
  {
    slug: "maps",
    title: "Dungeon Maps",
    blurb: "Carve a keep, a delve, or a ruin. Print the floor.",
    group: "Prep",
    badge: "On this hub",
    to: "/pit/maps",
    repo: "https://github.com/cbw29512/DungeonMaps",
  },
  {
    slug: "dungeon-gate",
    title: "DungeonGate",
    blurb: "Gate experiment next to the maps.",
    group: "Prep",
    badge: "Repo",
    repo: "https://github.com/cbw29512/DungeonGate",
  },
  {
    slug: "cards",
    title: "Cards & loot",
    blurb: "Spells, gear, conditions, a hoard. Print the deck.",
    group: "Prep",
    badge: "On this hub",
    to: "/pit/cards",
  },
  {
    slug: "dungeon-cards",
    title: "DungeonCards",
    blurb: "Card experiment. Folded into Cards on this hub.",
    group: "Prep",
    badge: "Repo",
    repo: "https://github.com/cbw29512/DungeonCards",
  },
  {
    slug: "dnd-cards",
    title: "DNDCards",
    blurb: "Another card repo. Listed until you say otherwise.",
    group: "Prep",
    badge: "Repo",
    repo: "https://github.com/cbw29512/DNDCards",
  },
  {
    slug: "tables",
    title: "Local tables",
    blurb: "Florence seats. Player, GM, or a spare table.",
    group: "Table",
    badge: "On this hub",
    to: "/pit/tables",
  },
  {
    slug: "dinner-dice",
    title: "Dinner, Dice & Dragons",
    blurb: "Play more D&D locally. Live matching site.",
    group: "Table",
    badge: "Live",
    live: "https://dinnerdiceanddragons.netlify.app",
    repo: "https://github.com/cbw29512/dinnerdiceanddragons",
  },
  {
    slug: "florence-rpg",
    title: "Florence RPG Website",
    blurb: "Local scene site for Florence, SC.",
    group: "Table",
    badge: "Repo",
    repo: "https://github.com/cbw29512/FlorenceRPGWebsite",
  },
  {
    slug: "ltg-hub",
    title: "Light Tower Guild",
    blurb: "Florence club door. Tools, tables, and the tower.",
    group: "Guild",
    badge: "On this hub",
    to: "/pit/guild",
  },
  {
    slug: "ltg-live",
    title: "Light Tower Table Top Guild",
    blurb: "Live guild site: free D&D tools, adventures, real tables.",
    group: "Guild",
    badge: "Live",
    live: "https://lighttowertabletopguild.netlify.app",
  },
  {
    slug: "ltg-v2",
    title: "The Real LTG",
    blurb: "v2 Light Tower Guild website.",
    group: "Guild",
    badge: "Live",
    live: "https://v2lighttowerguildwebsite.netlify.app",
  },
  {
    slug: "ltg-info",
    title: "LTG Information",
    blurb: "Guild information page.",
    group: "Guild",
    badge: "Live",
    live: "https://ltg-information.netlify.app",
  },
  {
    slug: "ltg-admit",
    title: "LTG Admission Form",
    blurb: "Guild admission form.",
    group: "Guild",
    badge: "Live",
    live: "https://ltg-admission-form.netlify.app",
  },
  {
    slug: "ltg-tower",
    title: "Animated Light Tower",
    blurb: "The tower animation.",
    group: "Guild",
    badge: "Live",
    live: "https://ltg-animatedtower.netlify.app",
  },
  {
    slug: "unguilded",
    title: "UnGuilded Complaint Form",
    blurb: "Complaint form next to the guild.",
    group: "Guild",
    badge: "Live",
    live: "https://unguilded-complain.netlify.app",
  },
  {
    slug: "ltg-pages",
    title: "LightHouseGuild.github.io",
    blurb: "Original GitHub Pages guild site. Custom domain lighttowerguild.tech is down.",
    group: "Guild",
    badge: "Repo",
    repo: "https://github.com/cbw29512/LightHouseGuild.github.io",
  },
  {
    slug: "courtroom-hub",
    title: "Dungeon Courtroom",
    blurb: "Court is in session. Hub page plus the live site.",
    group: "Adventures",
    badge: "On this hub",
    to: "/pit/courtroom",
  },
  {
    slug: "courtroom-live",
    title: "Dungeon Courtroom · live",
    blurb: "The live courtroom.",
    group: "Adventures",
    badge: "Live",
    live: "https://dungeoncourtroom.netlify.app",
    repo: "https://github.com/cbw29512/dungeoncourtroom",
  },
  {
    slug: "courtroom-pipeline",
    title: "Dungeon courtroom pipeline",
    blurb: "The path to dungeon court.",
    group: "Adventures",
    badge: "Repo",
    repo: "https://github.com/cbw29512/dungeoncourtroom-pipeline",
  },
  {
    slug: "adventures",
    title: "Teaching adventures",
    blurb: "Demon’s Wrath, Sin Eater’s Feast, Wendy’s one-shot, campaign portal.",
    group: "Adventures",
    badge: "On this hub",
    to: "/pit/adventures",
  },
  {
    slug: "demons-wrath",
    title: "Demon’s Wrath",
    blurb: "Teaching adventure. Private repo — listed, not copied.",
    group: "Adventures",
    badge: "Repo",
    repo: "https://github.com/cbw29512/DNDTeachingAdventureDemonsWrath",
  },
  {
    slug: "sin-eaters",
    title: "Sin Eater’s Feast",
    blurb: "One-shot site. Private repo — listed, not copied.",
    group: "Adventures",
    badge: "Repo",
    repo: "https://github.com/cbw29512/sin-eaters-feast",
  },
  {
    slug: "wendy-oneshot",
    title: "Wendy birthday one-shot",
    blurb: "Private one-shot. Listed until you say otherwise.",
    group: "Adventures",
    badge: "Repo",
    repo: "https://github.com/cbw29512/WendyBdayOneShot",
  },
  {
    slug: "campaign-portal",
    title: "DND campaign portal",
    blurb: "React campaign site. Private repo.",
    group: "Adventures",
    badge: "Repo",
    repo: "https://github.com/cbw29512/dnd-campaign-portal",
  },
  {
    slug: "dm-instruction",
    title: "DM & player instruction",
    blurb: "Teaching notes for the table.",
    group: "Adventures",
    badge: "Repo",
    repo: "https://github.com/cbw29512/DND_DM_Player_Instruction",
  },
  {
    slug: "ai-dm",
    title: "DND AI dungeon master",
    blurb: "AI DM experiment. Private repo.",
    group: "Adventures",
    badge: "Repo",
    repo: "https://github.com/cbw29512/dnd_ai_dungeon_master",
  },
  {
    slug: "tome-hub",
    title: "Tome & board",
    blurb: "Session journal plus the seven-slot board on this device.",
    group: "Notes",
    badge: "On this hub",
    to: "/pit/tome",
  },
  {
    slug: "tome-live",
    title: "TomeForge",
    blurb: "Live offline 5e-compatible journals.",
    group: "Notes",
    badge: "Live",
    live: "https://tomeforge-journal.netlify.app",
    repo: "https://github.com/cbw29512/tomeforge-journal",
  },
  {
    slug: "scribe",
    title: "Tabletop Scribe",
    blurb: "Write the session. Stays on this device.",
    group: "Notes",
    badge: "On this hub",
    to: "/pit/scribe",
    repo: "https://github.com/cbw29512/tabletop-scribe",
  },
  {
    slug: "translator",
    title: "Language translator",
    blurb: "Fan ciphers for the table — not official D&D scripts.",
    group: "Notes",
    badge: "On this hub",
    to: "/pit/translator",
    repo: "https://github.com/cbw29512/DNDLanguageTranslator",
  },
];

export function appsIn(group: HubGroup) {
  return HUB_APPS.filter((a) => a.group === group);
}

export function grouped(list: HubApp[]) {
  return HUB_GROUPS.map((group) => ({
    group,
    apps: list.filter((a) => a.group === group),
  })).filter((g) => g.apps.length > 0);
}

export function liveApps() {
  return HUB_APPS.filter((a) => Boolean(a.live));
}

export function workbenchApps() {
  return HUB_APPS.filter((a) => Boolean(a.to) && !a.live);
}

export function repoOnlyApps() {
  return HUB_APPS.filter((a) => Boolean(a.repo) && !a.live && !a.to);
}

export function liveBySlug(slug: string) {
  return liveApps().find((a) => a.slug === slug);
}

export function liveNeighbors(slug: string) {
  const list = liveApps();
  const i = list.findIndex((a) => a.slug === slug);
  return {
    index: i,
    total: list.length,
    prev: i > 0 ? list[i - 1] : undefined,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined,
    current: i >= 0 ? list[i] : undefined,
  };
}

export function hubHref(app: HubApp) {
  if (app.live) return app.live;
  if (app.to) return app.to;
  if (app.repo) return app.repo;
  return "/";
}

export function hubIsInternal(app: HubApp) {
  return Boolean(app.to) && !app.live;
}
