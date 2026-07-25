"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

import { primaryNavLinks, socialLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { fadeDown } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { SocialButton } from "../common/SocialButton";
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
 * All links come from config/navigation.ts — no hardcoded nav items.
 * Site name comes from siteConfig — no hardcoded personal data.
 *
 * Accessibility:
 *   - <nav> with aria-label="Main navigation"
 *   - Mobile menu button has aria-expanded and aria-controls
 *   - Mobile menu has role="dialog" and aria-label
 *   - ESC key closes the mobile menu
 *
 * Used by: app/layout.tsx
 */

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github />,
  Linkedin: <Linkedin />,
  Twitter: <Twitter />,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect scroll to apply blur/border
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
            className="font-heading font-semibold text-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label="Go to homepage"
          >
            {siteConfig.name || "Portfolio"}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg",
                  "text-muted-foreground transition-colors duration-150",
                  "hover:text-foreground hover:bg-muted",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-1">
            {socialLinks.map((link) => (
              <SocialButton
                key={link.label}
                label={link.label}
                href={link.href}
                icon={iconMap[link.icon] ?? null}
                variant="icon"
              />
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle size="sm" />
            <button
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
              "pt-16", // below the header
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
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg",
                    "text-foreground transition-colors",
                    "hover:bg-muted hover:text-brand",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social links in mobile menu */}
            <div className="mt-auto flex items-center justify-center gap-2 px-4 py-8 border-t border-border">
              {socialLinks.map((link) => (
                <SocialButton
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  icon={iconMap[link.icon] ?? null}
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
