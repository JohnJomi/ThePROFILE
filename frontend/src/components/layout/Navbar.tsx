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
    "rounded-2xl border px-3 py-1.5 text-sm font-medium",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );

  const linkActiveClass =
    "border-white/25 bg-white/80 text-foreground shadow-[0_8px_20px_rgb(15_23_42/0.08),inset_0_1px_0_rgb(255_255_255/0.45)] dark:border-white/10 dark:bg-white/10 dark:shadow-[0_10px_24px_rgb(0_0_0/0.28),inset_0_1px_0_rgb(255_255_255/0.08)]";
  const linkInactiveClass =
    "border-transparent text-muted-foreground hover:border-white/20 hover:bg-white/70 hover:text-foreground dark:hover:border-white/15 dark:hover:bg-white/10";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[200]",
          "border-b border-white/15 backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "bg-white/80 shadow-[0_10px_30px_rgb(15_23_42/0.08)] dark:bg-background/75 dark:shadow-[0_12px_40px_rgb(0_0_0/0.35)]"
            : "bg-white/65 shadow-[0_6px_20px_rgb(15_23_42/0.05)] dark:bg-background/55 dark:shadow-[0_8px_28px_rgb(0_0_0/0.22)]",
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
                "inline-flex size-9 items-center justify-center rounded-2xl border border-transparent",
                "bg-white/70 text-muted-foreground backdrop-blur-xl shadow-[0_8px_20px_rgb(15_23_42/0.05),inset_0_1px_0_rgb(255_255_255/0.45)]",
                "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/85 hover:text-foreground hover:shadow-[0_14px_28px_rgb(15_23_42/0.1),0_4px_14px_rgb(15_23_42/0.06)]",
                "dark:bg-white/10 dark:text-muted-foreground dark:shadow-[0_10px_26px_rgb(0_0_0/0.28),inset_0_1px_0_rgb(255_255_255/0.08)]",
                "dark:hover:bg-white/15 dark:hover:text-foreground dark:hover:shadow-[0_16px_36px_rgb(0_0_0/0.36),0_6px_16px_rgb(0_0_0/0.16)]",
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
              "bg-white/70 backdrop-blur-2xl dark:bg-background/60",
              "pt-16",
            )}
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-4 mt-6 flex flex-col gap-1 rounded-2xl border border-white/15 bg-white/75 p-2 shadow-[0_18px_50px_rgb(15_23_42/0.1)] dark:border-white/10 dark:bg-white/10 dark:shadow-[0_22px_60px_rgb(0_0_0/0.34)]"
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
                      "rounded-2xl border px-4 py-3 text-base font-medium",
                      "transition-all duration-300 ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "border-white/25 bg-white/80 text-foreground shadow-[0_8px_20px_rgb(15_23_42/0.08)] dark:border-white/10 dark:bg-white/10 dark:text-foreground"
                        : "border-transparent text-foreground/80 hover:border-white/20 hover:bg-white/70 hover:text-foreground dark:hover:border-white/15 dark:hover:bg-white/10",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Social links in mobile menu */}
            <div className="mx-4 mt-auto flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/75 px-4 py-8 shadow-[0_18px_50px_rgb(15_23_42/0.1)] dark:border-white/10 dark:bg-white/10 dark:shadow-[0_22px_60px_rgb(0_0_0/0.34)]">
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
