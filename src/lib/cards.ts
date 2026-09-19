import { rollDie } from "@/lib/combat";

export type CardKind = "spell" | "item" | "condition";

export type HallCard = {
  key: string;
  kind: CardKind;
  name: string;
  tag: string;
  stat: string;
  body: string;
};

export const SPELL_CARDS: HallCard[] = [
  { key: "fire-bolt", kind: "spell", name: "Fire Bolt", tag: "Cantrip · Evocation", stat: "1d10 fire · 120 ft", body: "A mote of flame. Ranged spell attack. Ignites unattended flammable objects. Hall summary, not a reprint." },
  { key: "mage-armor", kind: "spell", name: "Mage Armor", tag: "1st · Abjuration", stat: "8 hours · touch", body: "Unarmored target becomes AC 13 + Dexterity modifier until the spell ends or they don armor." },
  { key: "spell-shield", kind: "spell", name: "Shield", tag: "1st · Abjuration", stat: "Reaction · +5 AC", body: "When hit, raise a barrier. +5 AC until the start of your next turn, including against the triggering hit." },
  { key: "magic-missile", kind: "spell", name: "Magic Missile", tag: "1st · Evocation", stat: "3 darts · 1d4+1 force", body: "Three darts, unerring. Split targets as you like. No attack roll." },
  { key: "cure-wounds", kind: "spell", name: "Cure Wounds", tag: "1st · Abjuration", stat: "Touch · 1d8+mod", body: "A creature you touch regains hit points. No effect on constructs or undead in this hall." },
  { key: "healing-word", kind: "spell", name: "Healing Word", tag: "1st · Abjuration", stat: "Bonus · 60 ft · 1d4+mod", body: "A word across the pit. One creature you can see regains hit points." },
  { key: "guiding-bolt", kind: "spell", name: "Guiding Bolt", tag: "1st · Evocation", stat: "4d6 radiant · 120 ft", body: "Ranged spell attack. The next attack against the target before your next turn has advantage." },
  { key: "burning-hands", kind: "spell", name: "Burning Hands", tag: "1st · Evocation", stat: "15-ft cone · 3d6 fire", body: "Dexterity save for half. A sheet of flame from your outstretched hands." },
  { key: "invisibility", kind: "spell", name: "Invisibility", tag: "2nd · Illusion", stat: "Concentration · 1 hour", body: "The target (and worn gear) becomes invisible. Ends early if the target attacks or casts." },
  { key: "misty-step", kind: "spell", name: "Misty Step", tag: "2nd · Conjuration", stat: "Bonus · 30 ft", body: "Briefly wreathed in silver mist, you teleport to a space you can see." },
  { key: "fireball", kind: "spell", name: "Fireball", tag: "3rd · Evocation", stat: "20-ft radius · 8d6 fire", body: "A bright streak, then a bloom. Dexterity save for half. The pit's favorite argument." },
  { key: "counterspell", kind: "spell", name: "Counterspell", tag: "3rd · Abjuration", stat: "Reaction · 60 ft", body: "Interrupt a creature casting. Auto-stops a spell of 3rd or lower; contest the rest." },
];

export const ITEM_CARDS: HallCard[] = [
  { key: "longsword", kind: "item", name: "Longsword", tag: "Weapon · Martial melee", stat: "1d8 slashing · versatile 1d10", body: "The hall's default steel. Finesse is not invited." },
  { key: "item-shield", kind: "item", name: "Shield", tag: "Armor", stat: "+2 AC", body: "A slab of wood and rim-iron. You must be wielding it to keep the bonus." },
  { key: "leather", kind: "item", name: "Leather Armor", tag: "Light armor", stat: "AC 11 + Dex", body: "Boiled and stitched. Quiet enough for the door job." },
  { key: "thieves-tools", kind: "item", name: "Thieves' Tools", tag: "Tool kit", stat: "Picks, files, a small mirror", body: "Open a lock or disarm a trap if the GM agrees the kit applies." },
  { key: "lantern", kind: "item", name: "Hooded Lantern", tag: "Gear", stat: "30 ft bright · 6 hours oil", body: "Cover it to drop to a dim glow. Dungeons are not free." },
  { key: "rope", kind: "item", name: "Hempen Rope", tag: "Gear", stat: "50 ft", body: "Holds a climber. Does not hold an argument with a rust monster." },
  { key: "rations", kind: "item", name: "Rations", tag: "Gear", stat: "1 day", body: "Dry, salted, and nobody's favorite. Mark one per travel day." },
  { key: "potion-card", kind: "item", name: "Potion of Healing", tag: "Potion · Common", stat: "2d4+2 · action", body: "Drink to regain hit points. The Healing Box rolls it for you." },
  { key: "plus-one", kind: "item", name: "Weapon +1", tag: "Weapon · Uncommon", stat: "+1 to hit and damage", body: "A hall stand-in for a uncommon magic weapon. Name it at the table." },
  { key: "cloak-prot", kind: "item", name: "Cloak of Protection", tag: "Wondrous · Uncommon", stat: "+1 AC and saves · attunement", body: "A heavy cloak that does not want you dead. One attunement slot." },
  { key: "bag-holding", kind: "item", name: "Bag of Holding", tag: "Wondrous · Uncommon", stat: "500 lb · 64 cu ft", body: "An interior larger than the leather. Do not put one bag inside another." },
  { key: "lantern-revealing", kind: "item", name: "Spotter's Lens", tag: "Wondrous · Hall-made", stat: "Advantage on Search in bright light", body: "Original hall gear. A brass loupe that hates camouflage." },
];

