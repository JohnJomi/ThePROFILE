"use client";

import { useEffect, useRef, useState, type ComponentType, type RefObject } from "react";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { useMediaQuery, useReducedMotion } from "@/hooks";

/**
 * SkillsChapter — one chapter of the Skills page.
 *
 * Scroll effect (all screen sizes, both directions, every time): one
 * `useScroll` per chapter; the text column slides in from the left and each
 * technology drifts up and fades in on its own slice of the scroll span, then
 * everything fades out as the chapter leaves the top. Scrolling back up plays
 * it in reverse.
 *
 * Drag (tablet and up, md+): every technology can be dragged anywhere within
 * its own chapter's area; the area is the drag constraint, so it can never
 * leave for another chapter. Disabled on phones, where a draggable element
 * captures the touch and breaks scrolling.
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
  const canDrag = useMediaQuery("md");
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const animated = mounted && !prefersReduced;

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-56, 0, 0, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0, 0, -40]);
  const textStyle = animated ? { opacity: textOpacity, x: textX, y: textY } : undefined;

  return (
    <motion.section
      ref={ref}
      className="flex min-h-[92vh] flex-col justify-center border-t border-border-hairline py-12 first:border-t-0 first:pt-0 lg:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div style={textStyle} className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Icon className="size-5 text-accent-gold" aria-hidden="true" />
            <motion.h3 className="text-xs font-medium uppercase tracking-[0.22em] text-accent-gold">
              {overline}
            </motion.h3>
          </div>
          <motion.h4 className="max-w-2xl font-heading text-4xl leading-[0.96] md:text-5xl lg:text-6xl">
            {heading}
          </motion.h4>
          <motion.p className="max-w-xl text-base leading-8 text-text-primary/85 md:text-lg">
            {summary}
          </motion.p>
        </motion.div>

        <div ref={areaRef} className="relative min-h-[68vh] overflow-hidden lg:min-h-[72vh]">
          {chips.map((technology, index) => (
            <Chip
              key={technology}
              label={technology}
              index={index}
              total={chips.length}
              animated={animated}
              canDrag={canDrag}
              progress={scrollYProgress}
              areaRef={areaRef}
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
  animated,
  canDrag,
  progress,
  areaRef,
}: {
  label: string;
  index: number;
  total: number;
  animated: boolean;
  canDrag: boolean;
  progress: MotionValue<number>;
  areaRef: RefObject<HTMLDivElement | null>;
}) {
  // Each chip owns a slice of the arrival span (0.12–0.5), so they land in order.
  const start = 0.12 + (index / total) * 0.38;
  const stops = [0, start, start + 0.14, 0.86, 1];
  const opacity = useTransform(progress, stops, [0, 0, 1, 1, 0]);
  const y = useTransform(progress, stops, [48, 48, 0, 0, -32]);

  // Two layers: the outer one carries position and the scroll effect, the inner
  // one carries the drag offset. They need separate x/y motion values, so the
  // scroll animation and a drag never fight over the same transform.
  return (
    <motion.span
      style={{
        ...editorialPosition(index, total),
        ...(animated ? { opacity, y } : undefined),
      }}
      className="absolute"
    >
      <motion.span
        drag={canDrag}
        dragConstraints={areaRef}
        dragElastic={0}
        dragMomentum={false}
        whileHover={{
          color: "var(--accent-gold)",
          textShadow: "0 0 18px rgb(232 185 62 / 0.35)",
        }}
        whileDrag={{ scale: 1.06, zIndex: 10, cursor: "grabbing" }}
        style={{ fontSize: textSizes[index % textSizes.length] }}
        className="block select-none md:cursor-grab font-heading font-medium leading-none tracking-tight text-text-primary/50 transition-colors duration-300"
      >
        {label}
      </motion.span>
    </motion.span>
  );
}
