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
  // The Google Business Profile is the important one — it ties this site to the
  // map listing. Empty entries are filtered so we never emit a dead URL.
  sameAs: [site.socials.google, site.socials.facebook, site.socials.instagram].filter(Boolean),
  hasMap: site.socials.google,
  // NOTE: deliberately no `aggregateRating` / `review`. The profile is a genuine
  // 5.0, but reviews a business collects about itself are "self-serving" and are
  // ineligible for star rich results on LocalBusiness/Organization types:
  // https://developers.google.com/search/docs/appearance/structured-data/review-snippet
  slogan: site.tagline,
  // Taxi / cab / airport transfer is the primary service, so it leads the
  // catalog and is typed as schema.org TaxiService rather than generic Service.
  // (TaxiService lives under Service, not LocalBusiness, so it belongs here in
  // hasOfferCatalog rather than as the top-level @type.)
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Taxi, cab & airport transfer services in Sri Lanka",
    itemListElement: [
      ...[
        "Island-wide Taxi Service",
        "Airport Pickup & Drop — Colombo (CMB)",
        "Airport Pickup & Drop — Mattala (HRI)",
        "Long-distance Cab Service",
        "Van & Mini-bus Hire",
        "27-seat Coach Hire",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "TaxiService",
          name,
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: { "@type": "Country", name: "Sri Lanka" },
        },
      })),
      ...["Kumana Safari", "Lagoon Safari", "Boat Safari", "Scooter Rent", "Tuk Tuk Rent", "Bicycle Rent"].map(
        (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } }),
      ),
    ],
  },
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
