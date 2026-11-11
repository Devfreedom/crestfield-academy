import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { getBuildYear } from "@/lib/buildInfo";

export const metadata: Metadata = {
  title: "Crestfield Academy | Excellence in Education",
  description:
    "Crestfield Academy — A leading secondary school in Abuja, Nigeria (JSS1–SS3).",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const year = await getBuildYear();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Preload the two latin font files that paint first (LCP). */}
        <link
          rel="preload"
          href="/fonts/InterVariable-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Poppins-700-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900">
        <SiteChrome year={year}>{children}</SiteChrome>
      </body>
    </html>
  );
}
