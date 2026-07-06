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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.fullName,
  description: site.blurb,
  telephone: PHONE_TEL,
  areaServed: "Sri Lanka",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arugam Bay",
    addressCountry: "LK",
  },
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
