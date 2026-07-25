"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer, defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Container, type ContainerProps } from "./Container";

/**
 * Section — full-width page section wrapper with scroll-reveal animation.
 *
 * Responsibilities:
 *   - Provides consistent vertical padding between page sections
 *   - Wraps content in a Container for horizontal width control
 *   - Triggers a stagger fade-up animation when scrolled into view
 *   - Accepts an `id` for in-page anchor navigation (#about, #projects, etc.)
 *
 * Mark `animated={false}` for sections that should not animate
 * (e.g., the hero, which appears on initial load and handles its own motion).
 *
 * Used by: every portfolio section (Hero, About, Projects, etc.)
 */

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML id for anchor navigation. Should match the nav link href (#about). */
  id?: string;
  /** Container size variant. Defaults to "default". */
  containerSize?: ContainerProps["size"];
  /** Whether to apply scroll-triggered entrance animation. Default: true. */
  animated?: boolean;
}

export function Section({
  id,
  className,
  containerSize = "default",
  animated = true,
  children,
  ...props
}: SectionProps) {
  const content = (
    <Container size={containerSize} className="section-padding">
      {children}
    </Container>
  );

  if (!animated) {
    return (
      <section id={id} className={cn("relative w-full", className)} {...props}>
        {content}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn("relative w-full", className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {content}
    </motion.section>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

/**
 * SectionHeader — standardised header for every portfolio section.
 *
 * Renders:
 *   overline (optional) → small uppercase label e.g. "What I've Built"
 *   heading             → the section title
 *   description (opt.)  → a single paragraph of supporting text
 *
 * All text alignment is controlled by the `align` prop so sections can
 * choose their own visual alignment without writing custom styles.
 *
 * Used by: Projects, Skills, Experience, About, Contact sections.
 */

export interface SectionHeaderProps {
  /** Small label rendered above the heading. */
  overline?: string;
  /** Primary section title. */
  heading: string;
  /** Optional supporting description (1–2 sentences). */
  description?: string;
  /** Text alignment. Default: "center". */
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  overline,
  heading,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      variants={fadeUp}
      className={cn("mb-12 flex flex-col gap-3", alignClass, className)}
    >
      {overline && (
        <span className="font-mono text-xs font-semibold tracking-widest text-brand uppercase">
          {overline}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
      {description && (
        <p className="max-w-2xl text-muted-foreground text-pretty leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
