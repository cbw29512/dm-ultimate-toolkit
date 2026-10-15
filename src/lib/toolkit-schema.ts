// Destination is explicit so a source-only project never masquerades as a live app.
export type ToolkitDestination =
  | { kind: "external"; url: string }
  | { kind: "workbench"; url: string }
  | { kind: "source"; url: string }
  | { kind: "placeholder" };

export type ToolkitCategory = "play" | "prepare" | "create" | "community";
export type ToolkitProject = Readonly<{
  id: string;
  title: string;
  category: ToolkitCategory;
  description: string;
  icon: "swords" | "map" | "cards" | "dice" | "heart" | "hero" | "book" | "pen" | "mic" | "art" | "people" | "spark";
  destination: ToolkitDestination;
  repository?: string;
  featured?: boolean;
}>;

export const TOOLKIT_CATEGORIES = [
  { id: "play", title: "At the table", description: "Run the encounter. Keep the story moving." },
  { id: "prepare", title: "Prepare your session", description: "Characters, cards, and everything behind the screen." },
  { id: "create", title: "Build your world", description: "Adventures, journals, and a little imagination." },
  { id: "community", title: "Find your people", description: "Learn the game and bring a table together." },
] as const;
