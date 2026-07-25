"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * AnimatedBackground — purely decorative animated gradient background.
 *
 * Renders absolutely-positioned decorative blobs behind page content.
 * Intentionally kept subtle so it doesn't compete with content.
 *
 * Behavior:
 *   - Renders only on the client (useEffect guard) to avoid SSR mismatch
 *   - aria-hidden — completely invisible to screen readers
 *   - pointer-events-none — never intercepts clicks
 *   - Respects prefers-reduced-motion via CSS (animation-play-state: paused)
 *
 * Variants:
 *   - "dots"     — subtle dot grid pattern (default)
 *   - "gradient" — radial brand-color blobs
 *   - "grid"     — fine line grid
 *
 * Usage:
 *   Place inside a relative-positioned section. The parent must set
 *   overflow-hidden to contain the blobs.
 *
 *   <div className="relative overflow-hidden">
 *     <AnimatedBackground variant="gradient" />
 *     <div className="relative z-10">...content...</div>
 *   </div>
 */

export interface AnimatedBackgroundProps {
  variant?: "dots" | "gradient" | "grid";
  className?: string;
}

export function AnimatedBackground({
  variant = "dots",
  className,
}: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Don't render on the server — avoids hydration mismatch for random positions
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {variant === "gradient" && (
        <>
          {/* Top-left blob */}
          <div
            className={cn(
              "absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full",
              "bg-brand/8 blur-[120px]",
              "motion-safe:animate-[float_8s_ease-in-out_infinite]",
            )}
          />
          {/* Bottom-right blob */}
          <div
            className={cn(
              "absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full",
              "bg-brand/6 blur-[100px]",
              "motion-safe:animate-[float_10s_ease-in-out_2s_infinite]",
            )}
          />
          {/* Center accent */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "h-[400px] w-[400px] rounded-full",
              "bg-primary/4 blur-[80px]",
            )}
          />
        </>
      )}

      {variant === "dots" && (
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle, oklch(0.5 0 0) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      )}

      {variant === "grid" && (
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.5 0 0) 1px, transparent 1px),
              linear-gradient(to right, oklch(0.5 0 0) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      )}
    </div>
  );
}
