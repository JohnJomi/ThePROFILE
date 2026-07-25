"use client";

import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/**
 * ThemeToggle — icon button that switches between light and dark mode.
 *
 * Implementation notes:
 *   - `mounted` guard: next-themes cannot know the resolved theme on the
 *     server. Without this guard, the component renders a mismatched icon
 *     on hydration. We render nothing until the theme is resolved client-side.
 *   - AnimatePresence swaps the Sun/Moon icon with a scale+fade animation.
 *   - Controlled entirely by next-themes — no local theme state.
 *
 * Accessibility:
 *   - aria-label reflects the *action* ("Switch to dark mode") not the state
 *   - Role "button" is implicit from the <button> element
 *   - Focus ring visible on both backgrounds
 *
 * Used by: Navbar.
 */

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default";
}

export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  // Render a blank placeholder matching the button dimensions to
  // prevent layout shift while theme resolves.
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(size === "sm" ? "size-8" : "size-9", className)}
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg",
        "text-muted-foreground transition-colors duration-150",
        "hover:text-foreground hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "sm" ? "size-8" : "size-9",
        className,
      )}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <Moon className="size-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ scale: 0.6, opacity: 0, rotate: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <Sun className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
