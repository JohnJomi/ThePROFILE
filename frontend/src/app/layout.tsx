/**
 * app/layout.tsx — Root layout
 *
 * This is the single layout that wraps every page in the application.
 *
 * Responsibilities:
 *   1. Declare the <html> element with correct lang and font classes.
 *   2. Export site-wide metadata (SEO, OpenGraph, Twitter Cards).
 *   3. Import global CSS.
 *   4. Wrap all pages in the root Providers component.
 *
 * What does NOT belong here:
 *   - Page-specific metadata (define in each page.tsx or page layout)
 *   - Navigation or Footer components (added in Phase 3)
 *   - Any content that is not part of every single page
 */

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { defaultMetadata } from "@/lib/metadata";
import { Providers } from "@/providers/Providers";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={siteConfig.locale.split("_")[0] ?? "en"}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
