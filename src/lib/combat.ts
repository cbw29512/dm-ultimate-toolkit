export type Side = "hero" | "monster";

export type CombatantTemplate = {
  key: string;
  name: string;
  side: Side;
  level?: number;
  hp: number;
  ac: number;
  init: number;
  atk: number;
  attacks: number;
  dmgDice: number;
  dmgSides: number;
  dmgMod: number;
  note: string;
  cr?: string;
  kind?: string;
};

export type Combatant = CombatantTemplate & {
  id: string;
  maxHp: number;
  currentHp: number;
  alive: boolean;
  initiative: number;
};

export type LogLine = {
  id: string;
  round: number;
  text: string;
  kind: "roll" | "hit" | "miss" | "down" | "system" | "win";
};

export type FightResult = {
  winner: Side | "draw";
  rounds: number;
  log: LogLine[];
  heroes: Combatant[];
  monsters: Combatant[];
  seedLabel: string;
};

export const HEROES: CombatantTemplate[] = [
  {
    key: "mara",
    name: "Mara Vale",
    side: "hero",
    level: 5,
    hp: 44,
    ac: 18,
    init: 2,
    atk: 7,
    attacks: 2,
    dmgDice: 1,
    dmgSides: 8,
    dmgMod: 4,
    note: "Fighter · longsword, Extra Attack",
  },
  {
    key: "elric",
    name: "Elric Thorn",
    side: "hero",
    level: 5,
    hp: 28,
    ac: 15,
    init: 3,
    atk: 7,
    attacks: 1,
    dmgDice: 3,
    dmgSides: 10,
    dmgMod: 0,
    note: "Wizard · fire bolt cantrip (desk simplification)",
  },
  {
    key: "bramble",
    name: "Bramble Moss",
    side: "hero",
    level: 5,
    hp: 38,
    ac: 18,
    init: 1,
    atk: 6,
    attacks: 1,
    dmgDice: 1,
    dmgSides: 8,
    dmgMod: 3,
    note: "Cleric · warhammer, shield",
  },
];

export const STARTER_FIGHTER: CombatantTemplate = {
  key: "l1-fighter",
  name: "Level 1 Fighter",
  side: "hero",
  level: 1,
  hp: 12,
  ac: 16,
  init: 1,
  atk: 5,
  attacks: 1,
  dmgDice: 1,
  dmgSides: 8,
  dmgMod: 3,
  note: "Chain mail, longsword, STR 16. One attack per turn. No Extra Attack, no Action Surge.",
};

