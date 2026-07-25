/**
 * data/skills.ts — Technical skills.
 *
 * Add skills grouped by category. The Skills section renders
 * `skillGroups` which is pre-grouped for efficient rendering.
 *
 * Used by: Skills section, About section, resume export.
 */

import type { Skill, SkillGroup } from "@/types/skill";

export const skills: Skill[] = [];

/**
 * Skills pre-grouped by category.
 * Derived from `skills` array — no duplication required.
 */
export const skillGroups: SkillGroup[] = Object.values(
  skills.reduce<Record<string, SkillGroup>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = { category: skill.category, skills: [] };
    }
    acc[skill.category].skills.push(skill);
    return acc;
  }, {}),
);
