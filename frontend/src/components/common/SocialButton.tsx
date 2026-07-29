"use client";

import { motion } from "framer-motion";

import { hoverScale } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * SocialButton — icon or icon+label link for external social profiles.
 *
 * Always renders as <a> with target="_blank" rel="noopener noreferrer".
 * Returns null if `href` is empty — prevents broken links during development
 * before the siteConfig is populated.
 *
 * Variants:
 *   - "icon"  Square button, icon only. Used in Navbar.
 *   - "pill"  Rounded pill with icon + visible label. Used in Footer.
 *
 * Accessibility:
 *   - aria-label is always set for screen readers
 *   - Icon is aria-hidden (decorative)
 *   - Focus ring is visible on both light and dark backgrounds
 *
 * Used by: Navbar, Footer, Contact section.
 */

export interface SocialButtonProps {
  /** Profile name used as aria-label and visible text in pill variant. */
  label: string;
  /** External profile URL. Returns null if empty. */
  href: string;
  /** Lucide React icon element. */
  icon: React.ReactNode;
  variant?: "icon" | "pill";
  size?: "sm" | "default";
  className?: string;
}

/**
 * @example
 * // Navbar — icon only
 * <SocialButton label="GitHub" href="https://github.com/..." icon={<Github />} />
 *
 * // Footer — pill with label
 * <SocialButton label="LinkedIn" href="..." icon={<Linkedin />} variant="pill" />
 */
export function SocialButton({
  label,
  href,
  icon,
  variant = "icon",
  size = "default",
  className,
}: Readonly<SocialButtonProps>) {
  if (!href) return null;

  const isIcon = variant === "icon";

  const cls = cn(
    "inline-flex items-center justify-center rounded-2xl border",
    "text-muted-foreground backdrop-blur-xl transition-all duration-300 ease-out",
    "border-transparent bg-white/70 shadow-[0_8px_20px_rgb(15_23_42/0.05),inset_0_1px_0_rgb(255_255_255/0.45)]",
    "hover:-translate-y-0.5 hover:text-foreground hover:bg-white/85 hover:border-white/30 hover:shadow-[0_14px_28px_rgb(15_23_42/0.1),0_4px_14px_rgb(15_23_42/0.06)]",
    "dark:bg-white/10 dark:text-muted-foreground dark:shadow-[0_10px_26px_rgb(0_0_0/0.28),inset_0_1px_0_rgb(255_255_255/0.08)]",
    "dark:hover:text-foreground dark:hover:bg-white/15 dark:hover:border-white/15 dark:hover:shadow-[0_16px_36px_rgb(0_0_0/0.36),0_6px_16px_rgb(0_0_0/0.16)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    isIcon
      ? [size === "sm" ? "size-8" : "size-9", "[&_svg]:size-4"]
      : "gap-2 px-3 py-1.5 text-sm [&_svg]:size-4",
    className,
  );

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cls}
      variants={hoverScale}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <span aria-hidden="true">{icon}</span>
      {!isIcon && <span>{label}</span>}
    </motion.a>
  );
}
