import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FreedomLinks — The links you've been looking for",
    template: "%s · FreedomLinks",
  },
  description:
    "FreedomLinks sells premium vendor lists — curated link packages that show you exactly where to find the products everyone wants, at the best prices, from trusted sellers.",
  keywords: [
    "vendor list",
    "SM7B deals",
    "Chrome Hearts authentication",
    "Sur-Ron dealers",
    "where to buy",
    "FreedomLinks",
  ],
  authors: [{ name: "FreedomLinks" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "FreedomLinks",
    title: "FreedomLinks — The links you've been looking for",
    description:
      "Your insider plug for finding the products everyone wants. Verified sellers, insider pricing, instant delivery.",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "FreedomLinks — The links you've been looking for",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreedomLinks — The links you've been looking for",
    description:
      "Premium vendor lists. Verified sellers, insider pricing, instant delivery.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink text-bone">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
