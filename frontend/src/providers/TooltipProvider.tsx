"use client";

/**
 * providers/TooltipProvider.tsx
 *
 * Root-level tooltip context required by shadcn/ui's Tooltip component.
 *
 * This project uses shadcn/ui's base-nova style which is built on
 * @base-ui/react — not Radix UI. The base-ui TooltipProvider accepts
 * a `delay` prop (in ms) rather than Radix's `delayDuration`.
 *
 * A single TooltipProvider at the root ensures consistent hover delay
 * across all tooltip instances without wrapping each one individually.
 *
 * "use client" is required because this manages interactive state.
 *
 * Used by: src/providers/Providers.tsx
 * Consumed by: every Tooltip component in the application.
 */

import { TooltipProvider as ShadcnTooltipProvider } from "@/components/ui/tooltip";

interface TooltipProviderProps {
  children: React.ReactNode;
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <ShadcnTooltipProvider delay={300}>{children}</ShadcnTooltipProvider>;
}
