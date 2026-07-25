/**
 * theme.ts — design system token definitions.
 *
 * This file expresses the design system's semantic layer: it names the
 * design decisions (what a "primary" color means, what constitutes an
 * "xl" spacing step) without duplicating the actual values (which live
 * in globals.css as CSS custom properties).
 *
 * Components import semantic names from here, never magic strings.
 * When the design changes (e.g., new brand color), this file + globals.css
 * change — not 50 component files.
 *
 * Dependencies: used by
 *   - src/app/globals.css (CSS variable names must match)
 *   - Components via Tailwind CSS variable references
 */

/**
 * Semantic color token names.
 * Each maps to a CSS variable defined in globals.css under :root and .dark.
 * These align with shadcn/ui's color system.
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
} as const;

/**
 * Spacing scale.
 * Defined in rem units, following a 4px base grid (0.25rem = 4px).
 * Tailwind's default scale is used for utility classes; this object
 * is for programmatic use (e.g., Framer Motion inline styles).
 */
export const spacing = {
  0: "0rem",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
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

/**
 * Typography scale.
 * Used for programmatic font-size references.
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
} as const;

/**
 * Border radius tokens.
 * These correspond to CSS variables set by shadcn/ui in globals.css.
 */
export const borderRadius = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  full: "9999px",
} as const;

/**
 * Z-index scale.
 * Explicit named layers prevent accidental stacking context bugs.
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

/**
 * Animation duration constants (ms).
 * Framer Motion variants use these for consistent timing.
 */
export const duration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

/**
 * Breakpoints matching Tailwind's default responsive breakpoints.
 * Used for programmatic responsive logic (e.g., useBreakpoint hook).
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type ColorToken = keyof typeof colorTokens;
export type SpacingStep = keyof typeof spacing;
export type FontSizeStep = keyof typeof fontSize;
export type BreakpointKey = keyof typeof breakpoints;
