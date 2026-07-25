/**
 * lib/metadata.ts — Metadata factory for Next.js App Router.
 *
 * Provides the base `defaultMetadata` object used in the root layout,
 * and a `buildMetadata()` helper for page-specific metadata with
 * deep-merge overrides on top of the defaults.
 *
 * All values are derived from siteConfig — no hardcoded strings.
 *
 * Used by:
 *   - src/app/layout.tsx (exports defaultMetadata)
 *   - Future page layouts (call buildMetadata({ title: "..." }))
 */

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/**
 * Default metadata applied to every page unless overridden.
 * The root layout exports this directly.
 */
export const defaultMetadata: Metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,

  title: {
    default: [siteConfig.name, siteConfig.title].filter(Boolean).join(" — "),
    template: `%s — ${siteConfig.name}`,
  },

  description: siteConfig.description || undefined,

  keywords: [
    "AI Engineer",
    "Machine Learning",
    "AWS",
    "Full Stack",
    "Portfolio",
    ...(siteConfig.name ? [siteConfig.name] : []),
  ],

  authors: siteConfig.name ? [{ name: siteConfig.name, url: siteConfig.url || undefined }] : [],

  creator: siteConfig.name || undefined,

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url || undefined,
    siteName: siteConfig.name || undefined,
    title: [siteConfig.name, siteConfig.title].filter(Boolean).join(" — ") || undefined,
    description: siteConfig.description || undefined,
    images: siteConfig.ogImageUrl
      ? [
          {
            url: siteConfig.ogImageUrl,
            width: 1200,
            height: 630,
            alt: siteConfig.name ? `${siteConfig.name} — Portfolio` : "Portfolio",
          },
        ]
      : [],
  },

  twitter: {
    card: "summary_large_image",
    title: [siteConfig.name, siteConfig.title].filter(Boolean).join(" — ") || undefined,
    description: siteConfig.description || undefined,
    images: siteConfig.ogImageUrl ? [siteConfig.ogImageUrl] : [],
    creator: siteConfig.social.twitter
      ? `@${siteConfig.social.twitter.replace(/.*twitter\.com\//, "")}`
      : undefined,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon-32x32.png",
  },

  manifest: "/manifest.webmanifest",

  verification: {
    // Fill in when you've verified the site in Search Console
    // google: "your-google-verification-token",
  },
};

/**
 * Builds page-specific metadata by merging overrides on top of defaults.
 *
 * @example
 * // In /projects/[slug]/page.tsx:
 * export const metadata = buildMetadata({
 *   title: project.title,
 *   description: project.description,
 *   openGraph: { images: [project.coverImage] },
 * });
 */
export function buildMetadata(overrides: Metadata = {}): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...(overrides.openGraph ?? {}),
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...(overrides.twitter ?? {}),
    },
  };
}
