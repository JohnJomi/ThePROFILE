import { Manrope, JetBrains_Mono } from "next/font/google";

/**
 * Manrope — primary sans-serif typeface.
 *
 * Rationale:
 * - Variable font (single file, all weights) → zero extra network cost for weight variation.
 * - Geometric but restrained, which reads more editorial than a default UI font.
 * - Keeps the portfolio professional without looking overly “template-like”.
 * - Subsets: "latin" covers all standard English content; add more if you use other scripts.
 *
 * CSS variable: --font-sans
 * Used by: body text, navigation, UI components, headings.
 */
export const fontSans = Manrope({
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