export const CONDITION_CARDS: HallCard[] = [
  { key: "blinded", kind: "condition", name: "Blinded", tag: "Condition", stat: "Auto-fail sight · attacks at disadvantage", body: "You cannot see. Attack rolls against you have advantage." },
  { key: "charmed", kind: "condition", name: "Charmed", tag: "Condition", stat: "Cannot harm the charmer", body: "The charmer has advantage on social checks against you. You will not attack them." },
  { key: "frightened", kind: "condition", name: "Frightened", tag: "Condition", stat: "Disadvantage while the source is in sight", body: "You cannot willingly move closer to the source of the fear." },
  { key: "grappled", kind: "condition", name: "Grappled", tag: "Condition", stat: "Speed 0", body: "Ends if the grappler is incapacitated or you are moved out of reach." },
  { key: "poisoned", kind: "condition", name: "Poisoned", tag: "Condition", stat: "Disadvantage on attacks and checks", body: "The hall's shortest card and the most common complaint." },
  { key: "prone", kind: "condition", name: "Prone", tag: "Condition", stat: "Crawl · melee advantage vs you", body: "Attacks you make have disadvantage. Ranged attacks against you have disadvantage." },
  { key: "restrained", kind: "condition", name: "Restrained", tag: "Condition", stat: "Speed 0 · disadvantage on attacks", body: "Attack rolls against you have advantage. Dexterity saves at disadvantage." },
  { key: "exhaustion", kind: "condition", name: "Exhaustion", tag: "Condition · 2024", stat: "D20 tests −2 per level", body: "Hall uses the 2024-shaped track: −2 per level, speed halved at 6, death at 10. Confirm at your table." },
];

export const ALL_CARDS: HallCard[] = [...SPELL_CARDS, ...ITEM_CARDS, ...CONDITION_CARDS];

export function cardByKey(key: string) {
  return ALL_CARDS.find((c) => c.key === key) ?? null;
}

export type Hoard = {
  tier: "local" | "heroic" | "paragon" | "epic";
  coins: string;
  sparkle: string;
  items: HallCard[];
};

const MAGIC_POOL = ITEM_CARDS.filter((c) => ["plus-one", "cloak-prot", "bag-holding", "lantern-revealing", "potion-card"].includes(c.key));

export function generateHoard(tier: Hoard["tier"]): Hoard {
  const gp = () => rollDie(6);
  const coins =
    tier === "local"
      ? `${rollDie(6) * 100} cp · ${rollDie(8) * 10} sp · ${gp() * 5} gp`
      : tier === "heroic"
        ? `${gp() * 100} gp · ${rollDie(4) * 10} pp`
        : tier === "paragon"
          ? `${gp() * 1000} gp · ${rollDie(6) * 50} pp`
          : `${gp() * 5000} gp · a locked coffer of 20 pp each`;
  const sparkle =
    tier === "local"
      ? "A tarnished ring, costume jewelry, a map fragment."
      : tier === "heroic"
        ? "A bloodstone, two pearls, a silver comb."
        : tier === "paragon"
          ? "A fire opal and a gold idol with the gems pried out."
          : "A coronet nobody should wear in public.";
  const count = tier === "local" ? 1 : tier === "heroic" ? 2 : 3;
  const items: HallCard[] = [];
  const pool = [...MAGIC_POOL];
  for (let i = 0; i < count && pool.length; i += 1) {
    const pick = rollDie(pool.length) - 1;
    items.push(pool.splice(pick, 1)[0]);
  }
  return { tier, coins, sparkle, items };
}

export const TIER_LABEL: Record<Hoard["tier"], string> = {
  local: "Local trouble (1–4)",
  heroic: "Heroic (5–10)",
  paragon: "Paragon (11–16)",
  epic: "Epic (17–20)",
};
