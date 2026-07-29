/**
 * data/skills.ts — Technical skills.
 *
 * Add skills grouped by category. The Skills section renders
 * `skillGroups` which is pre-grouped for efficient rendering.
 *
 * Used by: Skills section, About section, resume export.
 */

import type { Skill, SkillGroup } from "@/types/skill";

export const skills: Skill[] = [
  { name: "Python", category: "Languages", proficiency: "expert" },
  { name: "Java", category: "Languages", proficiency: "proficient" },
  { name: "C", category: "Languages", proficiency: "proficient" },
  { name: "TypeScript", category: "Languages", proficiency: "expert" },
  { name: "JavaScript", category: "Languages", proficiency: "proficient" },
  { name: "SQL", category: "Languages", proficiency: "proficient" },

  { name: "React", category: "Frameworks & Libraries", proficiency: "expert" },
  { name: "Next.js", category: "Frameworks & Libraries", proficiency: "expert" },
  { name: "Node.js", category: "Frameworks & Libraries", proficiency: "proficient" },
  { name: "Express", category: "Frameworks & Libraries", proficiency: "proficient" },
  { name: "Tailwind CSS", category: "Frameworks & Libraries", proficiency: "proficient" },
  { name: "Framer Motion", category: "Frameworks & Libraries", proficiency: "proficient" },
  { name: "Prisma", category: "Frameworks & Libraries", proficiency: "proficient" },

  { name: "Amazon Bedrock", category: "AI / ML", proficiency: "proficient" },
  { name: "LangChain", category: "AI / ML", proficiency: "proficient" },
  { name: "Hugging Face", category: "AI / ML", proficiency: "proficient" },
  { name: "PyTorch", category: "AI / ML", proficiency: "familiar" },
  { name: "TensorFlow", category: "AI / ML", proficiency: "familiar" },
  { name: "Machine Learning", category: "AI / ML", proficiency: "proficient" },
  { name: "Prompt Engineering", category: "AI / ML", proficiency: "proficient" },

  { name: "AWS", category: "Cloud & Infrastructure", proficiency: "proficient" },
  { name: "Docker", category: "Cloud & Infrastructure", proficiency: "proficient" },
  { name: "REST APIs", category: "Cloud & Infrastructure", proficiency: "expert" },
  { name: "GitHub Actions", category: "Cloud & Infrastructure", proficiency: "proficient" },

  { name: "PostgreSQL", category: "Databases", proficiency: "proficient" },
  { name: "MongoDB", category: "Databases", proficiency: "proficient" },
  { name: "Vector Search", category: "Databases", proficiency: "familiar" },

  { name: "Git", category: "Tools & Platforms", proficiency: "expert" },
  { name: "GitHub", category: "Tools & Platforms", proficiency: "expert" },
  { name: "Linux", category: "Tools & Platforms", proficiency: "proficient" },
  { name: "VS Code", category: "Tools & Platforms", proficiency: "expert" },
  { name: "Jupyter Notebooks", category: "Tools & Platforms", proficiency: "proficient" },
  { name: "Postman", category: "Tools & Platforms", proficiency: "proficient" },
];

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
