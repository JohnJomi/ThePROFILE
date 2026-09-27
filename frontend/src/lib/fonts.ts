import localFont from "next/font/local";

// Fonts are self-hosted (latin variable woff2 from Fontsource) so builds
// never depend on fetching from Google Fonts.

/**
 * Fraunces — display serif for headings and hero typography.
 *
 * Rationale:
 * - Strong editorial presence without becoming overly ornamental.
 * - Gives the site a magazine-like identity similar to the reference.
 *
 * CSS variable: --font-heading
 * Used by: headings, display labels, and hero typography.
 */
export const fontHeading = localFont({
  src: "../fonts/fraunces-latin-wght-normal.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "100 900",
});

/**
 * Inter — primary sans-serif typeface.
 *
 * Rationale:
 * - Clean, highly legible body font.
 * - Keeps the UI professional and restrained.
 *
 * CSS variable: --font-sans
 * Used by: body text, nav, labels, and supporting copy.
 */
export const fontSans = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

/**
 * JetBrains Mono — monospace typeface for code.
 *
 * Rationale:
 * - Purpose-built for code with strong character disambiguation (0/O, 1/l/I).
 * - Supports programming ligatures (→, >=, !=) for cleaner code displays.
 * - Signals engineering credibility — an AI engineer portfolio will render code snippets.
 * - Subsets: "latin" is sufficient for code samples.
 *
 * CSS variable: --font-mono
 * Used by: code blocks, inline code, terminal snippets, skill tags.
 */
export const fontMono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 800",
});
