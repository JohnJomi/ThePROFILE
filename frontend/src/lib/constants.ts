/**
 * Site-wide configuration and constants.
 * Update this file with your personal information before launch.
 */

export const SITE_CONFIG = {
  name: "Your Name",
  title: "AI Engineer",
  description:
    "AI Engineer portfolio — showcasing machine learning projects, AWS infrastructure, and technical writing.",
  url: "https://yourportfolio.com",
  email: "you@example.com",
  social: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    twitter: "https://twitter.com/your-username",
  },
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "#contact" },
] as const;
