/**
 * types/experience.ts — Work experience domain interfaces.
 *
 * Used by: src/data/experience.ts, Experience section, timeline.
 */

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship"
  | "volunteer";

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  companyLogoUrl?: string;
  role: string;
  employmentType: EmploymentType;
  /** ISO-8601 date string (YYYY-MM). */
  startDate: string;
  /** ISO-8601 date string (YYYY-MM). Omit for current role. */
  endDate?: string;
  location: string;
  remote: boolean;
  /** Short description shown in the timeline card. */
  description: string;
  /** Bullet-point achievements/highlights. */
  highlights: string[];
  technologies: string[];
}
