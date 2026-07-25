/**
 * types/timeline.ts — Timeline domain interfaces.
 *
 * The timeline is a unified, chronologically sorted view combining
 * experience, education, achievements, and certifications.
 * It is assembled at runtime from the individual data arrays.
 *
 * Used by: src/data/timeline.ts, Timeline/Experience section.
 */

export type TimelineItemType = "experience" | "education" | "achievement" | "certification";

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  subtitle: string;
  /** ISO-8601 date string (YYYY-MM). Used for chronological sorting. */
  date: string;
  endDate?: string;
  description?: string;
  tags?: string[];
  url?: string;
  logoUrl?: string;
  /** Whether this is a current/ongoing item (e.g., current job). */
  current: boolean;
}
