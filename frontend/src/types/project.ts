/**
 * types/project.ts — Project domain interfaces.
 *
 * Used by: src/data/projects.ts, Projects section, project detail pages,
 *          semantic search index builder.
 */

export type ProjectStatus = "completed" | "in-progress" | "archived";

export interface Project {
  /** URL-safe identifier — used as the dynamic route slug: /projects/[slug] */
  slug: string;
  title: string;
  description: string;
  /** Full markdown/MDX write-up rendered on the detail page. */
  longDescription?: string;
  /** Ordered list of technology names. */
  tags: string[];
  /** Path relative to /public or absolute CDN URL. */
  coverImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  /** ISO-8601 date string (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
}
