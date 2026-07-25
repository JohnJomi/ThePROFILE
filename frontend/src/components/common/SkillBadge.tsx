"use client";

import { motion } from "framer-motion";

import { scalePop } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProficiencyLevel, SkillCategory } from "@/types/skill";

import { Badge } from "./Badge";

/**
 * SkillBadge — animated badge for a technical skill with proficiency indicator.
 *
 * Extends Badge with:
 *   - Proficiency-aware color variant (expert → brand, proficient → secondary,
 *     familiar → muted)
 *   - Optional colored dot indicator
 *   - Spring-scale entrance animation — designed to be used inside a
 *     staggerContainer so siblings animate in sequence
 *
 * Accessibility:
 *   - aria-label encodes both name and proficiency level so color is not
 *     the only information channel
 *   - The dot is aria-hidden (decorative)
 *
 * Used by: Skills section.
 */

const proficiencyVariant: Record<ProficiencyLevel, "brand" | "secondary" | "muted"> = {
  expert: "brand",
  proficient: "secondary",
  familiar: "muted",
};

const proficiencyDotColor: Record<ProficiencyLevel, string> = {
  expert: "bg-brand",
  proficient: "bg-primary/60",
  familiar: "bg-muted-foreground/50",
};

export interface SkillBadgeProps {
  name: string;
  category?: SkillCategory;
  proficiency?: ProficiencyLevel;
  /** Show the proficiency dot. Default: true. */
  showIndicator?: boolean;
  className?: string;
}

/**
 * @example
 * <SkillBadge name="TypeScript" proficiency="expert" />
 * <SkillBadge name="Rust" proficiency="familiar" showIndicator={false} />
 */
export function SkillBadge({
  name,
  proficiency = "proficient",
  showIndicator = true,
  className,
}: SkillBadgeProps) {
  return (
    <motion.div variants={scalePop} className={cn("inline-flex", className)}>
      <Badge
        variant={proficiencyVariant[proficiency]}
        size="lg"
        aria-label={`${name} — ${proficiency}`}
        className="gap-1.5"
      >
        {showIndicator && (
          <span
            aria-hidden="true"
            className={cn("size-1.5 rounded-full flex-shrink-0", proficiencyDotColor[proficiency])}
          />
        )}
        {name}
      </Badge>
    </motion.div>
  );
}
