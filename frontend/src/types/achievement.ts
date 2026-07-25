/**
 * types/achievement.ts — Achievement domain interfaces.
 *
 * Achievements are notable accomplishments (awards, publications,
 * open-source milestones, conference talks, etc.).
 *
 * Used by: src/data/achievements.ts, About section, Awards section.
 */

export type AchievementType =
  | "award"
  | "publication"
  | "talk"
  | "open-source"
  | "competition"
  | "recognition"
  | "other";

export interface Achievement {
  id: string;
  title: string;
  type: AchievementType;
  issuer?: string;
  /** ISO-8601 date string (YYYY-MM-DD or YYYY-MM). */
  date: string;
  description?: string;
  url?: string;
}
