import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plane, ShieldCheck, Users } from "lucide-react";
import { routes } from "@/data/routes";
import { site } from "@/data/site";
import { waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { externalLink } from "@/lib/utils";

const SITE_URL = "https://mradventure.lk";

const title = "Sri Lanka Taxi Routes — Fixed Fares, 22 Transfers";
const description =
  "Every taxi and cab route we drive across Sri Lanka, with a fixed price agreed up front. Colombo and Mattala airport transfers, hill country and coast, 24/7 on WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/taxi/" },
  openGraph: {
    title,
    description,
    url: "/taxi/",
    siteName: site.fullName,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Mr Adventure taxi routes across Sri Lanka" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const features = [
  { Icon: Plane, title: "Airport transfers", text: "Colombo (CMB) and Mattala (HRI), around the clock. Share your flight number and we track it." },
  { Icon: ShieldCheck, title: "Fixed prices", text: "Agreed on WhatsApp before you travel. No meters, no booking fee, no renegotiating on arrival." },
  { Icon: Users, title: "Any group size", text: "Cars, cabs, vans and a 27-seat coach — the quote covers the vehicle that actually fits you." },
];

export default function TaxiHub() {
  const cta = waEnquiry("an island-wide taxi / airport transfer");

  // Group by origin so the list reads as a set of journeys rather than 22 rows.
  const byOrigin = routes.reduce<Record<string, typeof routes>>((acc, r) => {
    (acc[r.fromShort] ??= []).push(r);
    return acc;
  }, {});

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/taxi/#page`,
        name: title,
        description,
        url: `${SITE_URL}/taxi/`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/taxi/#routes`,
        name: "Taxi and cab routes across Sri Lanka",
        numberOfItems: routes.length,
        itemListElement: routes.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${r.from} to ${r.to}`,
          url: `${SITE_URL}/taxi/${r.slug}/`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="relative overflow-hidden bg-brand-900 pb-16 pt-32 text-white sm:pt-36">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs light items={[{ label: "Home", href: "/" }, { label: "Taxi routes" }]} />

          <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">
            Taxi &amp; cab routes across Sri Lanka
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            These are the {routes.length} transfers we drive most often, each with its own page covering
            the vehicle that suits it, what is worth stopping for, and the questions people actually ask.
            We drive anywhere on the island — if your journey is not listed, ask and we will quote it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={cta} {...externalLink} className={buttonClasses("gold", "lg")}>
              <WhatsAppIcon className="h-5 w-5" />
              Get a fixed price
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map(({ Icon, title: t, text }) => (
              <div key={t} className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500 text-brand-950">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-brand-950">{t}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">All routes</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">
            Grouped by where the journey starts. Fares depend on the vehicle and your group size, so every
            trip is quoted individually — tap a route for the detail and a price on WhatsApp.
          </p>

          <div className="mt-10 flex flex-col gap-10">
            {Object.entries(byOrigin).map(([origin, list]) => (
              <div key={origin}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-700">
                  From {origin}
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {list.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/taxi/${r.slug}/`}
                        prefetch={false}
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-sand px-4 py-3.5 transition-colors hover:border-brand-300 hover:bg-brand-50"
                      >
                        <span className="min-w-0 text-sm font-medium text-brand-900">
                          {r.fromShort} <span className="text-gold-600">→</span> {r.toShort}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-gold-600 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
