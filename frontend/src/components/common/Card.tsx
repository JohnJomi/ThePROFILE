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
  "relative rounded-sm border border-border/70 bg-transparent text-card-foreground transition-all duration-300 ease-out";

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
      "cursor-pointer hover:-translate-y-1 hover:bg-foreground/3",
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
    "relative rounded-sm border border-border/70 bg-transparent text-card-foreground transition-all duration-300 ease-out",
    cardVariants({ padding }),
    hoverable &&
      "cursor-pointer hover:-translate-y-1 hover:bg-foreground/3",
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
