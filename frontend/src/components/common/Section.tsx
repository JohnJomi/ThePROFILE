"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { useReducedMotion } from "@/hooks";
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
  // Omit native drag events that conflict with Framer Motion's drag API
  onDrag?: never;
  onDragEnd?: never;
  onDragEnter?: never;
  onDragExit?: never;
  onDragLeave?: never;
  onDragOver?: never;
  onDragStart?: never;
}

export function Section({
  id,
  className,
  containerSize = "default",
  animated = true,
  children,
  ...props
}: SectionProps) {
  const containerClassName = containerSize === "full" ? "" : "section-padding";

  const content = (
    <Container size={containerSize} className={containerClassName}>
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
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
  overlineClassName?: string;
  headingClassName?: string;
  descriptionClassName?: string;
  /**
   * Opt in to a scroll-scrubbed, word-by-word reveal of the heading — the words
   * rise from below as the section is approached rather than simply fading in.
   * Default `false`, so every existing call site is unchanged.
   */
  reveal?: boolean;
}

export function SectionHeader({
  overline,
  heading,
  description,
  align = "center",
  className,
  overlineClassName,
  headingClassName,
  descriptionClassName,
  reveal = false,
}: SectionHeaderProps) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  if (reveal) {
    return (
      <RevealSectionHeader
        overline={overline}
        heading={heading}
        description={description}
        alignClass={alignClass}
        className={className}
        overlineClassName={overlineClassName}
        headingClassName={headingClassName}
        descriptionClassName={descriptionClassName}
      />
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      className={cn("mb-12 flex flex-col gap-4", alignClass, className)}
    >
      {overline && (
        <span
          className={cn(
            "text-xs font-medium uppercase tracking-[0.22em] text-brand",
            overlineClassName,
          )}
        >
          {overline}
        </span>
      )}
      <h2 className={cn("font-heading text-4xl leading-[0.98] md:text-5xl lg:text-6xl", headingClassName)}>
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty leading-relaxed text-muted-foreground",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

// ─── RevealSectionHeader ──────────────────────────────────────────────────────

/**
 * RevealSectionHeader — the `reveal` variant of SectionHeader.
 *
 * The heading emerges word by word from below, scrubbed by the header's own
 * scroll position, so it reads as the section rising out of the hero rather than
 * a plain opacity fade. The copy is only split on spaces — never rewritten.
 *
 * Under reduced motion it renders a plain, static header.
 */
function RevealSectionHeader({
  overline,
  heading,
  description,
  alignClass,
  className,
  overlineClassName,
  headingClassName,
  descriptionClassName,
}: Omit<SectionHeaderProps, "align" | "reveal"> & { alignClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // The reveal only engages after mount. Server-rendered markup stays fully
  // visible, so the heading is never hidden pre-hydration or with JS disabled.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Deferred by a frame so the flag is not set synchronously inside the effect.
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const animate = mounted && !prefersReduced;
  const words = heading.split(" ");

  return (
    <div ref={ref} className={cn("mb-12 flex flex-col gap-4", alignClass, className)}>
      {overline && (
        <motion.span
          style={animate ? { opacity: scrollYProgress } : undefined}
          className={cn(
            "text-xs font-medium uppercase tracking-[0.22em] text-brand",
            overlineClassName,
          )}
        >
          {overline}
        </motion.span>
      )}

      <h2
        className={cn(
          "font-heading text-4xl leading-[0.98] md:text-5xl lg:text-6xl",
          headingClassName,
        )}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <RevealWord
              progress={scrollYProgress}
              index={index}
              total={words.length}
              enabled={animate}
            >
              {word}
            </RevealWord>
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>

      {description && (
        <motion.p
          style={animate ? { opacity: scrollYProgress } : undefined}
          className={cn(
            "max-w-2xl text-pretty leading-relaxed text-muted-foreground",
            descriptionClassName,
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/** One heading word, rising from below on its own slightly staggered window. */
function RevealWord({
  progress,
  index,
  total,
  enabled,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  enabled: boolean;
  children: React.ReactNode;
}) {
  // Later words start marginally later, giving a line-level cascade.
  const stagger = total > 1 ? (index / total) * 0.35 : 0;
  const start = stagger;
  const end = Math.min(1, 0.65 + stagger);

  const y = useTransform(progress, [start, end], [110, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.span
      style={enabled ? { y, opacity, willChange: "transform" } : undefined}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
