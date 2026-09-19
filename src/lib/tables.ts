export type OpenTable = {
  id: string;
  title: string;
  when: string;
  place: string;
  system: string;
  seats: string;
  roleNeed: string;
  blurb: string;
};

export const FLORENCE_TABLES: OpenTable[] = [
  {
    id: "ltg-tue",
    title: "Light Tower Guild · Tuesday 5e",
    when: "Tuesdays 6:30p",
    place: "Florence, SC · guild hall",
    system: "D&D 5e 2024",
    seats: "2 seats open",
    roleNeed: "Players",
    blurb: "Ongoing campaign, levels 4–6. New players welcome if they can make three of four Tuesdays.",
  },
  {
    id: "saturday-oneshot",
    title: "Saturday pit one-shot",
    when: "Saturdays 2:00p",
    place: "Florence game store tables",
    system: "D&D 5e 2014 or 2024",
    seats: "Need a DM this week",
    roleNeed: "GM",
    blurb: "Pregens from Character Forge. Four hours, then everyone goes home.",
  },
  {
    id: "brewery-al",
    title: "Dinner, Dice & Dragons",
    when: "First Friday 7:00p",
    place: "A Florence brewery with spare tables",
    system: "D&D 5e",
    seats: "Venue posted · 1 table of 6",
    roleNeed: "Venue + players",
    blurb: "Eat first. Dice after. This is the Dinner, Dice & Dragons loop: demand, GM, place.",
  },
  {
    id: "beginner-sun",
    title: "Beginner hall",
    when: "Sundays 1:00p",
    place: "Florence Public Library meeting room (check posting)",
    system: "D&D 5e 2024",
    seats: "4 seats",
    roleNeed: "Players",
    blurb: "Learn the 2024 rules with toolkit cards on the table. No homework.",
  },
];
