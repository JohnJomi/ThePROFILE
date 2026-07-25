/**
 * navigation.ts — site navigation structure.
 *
 * Defines the primary nav links, mobile nav links, and social links
 * as typed data arrays. The Navbar and Footer components map over
 * these arrays — no navigation logic lives in JSX.
 *
 * Dependencies: used by
 *   - src/components/layout/Navbar.tsx
 *   - src/components/layout/Footer.tsx
 *   - src/components/layout/MobileMenu.tsx
 */

export interface NavLink {
  label: string;
  href: string;
  /** If true, opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

export interface SocialLink extends NavLink {
  /** Lucide icon name to render alongside the link. */
  icon: string;
}

/** Primary navigation links rendered in the desktop Navbar. */
export const primaryNavLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "#contact" },
];

/**
 * Social links rendered in the Navbar and Footer.
 * Populate `href` values from siteConfig.social.
 * Icon names map to Lucide React component names.
 */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "", icon: "Github", external: true },
  { label: "LinkedIn", href: "", icon: "Linkedin", external: true },
  { label: "Twitter / X", href: "", icon: "Twitter", external: true },
];
