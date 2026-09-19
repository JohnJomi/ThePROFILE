"use client";

import { type RefObject } from "react";

import { useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

import { useMediaQuery } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

/**
 * useHeroScroll — one scroll-scrubbed timeline for the whole hero composition.
 *
 * A single `useScroll` on the hero element produces one master progress value
 * (0 → 1 as the hero travels out of view). Every element derives from that one
 * value via `useTransform`, so there are no per-element scroll listeners, no
 * scroll-jacking, and scrolling up reverses everything for free.
 *
 * Motion values write straight to the compositor and never trigger a React
 * re-render, so nothing here costs a render per frame. The only React state is
 * the two media-query booleans, which change on breakpoint/preference flips.
 *
 * Phases (matching the design brief):
 *   0.00–0.20  intro      — hero mostly stable, subtle lift
 *   0.20–0.45  compression — name compresses, buttons gone, chips disperse
 *   0.45–0.60  portrait    — portrait is the last thing standing, still scaling
 *   0.60–0.78  exit        — portrait fades out last
 *
 * Desktop and mobile use separate tuning tables rather than a scaled-down copy
 * of one another. Reduced motion flattens every translate/scale to identity.
 *
 * Used by: src/components/sections/Hero.tsx
 */

/** Per-breakpoint tuning. Keyframe arrays pair with STOPS below. */
interface HeroTuning {
  nameY: readonly number[];
  nameScale: readonly number[];
  bioY: readonly number[];
  bioOpacity: readonly number[];
  buttonsY: readonly number[];
  buttonsOpacity: readonly number[];
  portraitY: readonly number[];
  portraitScale: readonly number[];
  portraitOpacity: readonly number[];
  eyebrowOpacity: readonly number[];
  /** Multiplier applied to each chip's dispersal vector. */
  chipSpread: number;
  /** Progress at which a chip has fully dispersed and faded. */
  chipEnd: number;
}

/** Progress stops shared by the phase keyframe arrays. */
const STOPS = [0, 0.2, 0.45, 0.6, 0.78] as const;

const DESKTOP: HeroTuning = {
  nameY: [0, -30, -90, -140, -200],
  nameScale: [1, 0.95, 0.88, 0.82, 0.8],
  bioY: [0, -50, -120, -170, -220],
  bioOpacity: [1, 1, 0.45, 0, 0],
  buttonsY: [0, -40, -80, -80, -80],
  buttonsOpacity: [1, 0.3, 0, 0, 0],
  portraitY: [0, -14, -40, -58, -80],
  portraitScale: [1, 1.05, 1.1, 1.12, 1.14],
  portraitOpacity: [1, 1, 1, 0.92, 0],
  eyebrowOpacity: [1, 0.6, 0, 0, 0],
  chipSpread: 1,
  chipEnd: 0.62,
};

/**
 * Mobile is deliberately calmer, not a shrunken desktop: shorter travel, a much
 * higher scale floor, later fades so content stays readable under the thumb, and
 * a reduced chip spread so nothing approaches the viewport edge.
 */
const MOBILE: HeroTuning = {
  nameY: [0, -10, -28, -44, -64],
  nameScale: [1, 0.985, 0.96, 0.945, 0.94],
  bioY: [0, -16, -40, -60, -84],
  bioOpacity: [1, 1, 0.75, 0.3, 0],
  buttonsY: [0, -14, -28, -28, -28],
  buttonsOpacity: [1, 0.8, 0.25, 0, 0],
  portraitY: [0, -6, -16, -24, -34],
  portraitScale: [1, 1.015, 1.035, 1.04, 1.045],
  portraitOpacity: [1, 1, 1, 0.96, 0.2],
  eyebrowOpacity: [1, 0.8, 0.25, 0, 0],
  chipSpread: 0.4,
  chipEnd: 0.7,
};

/** Reduced motion: no travel, no scaling. Only a gentle late fade survives. */
const REDUCED: HeroTuning = {
  nameY: [0, 0, 0, 0, 0],
  nameScale: [1, 1, 1, 1, 1],
  bioY: [0, 0, 0, 0, 0],
  bioOpacity: [1, 1, 1, 1, 1],
  buttonsY: [0, 0, 0, 0, 0],
  buttonsOpacity: [1, 1, 1, 1, 1],
  portraitY: [0, 0, 0, 0, 0],
  portraitScale: [1, 1, 1, 1, 1],
  portraitOpacity: [1, 1, 1, 1, 1],
  eyebrowOpacity: [1, 1, 1, 1, 1],
  chipSpread: 0,
  chipEnd: 1,
};

/** Dispersal direction per chip, in px at full spread. Deterministic, never random. */
export const CHIP_VECTORS: readonly (readonly [number, number])[] = [
  [-70, -90], // AI       → upper-left
  [0, -110], // React    → up
  [70, -90], // Next.js  → upper-right
  [-110, 0], // AWS      → left
  [110, 0], // Azure    → right
  [-80, 70], // Node.js  → lower-left
  [0, 110], // Python   → down
];

export interface HeroScrollMotion {
  progress: MotionValue<number>;
  nameY: MotionValue<number>;
  nameScale: MotionValue<number>;
  bioY: MotionValue<number>;
  bioOpacity: MotionValue<number>;
  buttonsY: MotionValue<number>;
  buttonsOpacity: MotionValue<number>;
  portraitY: MotionValue<number>;
  portraitScale: MotionValue<number>;
  portraitOpacity: MotionValue<number>;
  eyebrowOpacity: MotionValue<number>;
  /** Multiplier for each chip's dispersal vector — consumed by HeroChip. */
  chipSpread: number;
  /** Progress at which chips have fully dispersed — consumed by HeroChip. */
  chipEnd: number;
  /** Exposed so callers can skip decorative motion entirely. */
  prefersReduced: boolean;
}

export function useHeroScroll(target: RefObject<HTMLElement | null>): HeroScrollMotion {
  const isDesktop = useMediaQuery("lg");
  const prefersReduced = useReducedMotion();

  const tuning = prefersReduced ? REDUCED : isDesktop ? DESKTOP : MOBILE;

  // One listener for the entire composition. Progress runs 0 → 1 while the hero
  // scrolls from filling the viewport to having left it.
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });

  // Smoothing keeps fast flicks fluid instead of snapping frame to frame.
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.35,
  });

  const stops = STOPS as unknown as number[];

  const nameY = useTransform(progress, stops, tuning.nameY as number[]);
  const nameScale = useTransform(progress, stops, tuning.nameScale as number[]);
  const bioY = useTransform(progress, stops, tuning.bioY as number[]);
  const bioOpacity = useTransform(progress, stops, tuning.bioOpacity as number[]);
  const buttonsY = useTransform(progress, stops, tuning.buttonsY as number[]);
  const buttonsOpacity = useTransform(progress, stops, tuning.buttonsOpacity as number[]);
  const portraitY = useTransform(progress, stops, tuning.portraitY as number[]);
  const portraitScale = useTransform(progress, stops, tuning.portraitScale as number[]);
  const portraitOpacity = useTransform(progress, stops, tuning.portraitOpacity as number[]);
  const eyebrowOpacity = useTransform(progress, stops, tuning.eyebrowOpacity as number[]);

  return {
    progress,
    nameY,
    nameScale,
    bioY,
    bioOpacity,
    buttonsY,
    buttonsOpacity,
    portraitY,
    portraitScale,
    portraitOpacity,
    eyebrowOpacity,
    chipSpread: tuning.chipSpread,
    chipEnd: tuning.chipEnd,
    prefersReduced,
  };
}

/**
 * Chip dispersal window. Each chip starts leaving slightly after the previous
 * one so the group fans out as a constellation instead of sliding as a block.
 */
export function chipWindow(index: number, chipEnd: number) {
  const start = 0.18 + index * 0.02;
  return { start, end: Math.max(chipEnd, start + 0.1) };
}
