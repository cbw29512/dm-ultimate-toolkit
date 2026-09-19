export const TONGUES = [
  { key: "common", name: "Common", hint: "As written." },
  { key: "dwarvish", name: "Dwarvish", hint: "Consonant-heavy cipher for the table." },
  { key: "elvish", name: "Elvish", hint: "Soft vowels, long endings." },
  { key: "giant", name: "Giant", hint: "Broad, blunt substitution." },
  { key: "goblin", name: "Goblin", hint: "Hiss and clip." },
  { key: "orc", name: "Orc", hint: "Hard stops." },
] as const;

const MAPS: Record<string, string> = {
  dwarvish: "krlmnpstvgdzfhbwjxqaeiouy",
  elvish: "aeiouylmnrsvthdgkpbwcfxzqj",
  giant: "uoeaiygktdnslrmpvwfhbjqcxz",
  goblin: "szxkqjvfwbprnlmdgthaeiouy",
  orc: "kgtdnslrmpvwfhbjqcxzaeiouy",
};

const ALPHA = "abcdefghijklmnopqrstuvwxyz";

export function translateTongue(text: string, key: string) {
  if (key === "common") return text;
  const map = MAPS[key] ?? MAPS.dwarvish;
  return [...text]
    .map((ch) => {
      const lower = ch.toLowerCase();
      const i = ALPHA.indexOf(lower);
      if (i < 0) return ch;
      const out = map[i] ?? ch;
      return ch === lower ? out : out.toUpperCase();
    })
    .join("");
}
