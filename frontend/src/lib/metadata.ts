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
 * Resolve the metadataBase URL.
 *
 * Next.js requires metadataBase to be set to resolve relative icon and
 * OG image URLs. Rules:
 *   - Production: use siteConfig.url (set before deployment)
 *   - Development: fall back to http://localhost:3000 so the build
 *     doesn't emit a warning and OG previews work locally
 *
 * This is the correct pattern recommended in the Next.js docs.
 */
function resolveMetadataBase(): URL {
  if (siteConfig.url) return new URL(siteConfig.url);
  if (process.env.VERCEL_URL) return new URL(`https://${process.env.VERCEL_URL}`);
  return new URL("http://localhost:3000");
}

/**
 * Default metadata applied to every page unless overridden.
 * The root layout exports this directly.
 */
export const defaultMetadata: Metadata = {
  metadataBase: resolveMetadataBase(),

  title: {
    default: [siteConfig.name, siteConfig.title].filter(Boolean).join(" — ") || "Portfolio",
    template: `%s — ${siteConfig.name || "Portfolio"}`,
  },

  description: siteConfig.description || "AI Engineer Portfolio",

  keywords: [
    "AI Engineer",
    "Machine Learning",
    "AWS",
    "Full Stack",
    "Portfolio",
    ...(siteConfig.name ? [siteConfig.name] : []),
  ],

  authors: siteConfig.name
    ? [{ name: siteConfig.name, url: siteConfig.url || undefined }]
    : [],

  creator: siteConfig.name || undefined,

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url || undefined,
    siteName: siteConfig.name || "Portfolio",
    title: [siteConfig.name, siteConfig.title].filter(Boolean).join(" — ") || "Portfolio",
    description: siteConfig.description || "AI Engineer Portfolio",
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
    title: [siteConfig.name, siteConfig.title].filter(Boolean).join(" — ") || "Portfolio",
    description: siteConfig.description || "AI Engineer Portfolio",
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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
  },

  // Next.js App Router generates /manifest.webmanifest from app/manifest.ts
  manifest: "/manifest.webmanifest",

  verification: {
    // google: "your-google-verification-token",  // fill in Phase 6
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
