import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { ToolkitHero } from "@/components/toolkit-hero";
import { ToolkitCard } from "@/components/toolkit-card";
import { ToolkitWorkbench } from "@/components/toolkit-workbench";
import { ToolkitSources } from "@/components/toolkit-sources";
import { ToolkitAudit } from "@/components/toolkit-audit";
import { TOOLKIT_PROJECTS, filterProjects } from "@/lib/toolkit-projects";
import { TOOLKIT_CATEGORIES, type ToolkitCategory } from "@/lib/toolkit-schema";
import { BMC_URL } from "@/lib/money";
import "@/styles/toolkit.css";

export const Route = createFileRoute("/")({ component: HubHome });

function HubHome() {
  // Filters are temporary presentation state. Existing tool saves remain independent.
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolkitCategory | "all">("all");
  const projects = filterProjects(query, category);
  return (
    <div className="toolkit-home">
      <ToolkitHero count={TOOLKIT_PROJECTS.length} />
      <section id="toolkit" className="toolkit-directory" aria-labelledby="directory-title">
        <div className="toolkit-directory-heading"><div><p className="toolkit-eyebrow">EVERYTHING HAS ITS PLACE</p><h2 id="directory-title">What are we doing today?</h2></div>
          <span className="toolkit-directory-note">One home. Your favorite tools.</span></div>
        <div className="toolkit-controls">
          <div className="toolkit-filter-tabs" role="group" aria-label="Filter tools by task">
            <button type="button" onClick={() => setCategory("all")} aria-pressed={category === "all"}>All tools <span>{TOOLKIT_PROJECTS.length}</span></button>
            {TOOLKIT_CATEGORIES.map((item) => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{({ play: "Play", prepare: "Prepare", create: "Create", community: "Community" })[item.id]}</button>)}
          </div>
          <label className="toolkit-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search tools</span><input type="search" placeholder="Find a tool…" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={15} /></button>}</label>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{projects.length} {projects.length === 1 ? "project" : "projects"} shown</p>
        {TOOLKIT_CATEGORIES.map((group) => {
          const members = projects.filter((project) => project.category === group.id);
          if (!members.length) return null;
          return <section key={group.id} className={`toolkit-group category-${group.id}`} aria-labelledby={`group-${group.id}`}>
            <div className="toolkit-group-heading"><h2 id={`group-${group.id}`}>{group.title}<span>{members.length.toString().padStart(2, "0")}</span></h2><p>{group.description}</p></div>
            <div className="toolkit-grid">{members.map((project) => <ToolkitCard key={project.id} project={project} />)}</div>
          </section>;
        })}
        {!projects.length && <div className="toolkit-empty"><Search size={28} aria-hidden="true" /><h3>No tools found</h3><p>Try a name like “cards,” “map,” or “journal.”</p><button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>Show all tools</button></div>}
        <p className="toolkit-boundary">Linked tools open in a new tab and keep their own saves. “Project source” entries need setup or further work. Iron Pit is reserved as a placeholder.</p>
      </section>
      <ToolkitWorkbench />
      <ToolkitAudit />
      <ToolkitSources />
      <footer className="toolkit-footer"><div><strong>Made for the stories you haven't told yet.</strong><p>An independent, unofficial D&D toolkit. Not affiliated with Wizards of the Coast.</p></div><a href={BMC_URL} target="_blank" rel="noopener noreferrer">Support the toolkit ↗</a></footer>
    </div>
  );
}
