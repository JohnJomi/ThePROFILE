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
  lg: "h-12 px-7 text-base gap-2.5 [&_svg]:size-5",
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
    "inline-flex items-center justify-center rounded-2xl border font-medium",
    "bg-brand/90 text-brand-foreground border-brand/20 backdrop-blur-xl shadow-[0_10px_24px_rgb(37_99_235/0.18),0_2px_8px_rgb(15_23_42/0.08)]",
    "hover:-translate-y-0.5 hover:bg-brand hover:border-brand/30 hover:shadow-[0_18px_36px_rgb(37_99_235/0.24),0_8px_20px_rgb(15_23_42/0.12)] active:translate-y-0 active:shadow-[0_8px_20px_rgb(37_99_235/0.16)]",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
    "inline-flex items-center justify-center rounded-2xl border font-medium",
    "bg-white/70 text-foreground border-white/20 backdrop-blur-xl shadow-[0_8px_22px_rgb(15_23_42/0.06),inset_0_1px_0_rgb(255_255_255/0.45)]",
    "dark:bg-white/10 dark:text-foreground dark:border-white/10 dark:shadow-[0_12px_30px_rgb(0_0_0/0.28),inset_0_1px_0_rgb(255_255_255/0.08)]",
    "hover:-translate-y-0.5 hover:bg-white/85 hover:border-white/30 hover:shadow-[0_16px_32px_rgb(15_23_42/0.1),0_6px_18px_rgb(15_23_42/0.08)]",
    "dark:hover:bg-white/15 dark:hover:border-white/15 dark:hover:shadow-[0_18px_40px_rgb(0_0_0/0.36),0_6px_18px_rgb(0_0_0/0.16)]",
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
