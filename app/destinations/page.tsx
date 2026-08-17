import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { site } from "@/data/site";
import { waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { blurProps, externalLink } from "@/lib/utils";

const SITE_URL = "https://mradventure.lk";

const title = "Destinations in Sri Lanka We Drive To";
const description =
  "The places we take guests across Sri Lanka — airports, hill country, the south coast and the east. Private taxi and cab transfers to each, at a fixed price agreed on WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/destinations/" },
  openGraph: {
    title,
    description,
    url: "/destinations/",
    siteName: site.fullName,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Destinations across Sri Lanka" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export default function DestinationsHub() {
  const cta = waEnquiry("a trip in Sri Lanka");

  // Region headings give the list a geography rather than an arbitrary order.
  const byRegion = destinations.reduce<Record<string, typeof destinations>>((acc, d) => {
    (acc[d.region] ??= []).push(d);
    return acc;
  }, {});

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/destinations/#page`,
        name: title,
        description,
        url: `${SITE_URL}/destinations/`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/destinations/#list`,
        name: "Destinations served across Sri Lanka",
        numberOfItems: destinations.length,
        itemListElement: destinations.map((d, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: d.name,
          url: `${SITE_URL}/destinations/${d.slug}/`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="relative overflow-hidden bg-brand-900 pb-16 pt-32 text-white sm:pt-36">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs light items={[{ label: "Home", href: "/" }, { label: "Destinations" }]} />

          <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">
            Where we&apos;ll take you in Sri Lanka
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {destinations.length} places we drive to regularly, from the arrivals hall at Colombo Airport to
            the far side of the east coast. Each page covers what the place is actually like and how the
            drive there works — the transfer itself is always a private cab at a fixed price.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={cta} {...externalLink} className={buttonClasses("gold", "lg")}>
              <WhatsAppIcon className="h-5 w-5" />
              Plan a trip
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

      <section className="section bg-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {Object.entries(byRegion).map(([region, list]) => (
              <div key={region}>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-700">{region}</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/destinations/${d.slug}/`}
                      prefetch={false}
                      className="group relative block h-72 overflow-hidden rounded-3xl shadow-sm ring-1 ring-brand-950/5 transition-transform duration-200 active:scale-[0.98]"
                    >
                      <Image
                        src={d.image}
                        alt={d.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        {...blurProps(d.image)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
                      <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-gold-500 text-brand-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="font-display text-2xl font-bold text-white drop-shadow">{d.name}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-white/85">{d.blurb}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
