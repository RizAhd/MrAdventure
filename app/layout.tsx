import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rizahd.github.io/MrAdventure/"),
  title: {
    default: "Mr Adventure Tours & Travels | Sri Lanka Safaris, Rentals & Taxi",
    template: "%s | Mr Adventure Tours & Travels",
  },
  description:
    "Wildlife safaris (Kumana, lagoon & boat), scooter, tuk-tuk & bicycle rentals, and reliable island-wide taxi service in Sri Lanka. Book instantly on WhatsApp.",
  keywords: [
    "Sri Lanka safari",
    "Kumana safari",
    "Arugam Bay tours",
    "scooter rent Sri Lanka",
    "tuk tuk rent",
    "airport taxi Sri Lanka",
    "island-wide taxi",
  ],
  openGraph: {
    title: "Mr Adventure Tours & Travels",
    description:
      "Safaris, rentals & island-wide taxi on Sri Lanka's east coast. Safe travel, best prices, reliable service.",
    type: "website",
    locale: "en_US",
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: "Mr Adventure Tours & Travels" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr Adventure Tours & Travels",
    description: "Sri Lanka safaris, rentals & island-wide taxi. Book on WhatsApp.",
    images: ["og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-sand text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
