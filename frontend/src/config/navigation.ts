/**
 * navigation.ts — site navigation structure.
 *
 * Defines the primary nav links and social links as typed data arrays.
 * The Navbar and Footer components map over these arrays — no navigation
 * logic lives in JSX.
 *
 * Route link convention:
 *   Use top-level routes so each section has its own page.
 *
 * Dependencies: used by
 *   - src/components/layout/Navbar.tsx
 *   - src/components/layout/Footer.tsx
 */

export interface NavLink {
  label: string;
  href: string;
  /** If true, opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

export interface SocialLink extends NavLink {
  /** Key into socialIconMap in SocialIcons.tsx */
  icon: string;
}

/**
 * Primary navigation links.
 *
 * Route links use the page paths directly.
 */
export const primaryNavLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

/**
 * Social links rendered in the Navbar and Footer.
 *
 * `href` values are intentionally empty strings — populate from siteConfig
 * before deployment. SocialButton returns null when href is empty, so no
 * broken links appear during development.
 */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "", icon: "Github", external: true },
  { label: "LinkedIn", href: "", icon: "Linkedin", external: true },
  { label: "Twitter / X", href: "", icon: "Twitter", external: true },
];
