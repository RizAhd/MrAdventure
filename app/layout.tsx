import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { site } from "@/data/site";
import { PHONE_TEL } from "@/lib/whatsapp";

const GA_MEASUREMENT_ID = "G-3LFS8T2RJ4";
const SITE_URL = "https://mradventure.lk";

/**
 * Site-wide entity graph, emitted on every page.
 *
 * The Organization node carries the same @id the home page's TravelAgency node
 * uses, so Google merges them into one business entity instead of treating the
 * sub-pages as an unrelated site. Route and destination pages point their
 * `provider` at this @id.
 */
const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#business`,
      name: site.fullName,
      alternateName: site.name,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
      image: `${SITE_URL}/og.jpg`,
      telephone: PHONE_TEL,
      areaServed: { "@type": "Country", name: "Sri Lanka" },
      sameAs: [site.socials.google, site.socials.facebook, site.socials.instagram].filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.fullName,
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en",
    },
  ],
};

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
    "Sri Lanka taxi & cab service, rated 5.0 on Google. 24/7 Colombo airport pickup and drop, island-wide transfers. Cars, vans & 27-seat coaches. Fixed prices, no booking fee — quote on WhatsApp in minutes.",
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
        {/* Site-wide entity graph. Lives in the layout so every page (home,
            routes, destinations) resolves the same business and site nodes,
            which page-level schema then references by @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-800 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        {/* small breathing room at the bottom on mobile */}
        <main id="main" className="flex-1 pb-8 lg:pb-0">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <MobileActionBar />
        <BackToTop />
      </body>
    </html>
  );
}
