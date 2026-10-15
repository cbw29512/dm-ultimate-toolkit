import { ArrowUpRight } from "lucide-react";
import { TOOLKIT_PROJECTS } from "@/lib/toolkit-projects";

// Retain older work for review without presenting it as an implemented integration.
const ADDITIONAL_SOURCES = ["DungeonMaps", "DungeonGate", "dnd-campaign-portal", "MonsterColoringBook",
  "DNDTeachingAdventureDemonsWrath", "DND_DM_Player_Instruction", "WendyBdayOneShot", "sin-eaters-feast",
  "dungeoncourtroom", "dungeoncourtroom-pipeline", "lootforge", "dnd_ai_dungeon_master", "Myth-Etcher"];
const SOURCES = [...new Set([...TOOLKIT_PROJECTS.flatMap((p) => p.repository ? [p.repository] : []), ...ADDITIONAL_SOURCES])].sort();

export function ToolkitSources() {
  return (
    <details className="toolkit-sources" id="sources">
      <summary><span>Behind the toolkit <small>Source projects & earlier experiments</small></span><span className="source-count">{SOURCES.length} repositories</span></summary>
      <p>Keep the original work in reach while we bring the toolkit together. A source link does not mean its features have been moved into this hub.</p>
      <div>{SOURCES.map((repository) => <a key={repository} href={`https://github.com/cbw29512/${repository}`} target="_blank" rel="noopener noreferrer">{repository}<ArrowUpRight size={12} aria-hidden="true" /></a>)}</div>
    </details>
  );
}
