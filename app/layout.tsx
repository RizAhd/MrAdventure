import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

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
  title: {
    default: "Mr Adventure Tours & Travels | Sri Lanka Taxi, Airport Transfers & Tours",
    template: "%s | Mr Adventure Tours & Travels",
  },
  description:
    "Reliable island-wide taxi & airport transfers across Sri Lanka — cars, vans and mini-buses. Plus wildlife safaris and scooter/tuk-tuk rentals. Fixed fair prices. Book instantly on WhatsApp.",
  keywords: [
    "Sri Lanka taxi",
    "airport transfer Sri Lanka",
    "Colombo airport taxi",
    "island-wide taxi Sri Lanka",
    "van hire Sri Lanka",
    "Arugam Bay taxi",
    "Sri Lanka safari",
  ],
  appleWebApp: {
    capable: true,
    title: "Mr Adventure",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Mr Adventure Tours & Travels",
    description:
      "Island-wide taxi & airport transfers across Sri Lanka, plus safaris & rentals. Safe travel, best prices, reliable service.",
    type: "website",
    locale: "en_US",
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: "Mr Adventure Tours & Travels" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr Adventure Tours & Travels",
    description: "Sri Lanka island-wide taxi, airport transfers, safaris & rentals. Book on WhatsApp.",
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
      </body>
    </html>
  );
}
