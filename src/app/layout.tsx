import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-body",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crestfield Academy | Excellence in Education",
  description:
    "Crestfield Academy — A leading secondary school in Abuja, Nigeria (JSS1–SS3).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
