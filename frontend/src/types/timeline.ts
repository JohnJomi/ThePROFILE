/**
 * types/timeline.ts — Timeline domain interfaces.
 *
 * The timeline is a unified, chronologically sorted view combining
 * experience, education, and achievements.
 * It is assembled at runtime from the individual data arrays.
 *
 * Used by: src/data/timeline.ts, Timeline/Experience section.
 */

export type TimelineItemType = "experience" | "education" | "achievement";

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  subtitle: string;
  /** ISO-8601 date string (YYYY-MM). Used for chronological sorting. */
  date: string;
  endDate?: string;
  description?: string;
  /** Bullet-point achievements, rendered under the description. */
  highlights?: string[];
  tags?: string[];
  /** Supporting links (repos, papers, write-ups). */
  links?: { label: string; url: string }[];
  url?: string;
  logoUrl?: string;
  /** Whether this is a current/ongoing item (e.g., current job). */
  current: boolean;
}
