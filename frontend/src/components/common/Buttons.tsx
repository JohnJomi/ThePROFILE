"use client";

import { motion } from "framer-motion";

import { tapPress } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Buttons.tsx — PrimaryButton and SecondaryButton.
 *
 * Both components are polymorphic: they render as <button> by default, or
 * as <a> when an `href` prop is supplied. External hrefs (http/https)
 * automatically get target="_blank" rel="noopener noreferrer".
 *
 * Framer Motion `tapPress` gives a subtle scale-down on click, reinforcing
 * that the element is interactive without distracting from content.
 *
 * Accessibility:
 *   - Focus ring uses ring-offset-background for visibility on any surface
 *   - aria-disabled + tabIndex=-1 when disabled (link elements cannot use
 *     the disabled attribute natively)
 *   - Icons are wrapped in aria-hidden spans
 */

const sizeClasses = {
  sm: "h-8 px-3.5 text-sm gap-1.5 [&_svg]:size-3.5",
  default: "h-10 px-5 text-sm gap-2 [&_svg]:size-4",
  lg: "h-12 px-6 text-base gap-2.5 [&_svg]:size-5",
} as const;

type ButtonBase = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "default" | "lg";
};

type AsButton = ButtonBase &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBase | "onDrag" | "onDragEnd" | "onDragEnter" | "onDragExit" | "onDragLeave" | "onDragOver" | "onDragStart"> & {
    href?: undefined;
  };

type AsAnchor = ButtonBase &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBase | "onDrag" | "onDragEnd" | "onDragEnter" | "onDragExit" | "onDragLeave" | "onDragOver" | "onDragStart"> & {
    href: string;
  };

export type PrimaryButtonProps = AsButton | AsAnchor;
export type SecondaryButtonProps = AsButton | AsAnchor;

type ButtonContentProps = Readonly<{
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}>;

function ButtonContent({
  children,
  icon,
  iconPosition = "right",
}: ButtonContentProps) {
  return (
    <>
      {icon && iconPosition === "left" && <span aria-hidden="true">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span aria-hidden="true">{icon}</span>}
    </>
  );
}

// ─── PrimaryButton ────────────────────────────────────────────────────────────

/**
 * High-emphasis CTA button. Uses brand color as background.
 *
 * @example
 * <PrimaryButton>View Projects</PrimaryButton>
 * <PrimaryButton href="https://github.com" icon={<Github />}>Source</PrimaryButton>
 */
export function PrimaryButton({
  children,
  className,
  disabled,
  icon,
  iconPosition = "right",
  size = "default",
  href,
  ...rest
}: PrimaryButtonProps) {
  const isExternal = href?.startsWith("http");

  const cls = cn(
    "inline-flex items-center justify-center rounded-md border font-medium tracking-tight",
    "bg-accent-rust text-white border-accent-rust",
    "hover:-translate-y-0.5 hover:bg-accent-rust/90 hover:border-accent-rust/90 active:translate-y-0",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-rust focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    sizeClasses[size],
    className,
  );

  const content = <ButtonContent icon={icon} iconPosition={iconPosition}>{children}</ButtonContent>;

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        variants={tapPress}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(rest as any)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={cls}
      disabled={disabled}
      variants={tapPress}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
    >
      {content}
    </motion.button>
  );
}

// ─── SecondaryButton ──────────────────────────────────────────────────────────

/**
 * Medium-emphasis outlined button. Transparent background with border.
 * Used alongside PrimaryButton for secondary actions.
 *
 * @example
 * <SecondaryButton href="https://github.com/username/repo">View Source</SecondaryButton>
 */
export function SecondaryButton({
  children,
  className,
  disabled,
  icon,
  iconPosition = "right",
  size = "default",
  href,
  ...rest
}: SecondaryButtonProps) {
  const isExternal = href?.startsWith("http");

  const cls = cn(
    "inline-flex items-center justify-center rounded-md border font-medium tracking-tight",
    "bg-transparent text-foreground border-border/70",
    "hover:-translate-y-0.5 hover:border-foreground/35 hover:bg-foreground/5 active:translate-y-0",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    sizeClasses[size],
    className,
  );

  const content = <ButtonContent icon={icon} iconPosition={iconPosition}>{children}</ButtonContent>;

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        variants={tapPress}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(rest as any)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={cls}
      disabled={disabled}
      variants={tapPress}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
    >
      {content}
    </motion.button>
  );
}
