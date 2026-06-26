import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
  adjustFontFallback: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laptopadvisor.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Engineering Laptop Advisor India",
    template: "%s | Engineering Laptop Advisor India",
  },
  description:
    "India's most trusted laptop guide for JEE aspirants and engineering students. Find the right laptop for your branch, budget, and college.",
  keywords: [
    "engineering laptop India",
    "IIT laptop guide",
    "best laptop for CS students",
    "laptop for engineering students",
    "JEE laptop buying guide",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Engineering Laptop Advisor India",
    title: "Engineering Laptop Advisor India",
    description:
      "Before You Spend ₹50,000–₹2,00,000 On A Laptop, Read This Once.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Engineering Laptop Advisor India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Laptop Advisor India",
    description:
      "Find the right laptop for your branch, budget, and college.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0A14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-background font-sans text-base text-text antialiased transition-colors duration-200"
        suppressHydrationWarning
      >
        <ThemeProvider>
            <Navbar />
            <main className="flex-1 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:pb-0">
              {children}
            </main>
            <Footer />
            <MobileTabBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
