import { rollDie } from "@/lib/combat";

export type DiceResult = {
  notation: string;
  rolls: number[];
  kept: number[];
  modifier: number;
  total: number;
  detail: string;
};

const FORMULA = /^(\d*)d(\d+)([+-]\d+)?$/i;

export function parseAndRoll(raw: string, mode: "normal" | "adv" | "dis" = "normal"): DiceResult {
  const notation = raw.trim().replaceAll(" ", "").toLowerCase() || "1d20";
  const match = FORMULA.exec(notation);
  if (!match) {
    throw new Error("Use notation like 1d20, 2d6+3, or d8.");
  }
  const count = Math.min(20, Math.max(1, Number(match[1] || "1")));
  const sides = Math.min(1000, Math.max(2, Number(match[2])));
  const modifier = Number(match[3] || "0");

  if (mode !== "normal" && sides === 20 && count === 1) {
    const a = rollDie(20);
    const b = rollDie(20);
    const kept = mode === "adv" ? Math.max(a, b) : Math.min(a, b);
    return {
      notation,
      rolls: [a, b],
      kept: [kept],
      modifier,
      total: kept + modifier,
      detail: `${mode === "adv" ? "Advantage" : "Disadvantage"} ${a} and ${b}, keep ${kept}${modifier ? ` ${modifier > 0 ? "+" : ""}${modifier}` : ""} = ${kept + modifier}`,
    };
  }

  const rolls = Array.from({ length: count }, () => rollDie(sides));
  const sum = rolls.reduce((a, b) => a + b, 0);
  const total = sum + modifier;
  return {
    notation,
    rolls,
    kept: rolls,
    modifier,
    total,
    detail: `${rolls.join(" + ")}${modifier ? ` ${modifier > 0 ? "+" : ""}${modifier}` : ""} = ${total}`,
  };
}
