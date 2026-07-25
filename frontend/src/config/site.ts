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
  name: "",

  /** Professional title shown in the hero and <title> tags. */
  title: "",

  /** Short tagline used in meta description and hero subtitle. */
  tagline: "",

  /** One-paragraph bio for OpenGraph and schema.org Person. */
  description: "",

  /** Canonical URL of the deployed site (no trailing slash). */
  url: "",

  /** Profile photo URL (relative to /public or absolute CDN URL). */
  avatarUrl: "",

  /** Open Graph / Twitter Card cover image (1200×630). */
  ogImageUrl: "/og-image.png",

  /** Primary contact email. */
  email: "",

  /** Physical or general location shown in the footer/about section. */
  location: "",

  /** Social profile URLs. All fields are optional. */
  social: {
    github: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    devto: "",
    medium: "",
  },

  /** Site language for <html lang=""> and OpenGraph locale. */
  locale: "en_US",

  /** IANA timezone string for date formatting. */
  timezone: "UTC",
};

export type SiteConfig = typeof siteConfig;
