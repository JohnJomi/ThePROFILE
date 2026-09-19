"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { useMediaQuery, useReducedMotion } from "@/hooks";
import { fadeUp, staggerContainerSlow } from "@/lib/motion";

/**
 * SkillsChapter — one chapter of the Skills page, with a separate scroll effect
 * per device class. Both replay in both directions, every time.
 *
 * Desktop (lg+): scroll-scrubbed. One `useScroll` per chapter; the text column
 * slides in from the left and each technology drifts up and fades in on its
 * own slice of the scroll span, then everything fades out as the chapter
 * leaves the top. Scrolling back up plays it in reverse.
 *
 * Mobile (<lg): triggered. The chapter staggers in when it enters the viewport
 * and resets when it leaves, so it replays whichever way the reader arrives.
 * Scrubbing on touch fights momentum scrolling.
 *
 * Engages only after mount so server-rendered content is fully visible;
 * reduced motion leaves it static.
 */

const textSizes = [38, 40, 36, 44, 39, 37, 41, 42] as const;

/** Horizontal offsets (%) cycled down the column so chips zig-zag instead of stacking. */
const editorialLefts = [30, 4, 40, 12, 34, 2, 38, 16] as const;

/** Spreads chips evenly over the full height so short chapters fill the space. */
function editorialPosition(index: number, count: number) {
  const top = count > 1 ? 4 + (index * 84) / (count - 1) : 40;
  return { top: `${top}%`, left: `${editorialLefts[index % editorialLefts.length]}%` };
}

type Mode = "static" | "desktop" | "mobile";

interface SkillsChapterProps {
  overline: string;
  heading: string;
  summary: string;
  chips: readonly string[];
  icon: ComponentType<{ className?: string }>;
}

export function SkillsChapter({
  overline,
  heading,
  summary,
  chips,
  icon: Icon,
}: SkillsChapterProps) {
  const isDesktop = useMediaQuery("lg");
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const mode: Mode = !mounted || prefersReduced ? "static" : isDesktop ? "desktop" : "mobile";
  const desktop = mode === "desktop";
  const mobile = mode === "mobile";

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-56, 0, 0, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0, 0, -40]);
  const textStyle = desktop ? { opacity: textOpacity, x: textX, y: textY } : undefined;
  const mobileVariants = mobile ? fadeUp : undefined;

  return (
    <motion.section
      ref={ref}
      variants={mobile ? staggerContainerSlow : undefined}
      initial={mobile ? "hidden" : false}
      whileInView={mobile ? "visible" : undefined}
      viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
      className="flex min-h-[92vh] flex-col justify-center border-t border-border-hairline py-12 first:border-t-0 first:pt-0 lg:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div style={textStyle} className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Icon className="size-5 text-accent-gold" aria-hidden="true" />
            <motion.h3
              variants={mobileVariants}
              className="text-xs font-medium uppercase tracking-[0.22em] text-accent-gold"
            >
              {overline}
            </motion.h3>
          </div>
          <motion.h4
            variants={mobileVariants}
            className="max-w-2xl font-heading text-4xl leading-[0.96] md:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h4>
          <motion.p
            variants={mobileVariants}
            className="max-w-xl text-base leading-8 text-text-primary/72 md:text-lg"
          >
            {summary}
          </motion.p>
        </motion.div>

        <div className="relative min-h-[68vh] overflow-hidden lg:min-h-[72vh]">
          {chips.map((technology, index) => (
            <Chip
              key={technology}
              label={technology}
              index={index}
              total={chips.length}
              mode={mode}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Chip({
  label,
  index,
  total,
  mode,
  progress,
}: {
  label: string;
  index: number;
  total: number;
  mode: Mode;
  progress: MotionValue<number>;
}) {
  // Each chip owns a slice of the arrival span (0.12–0.5), so they land in order.
  const start = 0.12 + (index / total) * 0.38;
  const stops = [0, start, start + 0.14, 0.86, 1];
  const opacity = useTransform(progress, stops, [0, 0, 1, 1, 0]);
  const y = useTransform(progress, stops, [48, 48, 0, 0, -32]);

  return (
    <motion.span
      variants={mode === "mobile" ? fadeUp : undefined}
      style={{
        ...editorialPosition(index, total),
        fontSize: textSizes[index % textSizes.length],
        ...(mode === "desktop" ? { opacity, y } : undefined),
      }}
      whileHover={{
        color: "var(--accent-gold)",
        textShadow: "0 0 18px rgb(232 185 62 / 0.35)",
      }}
      className="absolute font-heading font-medium leading-none tracking-tight text-text-primary/35 transition-colors duration-300 hover:text-text-primary"
    >
      {label}
    </motion.span>
  );
}
