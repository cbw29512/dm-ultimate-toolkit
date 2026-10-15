import { BookOpen, Brush, Dices, Heart, Layers3, Map, Mic, PenLine, Sparkles, Swords, Users, UserRound } from "lucide-react";
import type { ToolkitProject } from "@/lib/toolkit-schema";

const ICONS = { swords: Swords, map: Map, cards: Layers3, dice: Dices, heart: Heart, hero: UserRound,
  book: BookOpen, pen: PenLine, mic: Mic, art: Brush, people: Users, spark: Sparkles };

export function ToolkitIcon({ name, className }: { name: ToolkitProject["icon"]; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.5} />;
}
