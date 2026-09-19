import { rollDie, type CombatantTemplate } from "@/lib/combat";

export const SPECIES = ["Human", "Elf", "Dwarf", "Halfling", "Gnome", "Dragonborn", "Tiefling", "Orc"] as const;
export const BACKGROUNDS = ["Soldier", "Sage", "Acolyte", "Criminal", "Folk Hero", "Hermit", "Guide", "Artisan"] as const;
export const CLASSES = [
  { name: "Fighter", hit: 10, atk: 5, attacks: 2, dmgDice: 1, dmgSides: 8, dmgMod: 3, ac: 18, feature: "Extra Attack, fighting style" },
  { name: "Barbarian", hit: 12, atk: 5, attacks: 2, dmgDice: 1, dmgSides: 12, dmgMod: 4, ac: 16, feature: "Rage (desk: extra damage already in the card)" },
  { name: "Paladin", hit: 10, atk: 5, attacks: 2, dmgDice: 1, dmgSides: 8, dmgMod: 3, ac: 18, feature: "Lay on Hands, Divine Smite (not auto-resolved)" },
  { name: "Ranger", hit: 10, atk: 5, attacks: 2, dmgDice: 1, dmgSides: 8, dmgMod: 3, ac: 16, feature: "Hunter's Mark flavor" },
  { name: "Rogue", hit: 8, atk: 5, attacks: 1, dmgDice: 2, dmgSides: 6, dmgMod: 4, ac: 15, feature: "Sneak Attack packed into the damage card" },
  { name: "Monk", hit: 8, atk: 5, attacks: 2, dmgDice: 1, dmgSides: 6, dmgMod: 3, ac: 16, feature: "Martial arts" },
  { name: "Cleric", hit: 8, atk: 4, attacks: 1, dmgDice: 1, dmgSides: 8, dmgMod: 2, ac: 18, feature: "Turn Undead, prepared spells" },
  { name: "Druid", hit: 8, atk: 4, attacks: 1, dmgDice: 1, dmgSides: 8, dmgMod: 2, ac: 16, feature: "Wild Shape (not modeled in the pit)" },
  { name: "Wizard", hit: 6, atk: 5, attacks: 1, dmgDice: 3, dmgSides: 10, dmgMod: 0, ac: 15, feature: "Spellbook · fire bolt stand-in" },
  { name: "Sorcerer", hit: 6, atk: 5, attacks: 1, dmgDice: 3, dmgSides: 8, dmgMod: 0, ac: 13, feature: "Metamagic omitted" },
  { name: "Warlock", hit: 8, atk: 5, attacks: 1, dmgDice: 3, dmgSides: 10, dmgMod: 0, ac: 14, feature: "Eldritch Blast stand-in" },
  { name: "Bard", hit: 8, atk: 4, attacks: 1, dmgDice: 1, dmgSides: 8, dmgMod: 2, ac: 15, feature: "Bardic Inspiration" },
] as const;

const NAMES = [
  "Mara Vale", "Elric Thorn", "Bramble Moss", "Ilyra Quill", "Torven Ash", "Nessa Pike",
  "Calder Wren", "Sable Orin", "Ysolde Vex", "Harun Flint", "Perrin Dale", "Kael Rime",
];

export type ForgedHero = {
  name: string;
  species: string;
  className: string;
  background: string;
  edition: "2024" | "2014";
  level: number;
  stats: Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>;
  hp: number;
  ac: number;
  speed: number;
  feature: string;
  attackLine: string;
};

function mod(score: number) {
  return Math.floor((score - 10) / 2);
}

function arrayOrRoll(method: "array" | "roll") {
  if (method === "array") return [15, 14, 13, 12, 10, 8];
  return Array.from({ length: 6 }, () => {
    const dice = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)].sort((a, b) => a - b);
    return dice[1] + dice[2] + dice[3];
  });
}

export function forgeHero(opts: {
  species?: string;
  className?: string;
  background?: string;
  level: number;
  edition: "2024" | "2014";
  method: "array" | "roll";
  name?: string;
}): ForgedHero {
  const cls = CLASSES.find((c) => c.name === opts.className) ?? CLASSES[Math.floor(Math.random() * CLASSES.length)];
  const species = opts.species ?? SPECIES[Math.floor(Math.random() * SPECIES.length)];
  const background = opts.background ?? BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
  const scores = arrayOrRoll(opts.method).sort((a, b) => b - a);
  const assigned = {
    str: scores[2],
    dex: scores[1],
    con: scores[3],
    int: scores[4],
    wis: scores[5],
    cha: scores[0],
  };
  if (["Fighter", "Barbarian", "Paladin"].includes(cls.name)) {
    assigned.str = scores[0];
    assigned.con = scores[1];
    assigned.dex = scores[2];
    assigned.cha = scores[3];
  } else if (["Rogue", "Ranger", "Monk"].includes(cls.name)) {
    assigned.dex = scores[0];
    assigned.con = scores[1];
    assigned.wis = scores[2];
  } else if (["Wizard"].includes(cls.name)) {
    assigned.int = scores[0];
    assigned.con = scores[1];
    assigned.dex = scores[2];
  } else if (["Cleric", "Druid"].includes(cls.name)) {
    assigned.wis = scores[0];
    assigned.con = scores[1];
  } else {
    assigned.cha = scores[0];
    assigned.con = scores[1];
    assigned.dex = scores[2];
  }

  const level = Math.min(20, Math.max(1, opts.level));
  const conMod = mod(assigned.con);
  const hp = cls.hit + conMod + (level - 1) * (Math.floor(cls.hit / 2) + 1 + conMod);
  const name = opts.name?.trim() || NAMES[Math.floor(Math.random() * NAMES.length)];

  return {
    name,
    species,
    className: cls.name,
    background,
    edition: opts.edition,
    level,
    stats: assigned,
    hp: Math.max(1, hp),
    ac: cls.ac,
    speed: species === "Dwarf" ? 30 : 30,
    feature: cls.feature,
    attackLine: `${cls.attacks} × +${cls.atk + Math.floor((level - 1) / 4)} · ${cls.dmgDice}d${cls.dmgSides}+${cls.dmgMod}`,
  };
}

export function forgedToCombatant(hero: ForgedHero): CombatantTemplate {
  const cls = CLASSES.find((c) => c.name === hero.className) ?? CLASSES[0];
  const pb = 2 + Math.floor((hero.level - 1) / 4);
  return {
    key: hero.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-"),
    name: hero.name,
    side: "hero",
    level: hero.level,
    hp: hero.hp,
    ac: hero.ac,
    init: Math.floor((hero.stats.dex - 10) / 2),
    atk: cls.atk + pb - 2,
    attacks: hero.level >= 5 ? Math.max(cls.attacks, 2) : 1,
    dmgDice: cls.dmgDice,
    dmgSides: cls.dmgSides,
    dmgMod: cls.dmgMod,
    note: `${hero.species} ${hero.className} ${hero.level} · ${hero.edition} · ${hero.feature}`,
  };
}
