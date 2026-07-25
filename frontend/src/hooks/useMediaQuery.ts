"use client";

import { useEffect, useState } from "react";

import { breakpoints, type BreakpointKey } from "@/config/theme";

/**
 * useMediaQuery — reactive wrapper around window.matchMedia.
 *
 * Accepts either:
 *   - A named breakpoint key from theme.ts (e.g., "md", "lg")
 *   - A raw CSS media query string (e.g., "(max-width: 768px)")
 *
 * When a breakpoint key is supplied it expands to a `(min-width: Xpx)` query,
 * matching Tailwind's mobile-first convention.
 *
 * Server-side: returns `false`. Hydration will correct on mount.
 *
 * @param query - A breakpoint key or raw media query string.
 * @returns {boolean} Whether the media query currently matches.
 *
 * @example
 * // Named breakpoint — true when viewport ≥ md (768px)
 * const isTablet = useMediaQuery("md");
 *
 * // Raw query
 * const isPortrait = useMediaQuery("(orientation: portrait)");
 *
 * // Conditional rendering
 * const isDesktop = useMediaQuery("lg");
 * return isDesktop ? <DesktopNav /> : <MobileNav />;
 */
export function useMediaQuery(query: BreakpointKey | string): boolean {
  const [matches, setMatches] = useState(false);

  // Resolve named breakpoint → raw query string
  const resolvedQuery =
    query in breakpoints
      ? `(min-width: ${breakpoints[query as BreakpointKey]}px)`
      : query;

  useEffect(() => {
    const mq = window.matchMedia(resolvedQuery);

    // Sync initial value and subscribe to changes together via a unified handler.
    // Avoids calling setState synchronously in the effect body.
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setMatches(e.matches);

    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () =>
      mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, [resolvedQuery]);

  return matches;
}
