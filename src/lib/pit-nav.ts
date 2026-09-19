import { BookOpen, Dices, Layers, Map, MapPinned, Skull, Swords, UserRound } from "lucide-react";

export const PIT_NAV = [
  { to: "/pit", label: "Hall", icon: BookOpen, exact: true },
  { to: "/pit/combat", label: "Iron Pit", icon: Swords, exact: false },
  { to: "/pit/forge", label: "Forge", icon: UserRound, exact: false },
  { to: "/pit/bestiary", label: "Bestiary", icon: Skull, exact: false },
  { to: "/pit/dice", label: "Dice", icon: Dices, exact: false },
  { to: "/pit/maps", label: "Maps", icon: Map, exact: false },
  { to: "/pit/cards", label: "Cards", icon: Layers, exact: false },
  { to: "/pit/tome", label: "Tome", icon: BookOpen, exact: false },
  { to: "/pit/tables", label: "Tables", icon: MapPinned, exact: false },
] as const;

export const PIT_GROUPS = [
  {
    label: "Play",
    rooms: [
      {
        to: "/pit/combat",
        icon: Swords,
        title: "Iron Pit",
        body: "Certified combat. Coming soon to this toolkit — not this pass.",
        soon: true,
      },
      { to: "/pit/dice", icon: Dices, title: "Dice", body: "Nothing but a roller. Web Crypto, advantage, a log.", soon: false },
      { to: "/pit/maps", icon: Map, title: "Maps", body: "DungeonMaps, folded in. Carve a keep, a delve, or a ruin.", soon: false },
    ],
  },
  {
    label: "Prep",
    rooms: [
      { to: "/pit/forge", icon: UserRound, title: "Character Forge", body: "Pregens that refuse illegal SRD combinations. Print and keep.", soon: false },
      { to: "/pit/bestiary", icon: Skull, title: "Bestiary", body: "Monster Card Forge. Stock the catalog for when Iron Pit lands.", soon: false },
      { to: "/pit/cards", icon: Layers, title: "Cards & loot", body: "DungeonCards, DNDCards, and lootforge. Spells, gear, conditions, a hoard.", soon: false },
    ],
  },
  {
    label: "Table",
    rooms: [
      { to: "/pit/tome", icon: BookOpen, title: "Tome & board", body: "TomeForge plus the DNDWebTTRPG seven-slot board. Session memory on this device.", soon: false },
      { to: "/pit/tables", icon: MapPinned, title: "Local tables", body: "Dinner, Dice & Dragons. Florence first. Find a seat, a DM, or a room.", soon: false },
    ],
  },
] as const;
