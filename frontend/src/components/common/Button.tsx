"use client";

/**
 * Button.tsx — unified Button component with variant prop.
 *
 * This is the spec-required `Button` export that acts as a single entry point
 * for both primary and secondary button styles. Internally delegates to
 * PrimaryButton and SecondaryButton from Buttons.tsx.
 *
 * Why a separate file instead of adding to Buttons.tsx?
 *   - Keeps Buttons.tsx self-contained and unchanged (no regression risk)
 *   - Provides a clean import path: `import { Button } from "@/components/common/Button"`
 *   - Allows future extension (e.g., ghost, destructive variants) without
 *     restructuring PrimaryButton/SecondaryButton
 *
 * API:
 *   variant="primary"    → PrimaryButton (default)
 *   variant="secondary"  → SecondaryButton
 *
 * All other props (href, size, icon, iconPosition, disabled) are forwarded
 * as-is to the underlying button component.
 *
 * Accessibility:
 *   - Inherits all a11y properties from PrimaryButton / SecondaryButton
 *   - Focus ring, aria-disabled, external link attributes all handled upstream
 *
 * @example
 * <Button>Primary action</Button>
 * <Button variant="secondary" href="https://github.com" icon={<Github />}>
 *   View Source
 * </Button>
 * <Button size="lg" icon={<ArrowRight />} iconPosition="right">
 *   Get Started
 * </Button>
 */

import { PrimaryButton, SecondaryButton } from "./Buttons";
import type { PrimaryButtonProps } from "./Buttons";

export type ButtonProps = PrimaryButtonProps & {
  /** Visual style variant. Defaults to "primary". */
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", ...props }: ButtonProps) {
  if (variant === "secondary") {
    return <SecondaryButton {...props} />;
  }
  return <PrimaryButton {...props} />;
}
