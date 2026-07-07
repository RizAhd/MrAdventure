import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Safaris } from "@/components/sections/Safaris";
import { Rentals } from "@/components/sections/Rentals";
import { Taxi } from "@/components/sections/Taxi";
import { Destinations } from "@/components/sections/Destinations";
import { Fleet } from "@/components/sections/Fleet";
import { Gallery } from "@/components/sections/Gallery";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { faqs } from "@/data/faqs";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site";
import { PHONE_TEL } from "@/lib/whatsapp";

const SITE_URL = "https://mradventure.lk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#business`,
  name: site.fullName,
  description: site.blurb,
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/icon.png`,
  telephone: PHONE_TEL,
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arugam Bay",
    addressRegion: "Eastern Province",
    addressCountry: "LK",
  },
  // Arugam Bay coordinates — helps Google place the business on the map.
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.8404,
    longitude: 81.8339,
  },
  // Open 24/7 for airport transfers.
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  // Links that verify this is the same business across the web (strong local-SEO signal).
  sameAs: [site.socials.facebook, site.socials.instagram],
  slogan: site.tagline,
  makesOffer: [
    "Island-wide Taxi Service",
    "Airport Transfer",
    "Van & Mini-bus Hire",
    "Kumana Safari",
    "Lagoon Safari",
    "Boat Safari",
    "Scooter Rent",
    "Tuk Tuk Rent",
    "Bicycle Rent",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero />
      <Stats />
      <Taxi />
      <Fleet />
      <Destinations />
      <Safaris />
      <Rentals />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
