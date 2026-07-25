/**
 * data/projects.ts — Portfolio projects.
 *
 * Add each project as an object conforming to the Project interface.
 * The `slug` field is used as the URL path: /projects/[slug].
 *
 * Used by: Projects section, /projects/[slug] detail pages,
 *          semantic search index builder.
 */

import type { Project } from "@/types/project";

export const projects: Project[] = [];

/** Featured projects — shown on the home page Projects section. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);
