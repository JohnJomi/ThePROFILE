/**
 * types/skill.ts — Skill domain interfaces.
 *
 * Used by: src/data/skills.ts, Skills section.
 */

export type SkillCategory =
  | "Languages"
  | "Frameworks & Libraries"
  | "AI / ML"
  | "Cloud & Infrastructure"
  | "Databases"
  | "Tools & Platforms";

export type ProficiencyLevel = "expert" | "proficient" | "familiar";

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  /** Optional URL to the technology's official website. */
  url?: string;
  /** Lucide icon name or path to SVG icon in /public. */
  icon?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}
