/**
 * theme.ts — design system token definitions.
 *
 * This file is the TypeScript layer of the design system. It names
 * every design decision so components reference semantic tokens, never
 * magic strings or hard-coded values.
 *
 * The actual CSS values live in globals.css as CSS custom properties.
 * This file maps those names so TypeScript consumers get autocomplete
 * and type safety, and so a single edit here propagates everywhere.
 *
 * Used by:
 *   - src/lib/motion.ts (easing, duration)
 *   - All components via Tailwind utility classes
 *   - src/app/globals.css (CSS variable names must match)
 */

// ─── Colors ───────────────────────────────────────────────────────────────────

/**
 * Semantic color token names.
 * Each key maps to a CSS variable in globals.css :root / .dark.
 * Aligns with shadcn/ui's color system plus portfolio-specific brand tokens.
 */
export const colorTokens = {
  background: "var(--background)",
  foreground: "var(--foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",
  destructive: "var(--destructive)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",
  brand: "var(--brand)",
  brandForeground: "var(--brand-foreground)",
  brandMuted: "var(--brand-muted)",
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

/**
 * Spacing scale (rem, 4px base grid).
 * Used for programmatic style values — Framer Motion inline styles,
 * dynamic padding, etc. For static styles use Tailwind utility classes.
 */
export const spacing = {
  0: "0rem",
  1: "0.25rem", //  4px
  2: "0.5rem", //  8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

/**
 * Font size scale (rem).
 * Mirrors Tailwind's default scale for programmatic use.
 */
export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
} as const;

/**
 * Font weight scale.
 */
export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

/**
 * Line height scale.
 */
export const lineHeight = {
  none: "1",
  tight: "1.2",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

// ─── Border radius ────────────────────────────────────────────────────────────

/**
 * Border radius tokens mapped to CSS variables set by shadcn/ui.
 */
export const borderRadius = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  "3xl": "var(--radius-3xl)",
  full: "9999px",
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────

/**
 * Box shadow scale.
 * Defined as CSS values for use in inline styles and Framer Motion.
 * For static styles prefer Tailwind's shadow-* utilities.
 *
 * The shadow system uses two layers: a soft ambient layer (large, low opacity)
 * and a crisp direct layer (small, higher opacity). This creates depth without
 * appearing heavy in dark mode.
 */
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.15)",
  /** Brand-tinted shadow — used on focused/active brand elements. */
  brand: "0 0 0 3px var(--brand-muted), 0 4px 12px -2px var(--brand-muted)",
  /** Inner shadow for inset/sunken elements. */
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  /** Glass morphism shadow. */
  glass:
    "0 8px 32px 0 rgb(0 0 0 / 0.08), 0 2px 8px 0 rgb(0 0 0 / 0.04), inset 0 1px 0 0 rgb(255 255 255 / 0.1)",
} as const;

// ─── Z-index ──────────────────────────────────────────────────────────────────

/**
 * Z-index scale with named layers.
 * Named layers make stacking context bugs obvious.
 */
export const zIndex = {
  base: 0,
  above: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  tooltip: 600,
} as const;

// ─── Animation ────────────────────────────────────────────────────────────────

/**
 * Animation duration values in seconds.
 * Used by Framer Motion transition objects and CSS animation-duration.
 * Keep durations purposeful — faster is usually better for interactions.
 */
export const duration = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  crawl: 1.0,
} as const;

/**
 * Cubic-bezier easing curves.
 * Each serves a distinct motion purpose — use the right curve for the
 * right motion to create a natural, intentional feel.
 *
 * Naming convention follows CSS transition easing vocabulary.
 */
export const easing = {
  /** Standard ease-in-out. Use for most transitions. */
  default: [0.4, 0, 0.2, 1] as const,
  /** Elements entering the screen. Starts fast, decelerates to rest. */
  easeOut: [0, 0, 0.2, 1] as const,
  /** Elements leaving the screen. Starts slow, accelerates away. */
  easeIn: [0.4, 0, 1, 1] as const,
  /** Elastic spring-like overshoot for delightful UI moments. */
  spring: [0.34, 1.56, 0.64, 1] as const,
  /** Linear — for color/opacity transitions where easing looks wrong. */
  linear: [0, 0, 1, 1] as const,
  /** Anticipation — slight backward pull before forward motion. */
  anticipate: [0.36, 0, 0.66, -0.56] as const,
} as const;

/**
 * Named Framer Motion transition presets.
 * Import `transitions` from theme and spread into `transition={}` prop.
 *
 * @example
 * <motion.div transition={transitions.fadeIn} />
 */
export const transitions = {
  fadeIn: {
    duration: duration.normal,
    ease: easing.easeOut,
  },
  slideUp: {
    duration: duration.normal,
    ease: easing.easeOut,
  },
  slideDown: {
    duration: duration.normal,
    ease: easing.easeOut,
  },
  scale: {
    duration: duration.fast,
    ease: easing.spring,
  },
  spring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  },
  springGentle: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
  },
  staggerChildren: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  },
} as const;

// ─── Breakpoints ──────────────────────────────────────────────────────────────

/**
 * Breakpoints matching Tailwind's default responsive scale (px).
 * Used for programmatic responsive logic (e.g., useMediaQuery hook).
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ─── Exported types ───────────────────────────────────────────────────────────

export type ColorToken = keyof typeof colorTokens;
export type SpacingStep = keyof typeof spacing;
export type FontSizeStep = keyof typeof fontSize;
export type ShadowKey = keyof typeof shadows;
export type EasingKey = keyof typeof easing;
export type DurationKey = keyof typeof duration;
export type BreakpointKey = keyof typeof breakpoints;
