import type { Metadata } from "next";
import type { Service } from "@/data/services";
import { safaris, rentals, allServices } from "@/data/services";
import { site } from "@/data/site";
import { waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { externalLink } from "@/lib/utils";

const SITE_URL = "https://mradventure.lk";

const title = "Safaris & Rentals in Arugam Bay, Sri Lanka";
const description =
  "Wildlife safaris at Kumana and the lagoons, plus scooter, tuk tuk and bicycle hire in Arugam Bay. Private trips, fixed prices, booked on WhatsApp with no booking fee.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services/" },
  openGraph: {
    title,
    description,
    url: "/services/",
    siteName: site.fullName,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Safaris and rentals with Mr Adventure" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const groups: { heading: string; blurb: string; items: Service[] }[] = [
  {
    heading: "Wildlife safaris",
    blurb:
      "All private — your own jeep or boat, your own guide, and a start time that suits you rather than a fixed departure. Kumana is the quiet end of the same protected belt as Yala; the lagoon and mangrove trips are on the water minutes from Arugam Bay.",
    items: safaris,
  },
  {
    heading: "Rentals",
    blurb:
      "Delivered to wherever you're staying in Arugam Bay and collected at the end. Scooters and tuk tuks are self-drive or with a driver; bicycles need nothing but a lock, which we provide.",
    items: rentals,
  },
];

export default function ServicesHub() {
  const cta = waEnquiry("safaris and rentals");

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/services/#page`,
        name: title,
        description,
        url: `${SITE_URL}/services/`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/services/#list`,
        name: "Safaris and rentals",
        numberOfItems: allServices.length,
        itemListElement: allServices.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.title,
          url: `${SITE_URL}/services/${s.slug}/`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="relative overflow-hidden bg-brand-900 pb-16 pt-32 text-white sm:pt-36">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs light items={[{ label: "Home", href: "/" }, { label: "Safaris & rentals" }]} />

          <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">
            Safaris and rentals in Arugam Bay
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Beyond the taxi side of the business, we run wildlife trips into Kumana and the lagoons, and
            hire out the scooters, tuk tuks and bicycles that make Arugam Bay easy to get around. Everything
            here is quoted individually and booked on WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={cta} {...externalLink} className={buttonClasses("gold", "lg")}>
              <WhatsAppIcon className="h-5 w-5" />
              Check availability
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className={buttonClasses("outline", "lg", "!border-white/30 !text-white hover:!bg-white hover:!text-brand-900")}
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {groups.map((g, i) => (
        <section key={g.heading} className={`section ${i % 2 === 0 ? "bg-sand" : "bg-white"}`}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{g.heading}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{g.blurb}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
