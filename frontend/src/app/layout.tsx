import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/config/site";
import { fontHeading, fontMono, fontSans } from "@/lib/fonts";
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
      className={`${fontHeading.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
