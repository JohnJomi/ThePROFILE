"use client";

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { primaryNavLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { fadeDown } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
    "relative text-[0.72rem] font-medium uppercase tracking-[0.2em]",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );

  const linkActiveClass = "text-foreground after:absolute after:left-0 after:-bottom-2 after:h-px after:w-full after:bg-accent-gold";
  const linkInactiveClass = "text-muted-foreground hover:text-foreground";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[200] border-b border-border-hairline transition-colors duration-300",
          scrolled ? "bg-background/92" : "bg-background/80",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo / name */}
          <Link
            href="/"
            className={cn(
              "font-heading text-lg font-semibold text-foreground",
              "hover:text-accent-rust transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
            )}
            aria-label="Go to homepage"
          >
            {siteConfig.name || "Portfolio"}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {primaryNavLinks.map((link) => {
              const active = isActive(link.href);
                const sectionId = extractSectionId(link.href);
                let ariaCurrent: "page" | "true" | undefined;
                if (active) {
                  ariaCurrent = sectionId ? "true" : "page";
                }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                    aria-current={ariaCurrent}
                  className={cn(linkBaseClass, active ? linkActiveClass : linkInactiveClass)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-2">
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
                "inline-flex size-9 items-center justify-center rounded-md border border-border-hairline",
                "bg-background text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-foreground/5 hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
              "bg-background/95 backdrop-blur-sm",
              "pt-16",
            )}
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-4 mt-6 flex flex-col gap-1 border-t border-border-hairline pt-4"
            >
              {primaryNavLinks.map((link) => {
                const active = isActive(link.href);
                const sectionId = extractSectionId(link.href);
                    let ariaCurrent: "page" | "true" | undefined;
                    if (active) {
                      ariaCurrent = sectionId ? "true" : "page";
                    }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileOpen(false)}
                    aria-current={ariaCurrent}
                    className={cn(
                      "border-b border-border-hairline px-2 py-4 text-lg font-medium uppercase tracking-[0.18em]",
                      "transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
