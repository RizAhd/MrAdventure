import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { destinations, destinationBySlug } from "@/data/destinations";
import { routes } from "@/data/routes";
import { site } from "@/data/site";
import { waEnquiry } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { blurProps } from "@/lib/utils";

const SITE_URL = "https://mradventure.lk";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

// Next 16 passes `params` as a Promise — must be awaited (see the route page).
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = destinationBySlug(slug);
  if (!d) return {};
  // `absolute` bypasses the root title template — see the route page.
  const title = `${d.name} Taxi & Transfers | Mr Adventure Sri Lanka`;
  const description = `${d.blurb} Private taxi and airport transfers to ${d.name} with Mr Adventure — cars, vans and coaches, fixed fair prices, 24/7.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/destinations/${d.slug}/` },
    openGraph: {
      title,
      description,
      url: `/destinations/${d.slug}/`,
      siteName: site.fullName,
      type: "website",
      images: [{ url: d.image, width: 1200, height: 800, alt: `${d.name}, Sri Lanka` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [d.image] },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = destinationBySlug(slug);
  if (!d) notFound();

  // Transfers that start or end here — real internal links, not a generic list.
  const linked = routes.filter((r) => r.fromShort === d.name || r.toShort === d.name);
  const others = destinations.filter((x) => x.slug !== d.slug).slice(0, 6);
  const cta = waEnquiry(`a trip to ${d.name}`);

  const ld = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.blurb,
    url: `${SITE_URL}/destinations/${d.slug}/`,
    image: `${SITE_URL}${d.image}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: d.region,
      addressCountry: "LK",
    },
    touristType: ["Leisure travellers", "Families", "Surfers", "Wildlife enthusiasts"],
    includesAttraction: d.highlights.map((h) => ({ "@type": "TouristAttraction", name: h })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* Hero image */}
      <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-brand-950 pb-12 pt-28">
        <Image
          src={d.image}
          alt={`${d.name}, Sri Lanka`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          {...blurProps(d.image)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-brand-950/30" />
        <div className="relative mx-auto w-full max-w-5xl px-4 text-white sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Destinations", href: "/#destinations" },
              { label: d.name },
            ]}
          />
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            <MapPin className="h-3.5 w-3.5" />
            {d.region}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
            {d.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{d.blurb}</p>
        </div>
      </section>

      {/* Body + highlights */}
      <section className="section bg-sand">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
                About {d.name}
              </h2>
              {d.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-ink/75">
                  {p}
                </p>
              ))}

              <h2 className="mt-10 font-display text-2xl font-bold text-brand-950 sm:text-3xl">
                Getting to {d.name}
              </h2>
              <p className="mt-4 leading-relaxed text-ink/75">{d.gettingThere}</p>
            </div>

            <aside className="lg:col-span-1">
              <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-lg font-bold text-brand-900">Don&apos;t miss</h2>
                <ul className="mt-4 space-y-2.5">
                  {d.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm">
                      <Star className="mt-0.5 h-4 w-4 shrink-0 fill-gold-500 text-gold-500" />
                      <span className="text-ink/75">{h}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("whatsapp", "md", "mt-6 w-full")}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Plan a trip here
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Transfers to/from here */}
      {linked.length > 0 && (
        <section className="section bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
              Taxi transfers to and from {d.name}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
              Fixed-price private transfers, quoted per trip. Tap a route for details.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {linked.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/taxi/${r.slug}/`}
                    prefetch={false}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-sand px-4 py-3.5 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    <span className="text-sm font-medium text-brand-900">
                      {r.fromShort} <span className="text-gold-600">→</span> {r.toShort}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gold-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Other destinations */}
      <section className="section bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">Where else we go</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/destinations/${o.slug}/`}
                prefetch={false}
                className="group relative block h-44 overflow-hidden rounded-2xl ring-1 ring-brand-950/5"
              >
                <Image
                  src={o.image}
                  alt={o.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  {...blurProps(o.image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-display text-lg font-bold text-white">
                  {o.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/#destinations" className={buttonClasses("outline", "md")}>
              See all destinations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
