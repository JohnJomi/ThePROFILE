"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * JourneyTimeline — the journey milestones, revealed one at a time by scroll.
 *
 * Previously a single time-based stagger that fired once when the list entered
 * view, so all five points animated together on a timer regardless of where the
 * reader had scrolled to. Now one `useScroll` on the list drives a per-item
 * window, so each point arrives as the reader scrolls past it and rewinds when
 * they scroll back up.
 *
 * One scroll listener for the whole list; each item derives its own values from
 * that single progress value, so nothing costs a React render per frame.
 *
 * Used by: src/app/about/page.tsx (Journey section)
 */

/** Fraction of each item's slot spent animating; the remainder is a settle gap. */
const ITEM_DUTY = 0.8;

export function JourneyTimeline({ items }: { items: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // The reveal engages only after mount, so the server-rendered list is fully
  // visible and never depends on JS to be readable.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Progress 0 as the list nears the bottom of the viewport → 1 once its end has
  // risen past the upper third, which is the span the reader scrubs through.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  const enabled = mounted && !prefersReduced;

  return (
    <div ref={ref} className="flex flex-col gap-6">
      {items.map((item, index) => (
        <JourneyItem
          key={item}
          label={item}
          index={index}
          total={items.length}
          progress={scrollYProgress}
          enabled={enabled}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

/**
 * One milestone. Its own component so each item can own its `useTransform`
 * calls rather than calling hooks inside a loop.
 */
function JourneyItem({
  label,
  index,
  total,
  progress,
  enabled,
  isLast,
}: {
  label: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  enabled: boolean;
  isLast: boolean;
}) {
  // Each item gets an equal, non-overlapping slice of the scroll span, so they
  // land in order rather than all at once.
  const slot = 1 / total;
  const start = index * slot;
  const end = start + slot * ITEM_DUTY;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const dotScale = useTransform(progress, [start, end], [0.3, 1]);

  return (
    <motion.div style={enabled ? { opacity, y } : undefined} className="relative pl-1">
      <motion.span
        aria-hidden="true"
        style={enabled ? { scale: dotScale } : undefined}
        className={cn(
          "absolute -left-[2.05rem] top-2 size-3 rounded-full border border-bg-primary",
          isLast ? "bg-accent-gold" : "bg-text-primary",
        )}
      />
      <div className="flex items-center gap-4">
        <p className="text-sm uppercase tracking-[0.2em] text-text-primary/60">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="text-lg font-medium text-text-primary">{label}</p>
      </div>
    </motion.div>
  );
}
