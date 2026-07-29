"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { fadeUp, hoverLift } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Card — base surface component for content grouping.
 *
 * Animation modes (independent, combinable):
 *   animated   — fade-up entrance when this card's parent triggers variants
 *                (use inside a staggerContainer for staggered lists)
 *   hoverable  — lift + shadow on hover for interactive/clickable cards
 *
 * The Card itself is not interactive. For clickable cards, wrap in <Link>
 * or add an onClick to the parent and set hoverable for the visual feedback.
 *
 * Accessibility: non-interactive div. Parent provides link/button semantics.
 *
 * Used by: ProjectCard, TimelineCard, skill groups.
 */

const glassSurface =
  "relative rounded-2xl border border-white/15 bg-white/75 text-card-foreground backdrop-blur-xl shadow-[0_10px_30px_rgb(15_23_42/0.08),0_2px_8px_rgb(15_23_42/0.04),inset_0_1px_0_rgb(255_255_255/0.45)] transition-all duration-300 ease-out dark:border-white/10 dark:bg-white/10 dark:shadow-[0_18px_50px_rgb(0_0_0/0.35),0_1px_0_rgb(255_255_255/0.06),inset_0_1px_0_rgb(255_255_255/0.08)]";

const cardVariants = cva(glassSurface, {
  variants: {
    padding: {
      none: "",
      sm: "p-4",
      default: "p-5 md:p-6",
      lg: "p-6 md:p-8",
    },
  },
  defaultVariants: { padding: "default" },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  animated?: boolean;
  hoverable?: boolean;
  // Omit native drag events that conflict with Framer Motion's drag API
  onDrag?: never;
  onDragEnd?: never;
  onDragEnter?: never;
  onDragExit?: never;
  onDragLeave?: never;
  onDragOver?: never;
  onDragStart?: never;
}

export function Card({
  className,
  padding,
  animated = false,
  hoverable = false,
  children,
  ...props
}: Readonly<CardProps>) {
  const cls = cn(
    cardVariants({ padding }),
    hoverable &&
      "cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_60px_rgb(15_23_42/0.14),0_4px_16px_rgb(15_23_42/0.08)] dark:hover:shadow-[0_24px_70px_rgb(0_0_0/0.45),0_4px_18px_rgb(0_0_0/0.2)]",
    className,
  );

  if (!animated && !hoverable) {
    return (
      <div className={cls} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cls}
      variants={animated ? fadeUp : undefined}
      initial={hoverable && !animated ? "rest" : undefined}
      whileHover={hoverable ? "hover" : undefined}
      animate={hoverable && !animated ? "rest" : undefined}
      style={{ willChange: "transform" }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
    >
      {hoverable ? (
        <motion.div variants={hoverLift} className="h-full">
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}

// ─── GlassCard ────────────────────────────────────────────────────────────────

/**
 * GlassCard — frosted-glass surface for floating over backgrounds.
 *
 * Uses backdrop-blur and translucent fill. Works best over gradient or
 * image backgrounds where the blur effect is visible.
 *
 * Identical API to Card with different visual treatment.
 *
 * Used by: stat callouts, feature highlights, floating UI panels.
 */

export type GlassCardProps = CardProps;

export function GlassCard({
  className,
  padding = "default",
  animated = false,
  hoverable = false,
  children,
  ...props
}: Readonly<GlassCardProps>) {
  const cls = cn(
    "relative rounded-2xl border border-white/20 bg-white/82 text-card-foreground backdrop-blur-xl shadow-[0_14px_40px_rgb(15_23_42/0.1),0_2px_10px_rgb(15_23_42/0.05),inset_0_1px_0_rgb(255_255_255/0.5)] transition-all duration-300 ease-out dark:border-white/12 dark:bg-white/12 dark:shadow-[0_22px_70px_rgb(0_0_0/0.4),0_1px_0_rgb(255_255_255/0.08),inset_0_1px_0_rgb(255_255_255/0.1)]",
    cardVariants({ padding }),
    hoverable &&
      "cursor-pointer hover:-translate-y-1 hover:shadow-[0_22px_70px_rgb(15_23_42/0.16),0_6px_20px_rgb(15_23_42/0.1)] dark:hover:shadow-[0_26px_80px_rgb(0_0_0/0.48),0_6px_22px_rgb(0_0_0/0.22)]",
    className,
  );

  if (!animated && !hoverable) {
    return (
      <div className={cls} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cls}
      variants={animated ? fadeUp : undefined}
      initial={hoverable && !animated ? "rest" : undefined}
      whileHover={hoverable ? "hover" : undefined}
      animate={hoverable && !animated ? "rest" : undefined}
      style={{ willChange: "transform" }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
    >
      {hoverable ? (
        <motion.div variants={hoverLift} className="h-full">
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
