export type ParkedItem = {
  name: string;
  reason: string;
  group: "crypto" | "dnd-dup" | "toy" | "bootcamp" | "live-frozen";
};

export const PARKED: ParkedItem[] = [
  { group: "crypto", name: "RogueAICrypto", reason: "Speculative. Splits focus from tools people already use." },
  { group: "crypto", name: "autonomous-money", reason: "Side-hustle risk next to a mortgage-industry job." },
  { group: "crypto", name: "hermes-money-factory / hermes-hq", reason: "AI-teaching-AI-to-make-money. Park until the desk prints cash." },
  { group: "crypto", name: "Cryptotabminer / newtobitcoin", reason: "Low-quality affiliate. Hurts every other brand." },
  { group: "dnd-dup", name: "D20-iron-pit", reason: "Duplicate of D20-ironpit. Canonical repo stays." },
  { group: "dnd-dup", name: "CharacterForge", reason: "Separate campaign/account workflow; compare features before any retirement." },
  { group: "dnd-dup", name: "DNDWebTTRPG, DNDCards, DungeonCards, DungeonMaps, DungeonGate, L2PTTRPG", reason: "Earlier source projects retained for review. Feature migration into the hub is not certified." },
  { group: "dnd-dup", name: "brains, zombierun, emberandstone, Myth-Etcher, lootforge", reason: "Fun, not the business." },
  { group: "toy", name: "Magic 8-ball family", reason: "Done. No traffic path." },
  { group: "toy", name: "ChatCharm, puzzlepicture, TinyKindnessTunes, mrrsnap", reason: "One-offs. Do not restart." },
  { group: "toy", name: "maxyourhealth as a company", reason: "Keep as an Amazon page later. Not a product line." },
  { group: "bootcamp", name: "2020 bootcamp clones", reason: "ghostpost, shoestore, twitterclone, cowsay, netflix mimics, sokoban, wiki, pizzaApp, and the rest. Portfolio history only." },
  { group: "live-frozen", name: "Birthday / RSVP sites", reason: "Leave live for guests. No new features." },
  { group: "live-frozen", name: "lighttowerguild.tech", reason: "Custom domain currently down. Fix later as toolkit distribution, not a fourth product." },
];

export const FOLD_INTO_PIT = [
  { name: "Character Forge", url: "/pit/forge" },
  { name: "Monster Card Forge", url: "/pit/bestiary" },
  { name: "Dice roller", url: "/pit/dice" },
  { name: "DungeonMaps / DungeonGate", url: "/pit/maps" },
  { name: "DungeonCards / DNDCards / lootforge", url: "/pit/cards" },
  { name: "TomeForge + DNDWebTTRPG board", url: "/pit/tome" },
  { name: "Dinner, Dice & Dragons", url: "/pit/tables" },
  { name: "Light Tower Guild / Florence RPG", url: "/pit/tables" },
] as const;
