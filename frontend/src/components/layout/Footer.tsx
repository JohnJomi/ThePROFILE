import Link from "next/link";

import { primaryNavLinks, socialLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { SocialButton } from "../common/SocialButton";
import { socialIconMap } from "../common/SocialIcons";


/**
 * Footer — site-wide footer with nav links and social buttons.
 *
 * Layout (responsive):
 *   Mobile:   stacked — brand, nav, socials, copyright
 *   Desktop:  3-column — brand | nav links | socials
 *
 * All content is derived from config — no hardcoded personal data.
 * The copyright year is derived from the current year at render time.
 *
 * Accessibility:
 *   - <footer> landmark with role="contentinfo"
 *   - Nav links are inside a <nav> with aria-label
 *   - Social buttons have individual aria-labels (handled by SocialButton)
 *
 * Used by: app/layout.tsx
 */

export function Footer() {
  const currentYear = new Date().getFullYear();
  const name = siteConfig.name || "Portfolio";

  return (
    <footer
      role="contentinfo"
      className="w-full border-t border-border bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="font-heading font-semibold text-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              aria-label="Go to homepage"
            >
              {name}
            </Link>
            {siteConfig.title && (
              <p className="text-sm text-muted-foreground">{siteConfig.title}</p>
            )}
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "text-sm text-muted-foreground transition-colors",
                  "hover:text-foreground",
                  "focus-visible:outline-none focus-visible:underline",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <SocialButton
                key={link.label}
                label={link.label}
                href={link.href}
                icon={socialIconMap[link.icon] ?? null}
                variant="icon"
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {name}. All rights reserved.
          </p>
          {siteConfig.location && (
            <p className="text-xs text-muted-foreground">{siteConfig.location}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
