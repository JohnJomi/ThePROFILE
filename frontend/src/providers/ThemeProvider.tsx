"use client";

/**
 * providers/ThemeProvider.tsx
 *
 * Thin wrapper around next-themes' ThemeProvider.
 *
 * Responsibilities:
 * - Enables system-preference-aware dark/light mode.
 * - Persists user choice in localStorage across sessions.
 * - Applies the active theme class to <html> so Tailwind's `dark:` variants work.
 * - Prevents flash of unstyled content (FOUC) on initial render.
 *
 * "use client" is required because next-themes accesses localStorage
 * and window.matchMedia — browser-only APIs.
 *
 * Used by: src/providers/Providers.tsx
 * Consumed by: any component that calls useTheme() from next-themes.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
