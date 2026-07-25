/**
 * lib/motion.ts — Shared Framer Motion variants and transition presets.
 *
 * All animation variants used across the design system are defined here.
 * Components import from this file instead of defining inline variants.
 *
 * Benefits:
 *   - Single source of truth for animation timing and curves
 *   - Consistent motion language across the entire UI
 *   - Easy global tuning (reduce-motion, design refresh)
 *   - Composable via Framer Motion's variant propagation
 *
 * Usage:
 *   import { fadeUp, staggerContainer } from "@/lib/motion";
 *   <motion.div variants={fadeUp} initial="hidden" animate="visible" />
 *
 * Reduce motion:
 *   Wrap animated components in <MotionConfig reducedMotion="user" /> (done
 *   in Providers.tsx) so users who prefer reduced motion get instant transitions.
 */

import type { Variants } from "framer-motion";

import { duration, easing } from "@/config/theme";

// ─── Fade variants ────────────────────────────────────────────────────────────

/** Simple opacity fade. Use for subtle appearances. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

/** Fade combined with upward translate. Primary entry animation. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.easeOut },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

/** Fade in from below with larger travel distance. For hero elements. */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.easeOut },
  },
  exit: {
    opacity: 0,
    y: 24,
    transition: { duration: duration.normal, ease: easing.easeIn },
  },
};

/** Fade combined with downward translate. For dropdowns and tooltips. */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.easeOut },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

/** Fade from the left. For sidebar and drawer reveals. */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: easing.easeOut },
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

/** Fade from the right. For right-anchored panels. */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: easing.easeOut },
  },
  exit: {
    opacity: 0,
    x: 12,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

// ─── Scale variants ───────────────────────────────────────────────────────────

/** Scale from 95% with fade. Use for cards and modals entering. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.spring },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

/** Scale up with spring bounce. For interactive elements (buttons, badges). */
export const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.spring },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

// ─── Container / stagger variants ─────────────────────────────────────────────

/**
 * Stagger container — apply to the parent of a list of animated children.
 * Children must also have a `variants` prop to receive the stagger.
 *
 * @example
 * <motion.ul variants={staggerContainer} initial="hidden" animate="visible">
 *   {items.map(item => <motion.li variants={fadeUp} key={item.id} />)}
 * </motion.ul>
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Slower stagger for sections with fewer, larger items. */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ─── Scroll-reveal preset ─────────────────────────────────────────────────────

/**
 * Default viewport config for whileInView animations.
 * Triggers when 20% of the element is visible.
 * `once: true` prevents re-triggering on scroll back.
 */
export const defaultViewport = {
  once: true,
  margin: "-80px",
} as const;

// ─── Hover / tap interaction variants ────────────────────────────────────────

/** Subtle lift on hover for cards. */
export const hoverLift = {
  rest: { y: 0, boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
    transition: { duration: duration.normal, ease: easing.easeOut },
  },
};

/** Subtle scale on hover for interactive elements. */
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: duration.fast, ease: easing.spring },
  },
  tap: {
    scale: 0.97,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

/** Tap press down for buttons. */
export const tapPress = {
  rest: { scale: 1 },
  hover: { scale: 1.01 },
  tap: {
    scale: 0.97,
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

// ─── Utility helpers ──────────────────────────────────────────────────────────

/**
 * Creates a delayed variant of any base variant set.
 * Use when you want a specific element to enter after others.
 *
 * @example
 * const delayedFadeUp = withDelay(fadeUp, 0.2);
 */
export function withDelay(variants: Variants, delaySeconds: number): Variants {
  return {
    ...variants,
    visible: {
      ...(typeof variants.visible === "object" ? variants.visible : {}),
      transition: {
        ...(typeof variants.visible === "object" &&
        "transition" in variants.visible &&
        typeof variants.visible.transition === "object"
          ? variants.visible.transition
          : {}),
        delay: delaySeconds,
      },
    },
  };
}
