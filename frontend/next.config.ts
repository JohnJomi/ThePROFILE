import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Allow next/image to optimize images from any HTTPS source.
     * Restrict to specific domains before production launch (Phase 6).
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
