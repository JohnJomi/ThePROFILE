"use client";

/**
 * providers/Providers.tsx — Root provider composition.
 *
 * Composes all application-level providers into a single component.
 * The root layout imports ONLY this file — never individual providers.
 *
 * Provider order (outer → inner):
 *   1. ThemeProvider      — must be outermost to apply theme to all children
 *   2. MotionConfig       — applies reducedMotion="user" globally to all
 *                           Framer Motion variants; honours the OS accessibility
 *                           setting (prefers-reduced-motion) automatically
 *   3. ReactQueryProvider — data fetching context
 *   4. TooltipProvider    — UI context; needs to be inside ThemeProvider
 *
 * Adding a new provider: add it here in the correct position.
 * Do NOT add providers directly in layout.tsx.
 *
 * Used by: src/app/layout.tsx
 */

import { MotionConfig } from "framer-motion";

import { ReactQueryProvider } from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TooltipProvider } from "./TooltipProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {/*
       * reducedMotion="user" — Framer Motion reads prefers-reduced-motion
       * and collapses all animation durations to 0 when the user has opted in
       * to reduced motion. No per-component logic needed.
       */}
      <MotionConfig reducedMotion="user">
        <ReactQueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ReactQueryProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
