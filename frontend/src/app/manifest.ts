/**
 * app/manifest.ts — Web App Manifest
 *
 * Next.js App Router convention: this file generates /manifest.webmanifest
 * at build time. It enables:
 *   - "Add to Home Screen" on mobile browsers
 *   - Correct browser theme color in Chrome and Safari
 *   - PWA-like metadata for the site
 *
 * Update `name`, `short_name`, and `theme_color` to match your brand.
 * The `theme_color` should match `--brand` in globals.css.
 */

import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name || "Portfolio",
    short_name: siteConfig.name || "Portfolio",
    description: siteConfig.description || "",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
