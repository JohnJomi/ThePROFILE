"use client";

import { useRef } from "react";

import { useInView, type UseInViewOptions } from "framer-motion";

/**
 * useScrollReveal — returns a ref and a boolean indicating when the element
 * is visible in the viewport.
 *
 * Thin wrapper around Framer Motion's `useInView` that applies the same
 * defaults used across the design system (once: true, margin: "-80px").
 *
 * Use this hook when you need imperative scroll-reveal logic that can't be
 * expressed with the `whileInView` prop — for example:
 *   - Triggering a counter animation when a stat comes into view
 *   - Lazily loading heavy content on reveal
 *   - Changing className rather than animating with Framer Motion
 *
 * For standard component animations, prefer `whileInView` + `defaultViewport`
 * from motion.ts directly — no hook needed.
 *
 * @param options - Framer Motion UseInViewOptions overrides.
 * @returns [ref, isInView] tuple. Attach `ref` to the target element.
 *
 * @example
 * function StatCounter({ value }: { value: number }) {
 *   const [ref, isInView] = useScrollReveal();
 *   return (
 *     <span ref={ref}>
 *       {isInView ? <AnimatedNumber value={value} /> : 0}
 *     </span>
 *   );
 * }
 *
 * @example
 * // With custom options
 * const [ref, isInView] = useScrollReveal({ margin: "-120px", once: false });
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: UseInViewOptions,
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null!);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
    ...options,
  });

  return [ref, isInView];
}
