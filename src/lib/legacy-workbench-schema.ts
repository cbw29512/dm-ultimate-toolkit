// Shapes are retained only so old local saves can still be typed and exported.
// Executable duplicate character/rules catalogs are no longer part of the hub.
export type LegacyCard = {
  key: string;
  kind: "spell" | "item" | "condition";
  name: string;
  tag: string;
  stat: string;
  body: string;
};

export type Hoard = {
  tier: "local" | "heroic" | "paragon" | "epic";
  coins: string;
  sparkle: string;
  items: LegacyCard[];
};
