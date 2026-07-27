import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { BackToTop } from "@/components/layout/BackToTop";

const GA_MEASUREMENT_ID = "G-3LFS8T2RJ4";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d3320",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mradventure.lk/"),
  // Taxi / cab / airport transfer is the main revenue line, so the primary
  // keywords lead the title rather than the brand name.
  title: {
    default: "Sri Lanka Taxi Service | Airport Pickup & Drop, Island-Wide Cabs",
    template: "%s | Mr Adventure Tours & Travels",
  },
  description:
    "Sri Lanka taxi & cab service — 24/7 Colombo airport pickup and drop, island-wide transfers. Cars, vans and 27-seat coaches. Fixed fair prices. Instant WhatsApp quote.",
  keywords: [
    "Sri Lanka taxi service",
    "Sri Lanka cab service",
    "airport taxi Sri Lanka",
    "Colombo airport pickup and drop",
    "Colombo airport transfer",
    "island-wide taxi Sri Lanka",
    "all island cab service",
    "Mattala airport taxi",
    "van hire Sri Lanka",
    "Arugam Bay taxi",
    "long distance taxi Sri Lanka",
  ],
  // Canonical + og:url were missing entirely; without them /index.html is an
  // unclaimed duplicate of / and shares aren't attributed to the domain.
  alternates: { canonical: "/" },
  appleWebApp: {
    capable: true,
    title: "Mr Adventure",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Sri Lanka Taxi & Cab Service | Airport Pickup & Drop",
    description:
      "Island-wide taxi and airport transfers across Sri Lanka — cars, vans and coaches, 24/7. Fixed fair prices, no meters. Rated 5.0 on Google.",
    url: "/",
    siteName: "Mr Adventure Tours & Travels",
    type: "website",
    locale: "en_US",
    images: [
      { url: "og.jpg", width: 1200, height: 630, alt: "Mr Adventure — Sri Lanka island-wide taxi and airport transfers" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Taxi & Cab Service | Airport Pickup & Drop",
    description: "Island-wide taxi & airport transfers across Sri Lanka, 24/7. Fixed prices. Book on WhatsApp.",
    images: ["og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col bg-sand text-ink">
        <Navbar />
        {/* small breathing room at the bottom on mobile */}
        <main className="flex-1 pb-8 lg:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileActionBar />
        <BackToTop />
      </body>
    </html>
  );
}
