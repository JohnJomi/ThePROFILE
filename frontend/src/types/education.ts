/**
 * types/education.ts — Education domain interfaces.
 *
 * Used by: src/data/education.ts, About/Education section.
 */

export type DegreeType =
  | "Bachelor's"
  | "Master's"
  | "PhD"
  | "Associate"
  | "Diploma"
  | "Certificate"
  | "Bootcamp"
  | "Online Course";

export interface Education {
  id: string;
  institution: string;
  institutionUrl?: string;
  logoUrl?: string;
  degreeType: DegreeType;
  field: string;
  /** ISO-8601 date string (YYYY-MM). */
  startDate: string;
  /** ISO-8601 date string (YYYY-MM). Omit if currently enrolled. */
  endDate?: string;
  location?: string;
  gpa?: string;
  description?: string;
  highlights?: string[];
}
