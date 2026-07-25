"use client";

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { primaryNavLinks, socialLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { fadeDown } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { SocialButton } from "../common/SocialButton";
import { socialIconMap } from "../common/SocialIcons";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Navbar — sticky top navigation bar.
 *
 * Behavior:
 *   - Transparent + no border at top of page
 *   - backdrop-blur + border-b after 10px of scroll
 *   - Mobile: hamburger toggles a full-height slide-down menu
 *   - Desktop: inline nav links + social icons + theme toggle
 *
 * Active state logic:
 *   - Anchor links (href starting with "#" or "/#") are active when their
 *     target section is visible in the viewport, tracked by useActiveSection.
 *   - Route links (e.g. "/writing") are active when usePathname matches.
 *   - On non-home pages, anchor links are not active (they navigate back home).
 *
 * All links come from config/navigation.ts — no hardcoded nav items.
 * Site name comes from siteConfig — no hardcoded personal data.
 *
 * Accessibility:
 *   - <nav> with aria-label="Main navigation"
 *   - Active links have aria-current="page" (route) or aria-current="true" (section)
 *   - Mobile menu button has aria-expanded and aria-controls
 *   - Mobile menu has role="dialog" and aria-label
 *   - ESC key closes the mobile menu
 *   - Focus is returned to the hamburger button when the menu closes
 *
 * Used by: app/layout.tsx
 */

/** Extract the section id from an anchor href: "#about" or "/#about" → "about" */
function extractSectionId(href: string): string | null {
  if (href.startsWith("#")) return href.slice(1);
  if (href.startsWith("/#")) return href.slice(2);
  return null;
}

/** Derive all section ids from the nav config so useActiveSection stays in sync */
function getSectionIds(): string[] {
  return primaryNavLinks
    .map((l) => extractSectionId(l.href))
    .filter((id): id is string => id !== null);
}

const SECTION_IDS = getSectionIds();

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Only run scroll-based section tracking on the home page
  const activeSection = useActiveSection(isHomePage ? SECTION_IDS : []);

  // ── Scroll detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── ESC key closes mobile menu ────────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Active state helper ───────────────────────────────────────────────────
  function isActive(href: string): boolean {
    const sectionId = extractSectionId(href);
    if (sectionId) {
      // Anchor link — active when the section is the topmost visible section,
      // but only on the home page.
      return isHomePage && activeSection === sectionId;
    }
    // Route link — active when pathname matches exactly or starts with href
    return pathname === href || pathname.startsWith(href + "/");
  }

  const linkBaseClass = cn(
    "px-3 py-1.5 text-sm font-medium rounded-lg",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  );

  const linkActiveClass = "text-foreground bg-muted";
  const linkInactiveClass = "text-muted-foreground hover:text-foreground hover:bg-muted";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[200]",
          "transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-sm"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo / name */}
          <Link
            href="/"
            className={cn(
              "font-heading font-semibold text-foreground",
              "hover:text-brand transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
            )}
            aria-label="Go to homepage"
          >
            {siteConfig.name || "Portfolio"}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {primaryNavLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-current={active ? (extractSectionId(link.href) ? "true" : "page") : undefined}
                  className={cn(linkBaseClass, active ? linkActiveClass : linkInactiveClass)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-1">
            {socialLinks.map((link) => (
              <SocialButton
                key={link.label}
                label={link.label}
                href={link.href}
                icon={socialIconMap[link.icon] ?? null}
                variant="icon"
              />
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle size="sm" />
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-lg",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              {mobileOpen ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <Menu className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation menu"
            aria-modal="true"
            className={cn(
              "fixed inset-0 z-[199] flex flex-col",
              "bg-background/95 backdrop-blur-md",
              "pt-16",
            )}
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 px-4 pt-6"
            >
              {primaryNavLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? (extractSectionId(link.href) ? "true" : "page") : undefined}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-lg",
                      "transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "text-brand bg-brand/8"
                        : "text-foreground hover:bg-muted hover:text-brand",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Social links in mobile menu */}
            <div className="mt-auto flex items-center justify-center gap-2 px-4 py-8 border-t border-border">
              {socialLinks.map((link) => (
                <SocialButton
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  icon={socialIconMap[link.icon] ?? null}
                  variant="icon"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
