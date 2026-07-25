/**
 * navigation.ts — site navigation structure.
 *
 * Defines the primary nav links and social links as typed data arrays.
 * The Navbar and Footer components map over these arrays — no navigation
 * logic lives in JSX.
 *
 * Anchor link convention:
 *   Use "/#section-id" so links navigate to the home page anchor from any
 *   route (e.g. /writing → /#about). On the home page itself, Next.js Link
 *   will smooth-scroll to the anchor without a full page reload.
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
 * Anchor links use "/#id" format so they work correctly from any page.
 * The Navbar's isActive() helper handles both "#id" and "/#id" formats.
 */
export const primaryNavLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/#contact" },
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