export const MONSTERS: CombatantTemplate[] = [
  { key: "goblin", name: "Goblin", side: "monster", hp: 7, ac: 15, init: 2, atk: 4, attacks: 1, dmgDice: 1, dmgSides: 6, dmgMod: 2, note: "Scimitar. Nimble Escape omitted.", cr: "1/4", kind: "Humanoid" },
  { key: "kobold", name: "Kobold", side: "monster", hp: 5, ac: 14, init: 2, atk: 4, attacks: 1, dmgDice: 1, dmgSides: 4, dmgMod: 2, note: "Pack tactics flavor", cr: "1/8", kind: "Humanoid" },
  { key: "bandit", name: "Bandit", side: "monster", hp: 11, ac: 12, init: 1, atk: 3, attacks: 1, dmgDice: 1, dmgSides: 6, dmgMod: 1, note: "Roadside trouble", cr: "1/8", kind: "Humanoid" },
  { key: "wolf", name: "Wolf", side: "monster", hp: 11, ac: 13, init: 2, atk: 4, attacks: 1, dmgDice: 2, dmgSides: 4, dmgMod: 2, note: "Pack hunter", cr: "1/4", kind: "Beast" },
  { key: "skeleton", name: "Skeleton", side: "monster", hp: 13, ac: 13, init: 2, atk: 4, attacks: 1, dmgDice: 1, dmgSides: 6, dmgMod: 2, note: "Bone and rust", cr: "1/4", kind: "Undead" },
  { key: "zombie", name: "Zombie", side: "monster", hp: 22, ac: 8, init: -2, atk: 3, attacks: 1, dmgDice: 1, dmgSides: 6, dmgMod: 1, note: "Undead fortitude, simplified", cr: "1/4", kind: "Undead" },
  { key: "orc", name: "Orc", side: "monster", hp: 15, ac: 13, init: 1, atk: 5, attacks: 1, dmgDice: 1, dmgSides: 12, dmgMod: 3, note: "Aggressive brute", cr: "1/2", kind: "Humanoid" },
  { key: "hobgoblin", name: "Hobgoblin", side: "monster", hp: 18, ac: 18, init: 1, atk: 4, attacks: 1, dmgDice: 1, dmgSides: 8, dmgMod: 1, note: "Martial discipline", cr: "1/2", kind: "Humanoid" },
  { key: "gnoll", name: "Gnoll", side: "monster", hp: 22, ac: 15, init: 1, atk: 4, attacks: 1, dmgDice: 1, dmgSides: 8, dmgMod: 2, note: "Rampage flavor", cr: "1/2", kind: "Humanoid" },
  { key: "spider", name: "Giant Spider", side: "monster", hp: 26, ac: 14, init: 3, atk: 5, attacks: 1, dmgDice: 1, dmgSides: 8, dmgMod: 3, note: "Bite, web implied", cr: "1", kind: "Beast" },
  { key: "direwolf", name: "Dire Wolf", side: "monster", hp: 37, ac: 14, init: 2, atk: 5, attacks: 1, dmgDice: 2, dmgSides: 6, dmgMod: 3, note: "Knockdown flavor", cr: "1", kind: "Beast" },
  { key: "harpy", name: "Harpy", side: "monster", hp: 38, ac: 11, init: 1, atk: 3, attacks: 2, dmgDice: 2, dmgSides: 4, dmgMod: 1, note: "Luring song omitted", cr: "1", kind: "Monstrosity" },
  { key: "ogre", name: "Ogre", side: "monster", hp: 59, ac: 11, init: -1, atk: 6, attacks: 1, dmgDice: 2, dmgSides: 8, dmgMod: 4, note: "Greatclub", cr: "2", kind: "Giant" },
  { key: "owlbear", name: "Owlbear", side: "monster", hp: 59, ac: 13, init: 1, atk: 7, attacks: 2, dmgDice: 1, dmgSides: 10, dmgMod: 5, note: "Beak and claws", cr: "3", kind: "Monstrosity" },
  { key: "wight", name: "Wight", side: "monster", hp: 45, ac: 14, init: 2, atk: 5, attacks: 2, dmgDice: 1, dmgSides: 8, dmgMod: 2, note: "Life drain omitted", cr: "3", kind: "Undead" },
  { key: "troll", name: "Troll", side: "monster", hp: 84, ac: 15, init: 1, atk: 7, attacks: 3, dmgDice: 2, dmgSides: 6, dmgMod: 4, note: "Regen omitted in this desk", cr: "5", kind: "Giant" },
  { key: "hillgiant", name: "Hill Giant", side: "monster", hp: 105, ac: 13, init: -1, atk: 8, attacks: 2, dmgDice: 3, dmgSides: 8, dmgMod: 5, note: "Greatclub", cr: "5", kind: "Giant" },
  { key: "youngblack", name: "Young Black Dragon", side: "monster", hp: 127, ac: 18, init: 2, atk: 7, attacks: 3, dmgDice: 2, dmgSides: 6, dmgMod: 4, note: "Breath weapon not modeled", cr: "7", kind: "Dragon" },
];

const GOBLIN = MONSTERS.find((m) => m.key === "goblin")!;

export const STARTER_GOBLINS: CombatantTemplate[] = [
  { ...GOBLIN, key: "goblin-a", name: "Goblin" },
  { ...GOBLIN, key: "goblin-b", name: "Goblin" },
];

export const SAMPLE_HEROES = [STARTER_FIGHTER];
export const SAMPLE_MONSTERS = STARTER_GOBLINS;

export function rollDie(sides: number) {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return (buf[0] % sides) + 1;
}

