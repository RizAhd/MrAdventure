import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, Plane, ShieldCheck, Users, Check } from "lucide-react";
import { routes, routeBySlug, relatedRoutes } from "@/data/routes";
import { fleet } from "@/data/fleet";
import { site } from "@/data/site";
import { waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { blurProps } from "@/lib/utils";

const SITE_URL = "https://mradventure.lk";

export function generateStaticParams() {
  return routes.map((r) => ({ route: r.slug }));
}

// Next 16 passes `params` as a Promise — it must be awaited. Reading it
// synchronously yields undefined, which silently renders every page as 404
// while the build still reports success.
export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const { route } = await params;
  const r = routeBySlug(route);
  if (!r) return {};
  // `absolute` bypasses the root "%s | Mr Adventure Tours & Travels" template,
  // which would push these past ~85 chars and get them truncated in results.
  const title = `${r.from} to ${r.to} Taxi — Fixed Price | Mr Adventure`;
  const description = `Private ${r.from} to ${r.to} taxi and transfer with Mr Adventure. Cars, vans and coaches, 24/7, fixed fair prices agreed up front. Get a quote on WhatsApp in minutes.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/taxi/${r.slug}/` },
    openGraph: {
      title,
      description,
      url: `/taxi/${r.slug}/`,
      siteName: site.fullName,
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${r.from} to ${r.to} taxi` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}

/** Vehicles we actually offer for road transfers (not safari jeeps / rentals). */
const transferFleet = fleet.slice(0, 5);

export default async function RoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route } = await params;
  const r = routeBySlug(route);
  if (!r) notFound();

  const related = relatedRoutes(r.slug);
  const cta = waEnquiry(`a taxi from ${r.from} to ${r.to}`);

  const ld = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `${r.from} to ${r.to} taxi transfer`,
    description: r.intro,
    url: `${SITE_URL}/taxi/${r.slug}/`,
    serviceType: "Airport transfer and long-distance taxi",
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: cta,
      servicePhone: PHONE_TEL,
availableLanguage: ["en"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 pb-16 pt-28 text-white sm:pt-32">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Taxi routes", href: "/#taxi" },
              { label: `${r.fromShort} to ${r.toShort}` },
            ]}
          />

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            <MapPin className="h-3.5 w-3.5" />
            Private transfer
          </span>

          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">
            {r.from} to {r.to} Taxi
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{r.intro}</p>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {r.duration && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-gold-300">Driving time</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-display text-lg font-bold">
                  <Clock className="h-4 w-4 text-gold-400" />
                  {r.duration}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gold-300">Price</dt>
              <dd className="mt-1 font-display text-lg font-bold">Fixed quote, agreed up front</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gold-300">Availability</dt>
              <dd className="mt-1 font-display text-lg font-bold">24/7, including night flights</dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={cta} target="_blank" rel="noopener noreferrer" className={buttonClasses("gold", "lg")}>
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

      {/* Vehicle guidance + what's on the way */}
      <section className="section bg-sand">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
                Which vehicle for this trip?
              </h2>
              <p className="mt-4 leading-relaxed text-ink/75">{r.vehicleNote}</p>
              <ul className="mt-6 space-y-2.5">
                {transferFleet.map((v) => (
                  <li key={v.name} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    <span>
                      <span className="font-semibold text-brand-900">{v.name}</span>
                      <span className="text-ink/60"> — {v.capacity}. {v.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">Worth stopping for</h2>
              <p className="mt-4 leading-relaxed text-ink/75">
                Your driver is yours for the journey, so stops are free — tell them on the day. Common
                detours on this route:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {r.stops.map((s) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm font-medium text-brand-800"
                  >
                    <MapPin className="h-3.5 w-3.5 text-gold-600" />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-4 rounded-2xl border border-brand-100 bg-white p-5">
                {[
                  { Icon: Plane, t: "Flight tracking", d: "Share your flight number and we adjust pickup automatically if you're delayed — no extra charge." },
                  { Icon: ShieldCheck, t: "No meters, no detours", d: "The price we agree on WhatsApp is the price you pay." },
                  { Icon: Users, t: "Any group size", d: "From a single car up to a 27-seat coach, plus child seats on request." },
                ].map(({ Icon, t, d }) => (
                  <div key={t} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold text-brand-900">{t}</span>
                      <span className="text-ink/70"> — {d}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related routes — internal linking */}
      {related.length > 0 && (
        <section className="section bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">Related transfers</h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {related.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/taxi/${o.slug}/`}
                    prefetch={false}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-sand px-4 py-3.5 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    <span className="text-sm font-medium text-brand-900">
                      {o.fromShort} <span className="text-gold-600">→</span> {o.toShort}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gold-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="section bg-cream">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="relative mx-auto mb-8 h-48 w-full max-w-sm overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/fleet/hiace-7.webp"
              alt="Mr Adventure transfer van"
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover"
              {...blurProps("/fleet/hiace-7.webp")}
            />
          </div>
          <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
            Book your {r.fromShort} to {r.toShort} transfer
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink/70">
            Message us with your date, time and group size and we&apos;ll send a fixed price — usually
            within minutes. No booking fee, no deposit to hold a date.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={cta} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg")}>
              <WhatsAppIcon className="h-5 w-5" />
              Get my price on WhatsApp
            </a>
            <Link href="/#taxi" className={buttonClasses("outline", "lg")}>
              All taxi routes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
