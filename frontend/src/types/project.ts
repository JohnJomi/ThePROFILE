/**
 * types/project.ts — Project domain interfaces.
 *
 * Used by: src/data/projects.ts, Projects section, project detail pages,
 *          semantic search index builder.
 */

export type ProjectStatus = "completed" | "in-progress" | "archived";

/** A single body block on a project case-study page. */
export interface CaseStudySection {
  heading: string;
  /** Lead paragraph for the section. */
  body?: string;
  /** Bulleted detail. Rendered beneath `body` when both are present. */
  bullets?: string[];
  /** Two-column reference table, e.g. layer/purpose or role/description. */
  table?: {
    headers: [string, string];
    rows: [string, string][];
  };
}

/**
 * Long-form write-up rendered at /projects/[slug].
 *
 * Content is derived from each repository's README and architecture docs —
 * those remain the source of truth, so update them first and mirror changes here.
 */
export interface CaseStudy {
  /** One-paragraph lede beneath the title. */
  summary: string;
  /** The problem the project sets out to solve. */
  problem: string;
  sections: CaseStudySection[];
  /** Grouped technology breakdown, e.g. Frontend / Backend / Infrastructure. */
  stack: { label: string; items: string[] }[];
  /** Caveat shown above the body, e.g. when a project is scaffold-only. */
  note?: string;
}

export interface Project {
  /** URL-safe identifier — used as the dynamic route slug: /projects/[slug] */
  slug: string;
  title: string;
  description: string;
  /** Full markdown/MDX write-up rendered on the detail page. */
  longDescription?: string;
  /** Ordered list of technology names. */
  tags: string[];
  /** Headline capabilities listed on the large showcase block. */
  highlights?: string[];
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
