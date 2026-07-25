import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Inter — primary sans-serif typeface.
 *
 * Rationale:
 * - Variable font (single file, all weights) → zero extra network cost for weight variation.
 * - Designed for screen legibility at small sizes with excellent letter spacing.
 * - Industry standard for technical/developer-facing products.
 * - Subsets: "latin" covers all standard English content; add more if you use other scripts.
 *
 * CSS variable: --font-sans
 * Used by: body text, navigation, UI components, headings.
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
