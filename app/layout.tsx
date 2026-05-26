import type { Metadata } from "next";
import { DM_Sans, Fraunces, Noto_Sans_Ethiopic, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageDecor } from "@/components/layout/PageDecor";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { siteConfig } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-noto-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${outfit.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${dmSans.variable} ${fraunces.variable} ${notoEthiopic.variable} flex min-h-full flex-col font-sans text-charcoal-800 antialiased`}
      >
        <PageDecor />
        <Navbar />
        <ScrollToTop />
        <main className="relative z-0 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
