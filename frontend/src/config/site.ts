/**
 * site.ts — global site identity configuration.
 *
 * This is the single source of truth for all identity, SEO, and
 * contact information. No component should hardcode personal data —
 * every piece of identity information is derived from this object.
 *
 * Dependencies: used by
 *   - src/app/layout.tsx (metadata)
 *   - src/config/navigation.ts (social links)
 *   - src/components/layout/Footer.tsx
 *   - src/data/profile.ts
 *   - src/app/manifest.ts
 */

export const siteConfig = {
  /** Full display name of the portfolio owner. */
  name: "John Jomi",

  /** Professional title shown in the hero and <title> tags. */
  title: "AI Engineer & Full-Stack Developer",

  /** Short tagline used in meta description and hero subtitle. */
  tagline: "Building practical AI products, reliable web experiences, and cloud-native systems.",

  /** One-paragraph bio for OpenGraph and schema.org Person. */
  description:
    "John Jomi is an AI engineer and full-stack developer focused on applied machine learning, product engineering, and cloud delivery.",

  /** Canonical URL of the deployed site (no trailing slash). */
  url: "https://github.com/JohnJomi/ThePROFILE",

  /** Primary site author. */
  author: "John Jomi",

  /** Primary SEO keywords for the portfolio. */
  keywords: [
    "John Jomi",
    "AI Engineer",
    "Full-Stack Developer",
    "Machine Learning",
    "Next.js",
    "TypeScript",
    "AWS",
    "Portfolio",
  ],

  /** Profile photo URL (relative to /public or absolute CDN URL). */
  avatarUrl: "/avatar-placeholder.png",

  /** Open Graph / Twitter Card cover image (1200×630). */
  ogImageUrl: "/og-image.png",

  /** Primary contact email. */
  email: "johnjomi1234@gmail.com",

  /** Physical or general location shown in the footer/about section. */
  location: "Remote",

  /** Social profile URLs. All fields are optional. */
  social: {
    github: "https://github.com/JohnJomi",
    linkedin: "",
    twitter: "",
    youtube: "",
    devto: "",
    medium: "",
  },

  /** Default Open Graph metadata for the portfolio. */
  openGraph: {
    title: "John Jomi — AI Engineer & Full-Stack Developer",
    description:
      "AI engineer and full-stack developer focused on applied machine learning, product engineering, and cloud delivery.",
    type: "website",
    locale: "en_US",
    image: "/og-image.png",
  },

  /** Site language for <html lang=""> and OpenGraph locale. */
  locale: "en_US",

  /** IANA timezone string for date formatting. */
  timezone: "UTC",
};

export type SiteConfig = typeof siteConfig;