function uid(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export function spawn(template: CombatantTemplate, index = 0): Combatant {
  return {
    ...template,
    id: uid(template.key),
    name: index > 0 ? `${template.name} ${index + 1}` : template.name,
    maxHp: template.hp,
    currentHp: template.hp,
    alive: true,
    initiative: 0,
  };
}

function living(list: Combatant[]) {
  return list.filter((c) => c.alive && c.currentHp > 0);
}

function firstEnemy(actor: Combatant, heroes: Combatant[], monsters: Combatant[]) {
  const foes = actor.side === "hero" ? living(monsters) : living(heroes);
  return foes[0] ?? null;
}

function attackOnce(actor: Combatant, target: Combatant, round: number, log: LogLine[]) {
  const d20 = rollDie(20);
  const total = d20 + actor.atk;
  const crit = d20 === 20;
  const fumble = d20 === 1;
  const hit = !fumble && (crit || total >= target.ac);

  if (!hit) {
    log.push({
      id: uid("log"),
      round,
      kind: "miss",
      text: `${actor.name} attacks ${target.name}: d20 ${d20} + ${actor.atk} = ${total} vs AC ${target.ac} — miss.`,
    });
    return;
  }

  const dice = crit ? actor.dmgDice * 2 : actor.dmgDice;
  let damage = actor.dmgMod;
  const parts: number[] = [];
  for (let i = 0; i < dice; i += 1) {
    const r = rollDie(actor.dmgSides);
    parts.push(r);
    damage += r;
  }
  damage = Math.max(1, damage);
  target.currentHp = Math.max(0, target.currentHp - damage);
  if (target.currentHp === 0) target.alive = false;

  log.push({
    id: uid("log"),
    round,
    kind: target.alive ? "hit" : "down",
    text: `${actor.name} hits ${target.name}${crit ? " (crit)" : ""}: ${parts.join("+")}${actor.dmgMod ? `+${actor.dmgMod}` : ""} = ${damage} damage. ${target.name} at ${target.currentHp}/${target.maxHp}${target.alive ? "" : " — down"}.`,
  });
}

export function runFight(heroTemplates: CombatantTemplate[], monsterTemplates: CombatantTemplate[]): FightResult {
  const heroes = heroTemplates.map((t, i) => spawn(t, i));
  const monsters = monsterTemplates.map((t, i) => spawn(t, i));
  const log: LogLine[] = [];

  for (const c of [...heroes, ...monsters]) {
    const die = rollDie(20);
    c.initiative = die + c.init;
    log.push({
      id: uid("log"),
      round: 0,
      kind: "roll",
      text: `${c.name} initiative ${die} + ${c.init} = ${c.initiative}.`,
    });
  }

  const order = [...heroes, ...monsters].sort((a, b) => b.initiative - a.initiative);
  let round = 0;
  const maxRounds = 30;

  while (round < maxRounds && living(heroes).length && living(monsters).length) {
    round += 1;
    log.push({ id: uid("log"), round, kind: "system", text: `Round ${round}.` });
    for (const actor of order) {
      if (!actor.alive) continue;
      if (!living(heroes).length || !living(monsters).length) break;
      for (let a = 0; a < actor.attacks; a += 1) {
        const target = firstEnemy(actor, heroes, monsters);
        if (!target) break;
        attackOnce(actor, target, round, log);
      }
    }
  }

  let winner: FightResult["winner"] = "draw";
  if (living(heroes).length && !living(monsters).length) winner = "hero";
  else if (living(monsters).length && !living(heroes).length) winner = "monster";

  log.push({
    id: uid("log"),
    round,
    kind: "win",
    text:
      winner === "hero"
        ? "The fighter holds the field."
        : winner === "monster"
          ? "The goblins hold the field."
          : "The fight times out as a draw.",
  });

  return {
    winner,
    rounds: round,
    log,
    heroes,
    monsters,
    seedLabel: crypto.randomUUID().slice(0, 8),
  };
}

export function turbo(heroTemplates: CombatantTemplate[], monsterTemplates: CombatantTemplate[], runs: number) {
  let hero = 0;
  let monster = 0;
  let draw = 0;
  let rounds = 0;
  for (let i = 0; i < runs; i += 1) {
    const result = runFight(heroTemplates, monsterTemplates);
    if (result.winner === "hero") hero += 1;
    else if (result.winner === "monster") monster += 1;
    else draw += 1;
    rounds += result.rounds;
  }
  return {
    runs,
    hero,
    monster,
    draw,
    heroRate: hero / runs,
    monsterRate: monster / runs,
    avgRounds: rounds / runs,
  };
}
