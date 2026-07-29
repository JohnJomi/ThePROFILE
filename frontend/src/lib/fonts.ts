import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

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
export const fontHeading = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: "variable",
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
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: "variable",
});
