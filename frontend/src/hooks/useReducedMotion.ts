"use client";

import { useEffect, useState } from "react";

/**
 * useReducedMotion — returns true when the user has requested reduced motion.
 *
 * Reads the `prefers-reduced-motion` media query and keeps the value reactive.
 * Use this hook to programmatically disable or simplify animations in components
 * that don't go through Framer Motion's MotionConfig.
 *
 * Framer Motion's `<MotionConfig reducedMotion="user" />` (added in Providers.tsx)
 * handles all motion.ts variants automatically. This hook is for:
 *   - CSS animations (className toggling)
 *   - Third-party libraries that don't integrate with MotionConfig
 *   - Conditional rendering of decorative elements (e.g., AnimatedBackground)
 *   - Unit tests or Storybook where you want to assert reduced-motion behaviour
 *
 * Server-side: returns `false` (safe default — no motion runs on the server).
 *
 * @returns {boolean} `true` if the user prefers reduced motion.
 *
 * @example
 * function HeroSection() {
 *   const reducedMotion = useReducedMotion();
 *   return (
 *     <div>
 *       {!reducedMotion && <AnimatedBackground variant="gradient" />}
 *     </div>
 *   );
 * }
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Sync initial value and subscribe to changes.
    // The handler is called immediately with a synthetic event to avoid
    // a separate setState call in the effect body.
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setPrefersReduced(e.matches);

    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () =>
      mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  return prefersReduced;
}
