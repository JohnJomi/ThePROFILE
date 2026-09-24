"use client";

import { useMemo, useRef } from "react";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * BlurText — reveals text word-by-word (or letter-by-letter) by sharpening it
 * out of a blur as the page is scrolled past it. Purely scroll-scrubbed: no
 * pop-in, no timed transition — every segment's blur/opacity is a direct
 * function of scroll position, staggered slightly per segment.
 *
 * Under reduced motion it renders the text fully visible, no animation.
 */

export interface BlurTextProps {
  text?: string;
  className?: string;
  /** Animate by "words" or "letters". Default: "words". */
  animateBy?: "words" | "letters";
  /** Stagger amount between segments, as a fraction of the scroll window (0–1). Default: 0.3. */
  stagger?: number;
  as?: "p" | "span" | "div";
}

export function BlurText({
  text = "",
  className,
  animateBy = "words",
  stagger = 0.3,
  as: Tag = "p",
}: BlurTextProps) {
  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy],
  );

  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  if (prefersReduced) {
    return (
      <Tag ref={ref as never} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as never}
      className={cn("flex flex-wrap", className)}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {segments.map((segment, index) => {
        const start = segments.length > 1 ? (index / segments.length) * stagger : 0;
        const end = Math.min(1, start + (1 - stagger));

        return (
          <BlurSegment key={`${segment}-${index}`} progress={scrollYProgress} start={start} end={end}>
            {segment === " " ? " " : segment}
            {animateBy === "words" && index < segments.length - 1 ? " " : ""}
          </BlurSegment>
        );
      })}
    </Tag>
  );
}

function BlurSegment({
  progress,
  start,
  end,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const blur = useTransform(progress, [start, end], [10, 0]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.span
      style={{ opacity, filter, willChange: "filter, opacity" }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
