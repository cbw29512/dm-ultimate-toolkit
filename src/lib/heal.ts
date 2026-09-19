import { rollDie, type Combatant } from "@/lib/combat";

export type Potion = {
  key: string;
  name: string;
  dice: number;
  sides: number;
  mod: number;
  rarity: string;
};

export const POTIONS: Potion[] = [
  { key: "healing", name: "Potion of Healing", dice: 2, sides: 4, mod: 2, rarity: "Common" },
  { key: "greater", name: "Greater Healing Potion", dice: 4, sides: 4, mod: 4, rarity: "Uncommon" },
  { key: "superior", name: "Superior Healing Potion", dice: 8, sides: 4, mod: 8, rarity: "Rare" },
  { key: "supreme", name: "Supreme Healing Potion", dice: 10, sides: 4, mod: 20, rarity: "Very rare" },
];

export const CHARGE_MAX = 6;

export type HealRoll = {
  name: string;
  rolls: number[];
  total: number;
  detail: string;
};

export function rollPotion(key: string): HealRoll {
  const potion = POTIONS.find((p) => p.key === key) ?? POTIONS[0];
  const rolls = Array.from({ length: potion.dice }, () => rollDie(potion.sides));
  const total = rolls.reduce((a, b) => a + b, 0) + potion.mod;
  return {
    name: potion.name,
    rolls,
    total,
    detail: `${rolls.join("+")}+${potion.mod} = ${total}`,
  };
}

export function rollHitDie(sides = 8, conMod = 2): HealRoll {
  const roll = rollDie(sides);
  const total = Math.max(1, roll + conMod);
  return {
    name: `Short rest (d${sides})`,
    rolls: [roll],
    total,
    detail: `${roll}+${conMod} = ${total}`,
  };
}

export function applyHeal(c: Combatant, amount: number): Combatant {
  const currentHp = Math.min(c.maxHp, Math.max(0, c.currentHp + amount));
  return { ...c, currentHp, alive: currentHp > 0 };
}
