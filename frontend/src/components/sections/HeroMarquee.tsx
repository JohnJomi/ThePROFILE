"use client";

import { useRef } from "react";

import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { useReducedMotion } from "@/hooks";

/**
 * HeroMarquee — the hero's discipline marquee, with scroll-velocity response.
 *
 * Markup, classes and content are unchanged from the original inline version.
 * The only change is what drives the movement: the `.marquee-ltr` CSS keyframe
 * is replaced by a motion value so scroll velocity can modulate the speed.
 *
 * Calm at rest, faster during a hard scroll, easing back as scrolling settles —
 * and clamped so the text never becomes unreadable.
 *
 * The row is duplicated once and wrapped at 50%, exactly as the CSS loop did,
 * so the baseline speed and seamlessness are preserved. (`wrap` is not exported
 * by framer-motion 12.42.2, so the modulo is done inline.)
 *
 * Used by: src/components/sections/Hero.tsx
 */

const marqueeItems = [
  "ARTIFICIAL INTELLIGENCE",
  "FULL STACK DEVELOPMENT",
  "CLOUD ENGINEERING",
  "PRODUCTION SYSTEMS",
  "RESEARCH",
  "MODERN WEB APPLICATIONS",
] as const;

/** Percent of the duplicated row travelled per second at rest (matches the 28s CSS loop). */
const BASE_SPEED = 50 / 28;

/** Upper bound on the velocity multiplier — keeps fast scrolling legible. */
const MAX_BOOST = 3.2;

export function HeroMarquee() {
  const prefersReduced = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth the raw velocity so the speed-up eases in and out instead of jittering.
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // |velocity| → 1..MAX_BOOST, clamped. Magnitude only: direction stays constant
  // so the marquee never visibly stutters backwards mid-scroll.
  const boost = useTransform(smoothVelocity, (v) => {
    const magnitude = Math.min(Math.abs(v), 2500);
    return 1 + (magnitude / 2500) * (MAX_BOOST - 1);
  });

  const directionRef = useRef(1);

  useAnimationFrame((_time, delta) => {
    if (prefersReduced) return;

    // Nudge direction with the scroll sign for a subtle sense of momentum.
    const velocity = smoothVelocity.get();
    if (velocity > 40) directionRef.current = 1;
    else if (velocity < -40) directionRef.current = -1;

    const moveBy = directionRef.current * BASE_SPEED * boost.get() * (delta / 1000);

    // Wrap within a single copy's width (50% of the duplicated row) so the loop
    // is seamless in both directions.
    const next = baseX.get() + moveBy;
    baseX.set(((next % 50) + 50) % 50);
  });

  // 0..50 → -50%..0%, the same span the CSS keyframe used.
  const shifted = useTransform(baseX, (v) => v - 50);
  const x = useMotionTemplate`${shifted}%`;

  return (
    <div className="mt-12 overflow-hidden border-y border-[color:var(--border-hairline)] bg-bg-secondary py-4">
      <motion.div
        className="flex w-max items-center gap-5"
        style={prefersReduced ? undefined : { x, willChange: "transform" }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-5 text-xs font-medium uppercase tracking-[0.22em] text-text-primary/90 sm:text-sm"
          >
            <span>{item}</span>
            <span className="text-[color:var(--accent-gold)]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
