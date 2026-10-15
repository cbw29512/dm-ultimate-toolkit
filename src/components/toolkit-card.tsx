import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { ToolkitIcon } from "./toolkit-icons";
import type { ToolkitProject } from "@/lib/toolkit-schema";

const LABELS = { external: "Linked tool", workbench: "Workbench", source: "Project source", placeholder: "Reserved" };

export function ToolkitCard({ project }: { project: ToolkitProject }) {
  const destination = project.destination;
  return (
    <article className={`toolkit-card category-${project.category}${destination.kind === "placeholder" ? " is-reserved" : ""}`}>
      <div className="toolkit-card-top">
        <span className="toolkit-icon"><ToolkitIcon name={project.icon} /></span>
        <span className={`toolkit-status status-${destination.kind}`}>
          {destination.kind === "placeholder" ? <LockKeyhole size={11} aria-hidden="true" /> : <span aria-hidden="true" />}
          {LABELS[destination.kind]}
        </span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {destination.kind === "placeholder" ? (
        <span className="toolkit-reserved-note">Placeholder only</span>
      ) : (
        <a className="toolkit-card-link" href={destination.url} target={destination.kind === "workbench" ? undefined : "_blank"} rel="noopener noreferrer"
          aria-label={`${destination.kind === "source" ? "View project source for" : "Open"} ${project.title}${destination.kind === "workbench" ? "" : " (new tab)"}`}>
          {destination.kind === "source" ? "View project" : destination.kind === "workbench" ? "Open workbench" : "Open tool"}
          {destination.kind === "workbench" ? <ArrowRight size={15} /> : <ArrowUpRight size={15} />}
        </a>
      )}
    </article>
  );
}
