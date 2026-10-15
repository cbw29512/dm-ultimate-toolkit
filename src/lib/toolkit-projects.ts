import { PLAY_PROJECTS } from "./toolkit-play";
import { PREPARE_PROJECTS } from "./toolkit-prepare";
import { CREATE_PROJECTS } from "./toolkit-create";
import { COMMUNITY_PROJECTS } from "./toolkit-community";
import type { ToolkitCategory, ToolkitProject } from "./toolkit-schema";

// One data registry drives counts, filters, and cards so the views cannot drift.
export const TOOLKIT_PROJECTS: readonly ToolkitProject[] = [
  ...PLAY_PROJECTS, ...PREPARE_PROJECTS, ...CREATE_PROJECTS, ...COMMUNITY_PROJECTS,
];

export function filterProjects(query: string, category: ToolkitCategory | "all") {
  try {
    const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    return TOOLKIT_PROJECTS.filter((project) =>
      (category === "all" || project.category === category) &&
      terms.every((term) => `${project.title} ${project.description} ${project.repository ?? ""}`.toLocaleLowerCase().includes(term)),
    );
  } catch (error) {
    console.error("[toolkit] Project search could not be completed", error);
    return [];
  }
}
