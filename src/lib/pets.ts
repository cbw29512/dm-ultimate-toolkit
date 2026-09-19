export type Species = "dog" | "cat" | "rabbit" | "bird" | "horse";
export type Concern = "welcome" | "wellness" | "diabetes" | "arthritis" | "allergy" | "dental";

export type Tracker = {
  id: string;
  species: Species;
  concern: Concern;
  title: string;
  blurb: string;
  fields: string[];
  shop: { label: string; query: string }[];
};

export const SPECIES: { id: Species; label: string }[] = [
  { id: "dog", label: "Dog" },
  { id: "cat", label: "Cat" },
  { id: "rabbit", label: "Rabbit" },
  { id: "bird", label: "Bird" },
  { id: "horse", label: "Horse" },
];

export const CONCERNS: { id: Concern; label: string }[] = [
  { id: "welcome", label: "First week home" },
  { id: "wellness", label: "Everyday wellness" },
  { id: "diabetes", label: "Diabetes" },
  { id: "arthritis", label: "Arthritis and mobility" },
  { id: "allergy", label: "Allergy and skin" },
  { id: "dental", label: "Dental" },
];

export const TRACKERS: Tracker[] = SPECIES.flatMap((species) =>
  CONCERNS.map((concern) => {
    const title = `${species.label} · ${concern.label}`;
    const fields =
      concern.id === "welcome"
        ? ["Settling-in notes", "Eating and drinking", "Bathroom", "Sleep", "What to ask the vet"]
        : concern.id === "diabetes"
          ? ["Appetite", "Water intake", "Energy", "Insulin / meds given", "Questions for their veterinary team"]
          : concern.id === "arthritis"
            ? ["How they moved today", "Stairs or getting up", "Pain signs", "Meds / joint care", "Questions for their veterinary team"]
            : concern.id === "allergy"
              ? ["Itch / skin", "Ears and paws", "Diet notes", "Meds", "Questions for their veterinary team"]
              : concern.id === "dental"
                ? ["Eating comfort", "Breath / drool", "Chewing", "Home care done", "Questions for their veterinary team"]
                : ["Appetite", "Energy", "Bathroom", "Meds", "What changed since last visit"];

    const shop: Tracker["shop"] =
      species.id === "dog" && concern.id === "welcome"
        ? [
            { label: "Crate", query: "dog crate" },
            { label: "Puppy pads", query: "puppy training pads" },
            { label: "Food and bowls", query: "puppy food bowls" },
            { label: "Chew toys", query: "puppy chew toys" },
          ]
        : species.id === "cat" && concern.id === "welcome"
          ? [
              { label: "Litter box", query: "covered litter box" },
              { label: "Carrier", query: "cat carrier" },
              { label: "Food", query: "kitten food" },
              { label: "Scratching post", query: "cat scratching post" },
            ]
          : species.id === "rabbit"
            ? [
                { label: "Hay", query: "timothy hay rabbit" },
                { label: "Water bottle", query: "rabbit water bottle" },
                { label: "Hide house", query: "rabbit hide house" },
              ]
            : species.id === "bird"
              ? [
                  { label: "Cage", query: "bird cage" },
                  { label: "Perches", query: "bird perches" },
                  { label: "Food", query: "parrot bird food" },
                ]
              : species.id === "horse"
                ? [
                    { label: "Grooming kit", query: "horse grooming kit" },
                    { label: "Fly spray", query: "horse fly spray" },
                    { label: "Hoof pick", query: "hoof pick" },
                  ]
                : concern.id === "arthritis"
                  ? [
                      { label: "Orthopedic bed", query: `${species.label.toLowerCase()} orthopedic bed` },
                      { label: "Ramp", query: `${species.label.toLowerCase()} ramp stairs` },
                      { label: "Joint chews", query: `${species.label.toLowerCase()} joint supplement` },
                    ]
                  : concern.id === "dental"
                    ? [
                        { label: "Toothbrush kit", query: `${species.label.toLowerCase()} toothbrush kit` },
                        { label: "Dental chews", query: `${species.label.toLowerCase()} dental chews` },
                      ]
                    : [
                        { label: "Vet records folder", query: "pet document organizer" },
                        { label: "Pill organizer", query: "pet pill organizer" },
                        { label: "Baseline food", query: `${species.label.toLowerCase()} food` },
                      ];

    return {
      id: `${species.id}-${concern.id}`,
      species: species.id,
      concern: concern.id,
      title,
      blurb:
        concern.id === "welcome"
          ? "Bring them home ready, not scrambling."
          : "Track what you see so the veterinary team gets a clearer week.",
      fields,
      shop,
    };
  }),
);

export function trackerById(id: string) {
  return TRACKERS.find((t) => t.id === id);
}

export type LogAnswers = Record<string, string>;
