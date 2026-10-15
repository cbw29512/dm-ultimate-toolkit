import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Wrench } from "lucide-react";

const TOOLS = [
  { to: "/pit/dice", label: "Quick dice" }, { to: "/pit/forge", label: "Character workbench" },
  { to: "/pit/bestiary", label: "Monster workbench" }, { to: "/pit/maps", label: "Map sketches" },
  { to: "/pit/cards", label: "Cards & loot" }, { to: "/pit/tome", label: "Session board" },
  { to: "/pit/scribe", label: "Quick notes" }, { to: "/pit/translator", label: "Fantasy ciphers" },
] as const;

export function ToolkitWorkbench() {
  return (
    <section id="workbench" className="toolkit-workbench" aria-labelledby="workbench-title">
      <div><p className="toolkit-eyebrow"><Wrench size={14} /> BUILT INTO THIS HUB</p>
        <h2 id="workbench-title">A few things, right at hand.</h2>
        <p>Small tools for a quick start. Workbench saves stay on this device; specialist projects open separately.</p></div>
      <div className="workbench-links">{TOOLS.map((tool) => <Link key={tool.to} to={tool.to}>{tool.label}<ArrowUpRight size={14} /></Link>)}</div>
    </section>
  );
}
