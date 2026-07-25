/**
 * types/social.ts — Social link domain interfaces.
 *
 * Used by: src/data/socials.ts, Navbar, Footer, Contact section.
 */

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "youtube"
  | "devto"
  | "medium"
  | "hashnode"
  | "bluesky"
  | "mastodon"
  | "email"
  | "website"
  | "other";

export interface Social {
  platform: SocialPlatform;
  /** Display label, e.g. "@username" or "GitHub". */
  label: string;
  href: string;
  /** Lucide icon name for rendering the icon. */
  icon: string;
  /** If true, shown prominently in nav/hero. Otherwise footer-only. */
  featured: boolean;
}
