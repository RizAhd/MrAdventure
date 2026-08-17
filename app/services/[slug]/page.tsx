import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Info, MapPin } from "lucide-react";
import { allServices, serviceBySlug, relatedServices } from "@/data/services";
import { site } from "@/data/site";
import { waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { blurProps, externalLink } from "@/lib/utils";

const SITE_URL = "https://mradventure.lk";

/** Where each category sits in the breadcrumb trail. Both point at the hub —
 *  a breadcrumb should climb to a real page, not a home-page fragment. */
const categoryMeta = {
  safari: { label: "Safaris", href: "/services/" },
  rental: { label: "Rentals", href: "/services/" },
} as const;

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

// `params` is a Promise in Next 16 and must be awaited — reading it
// synchronously yields undefined and silently 404s every page.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};

  // `absolute` bypasses the root "%s | Mr Adventure Tours & Travels" template,
  // which would push these past the ~60 chars Google shows.
  const title =
    s.category === "safari"
      ? `${s.title} — Private Jeep & Guide, Arugam Bay`
      : `${s.title} in Arugam Bay — Daily & Weekly`;
  const description =
    s.category === "safari"
      ? `${s.title} from Arugam Bay with a private guide. ${s.features[1]}, hotel pickup, fixed price agreed up front. Rated 5.0 on Google — book on WhatsApp.`
      : `${s.title} in Arugam Bay, Sri Lanka. ${s.features[0]}, delivered to your guesthouse. Daily and weekly rates, no booking fee — quote on WhatsApp.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${s.slug}/` },
    openGraph: {
      title,
      description,
      url: `/services/${s.slug}/`,
      siteName: site.fullName,
      type: "website",
      images: [{ url: s.image, width: 1200, height: 800, alt: `${s.title} — Mr Adventure, Sri Lanka` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [s.image] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const cat = categoryMeta[s.category];
  const related = relatedServices(s.slug);
  const cta = waEnquiry(s.subject);

  /**
   * Service FAQs. Same reasoning as the route pages: these catch the
   * question-shaped searches the marketing copy above doesn't match. Answers
   * stay honest — no invented prices, and the permit answer says what the law
   * actually requires rather than what's convenient.
   */
  const faqs = [
    {
      q: `How much does ${s.title.toLowerCase()} cost?`,
      a: `It depends on how long you want it and how many of you there are, so we quote each booking individually rather than publishing one price. Message us on WhatsApp with your dates and group size and you'll get a fixed, all-in price — usually within minutes. No booking fee.`,
    },
    {
      q: `How do I book?`,
      a: `Entirely on WhatsApp — there's no form to fill in and no deposit to hold a date. Tell us what you want and when, we confirm availability and the price, and that's the booking. If plans change, message us as early as you can and we'll rearrange it.`,
    },
    {
      q: `Where do you pick up from?`,
      a:
        s.category === "safari"
          ? `We collect from wherever you're staying in and around Arugam Bay and drop you back afterwards. If you're further along the coast, tell us where and we'll let you know whether it works for the start time you want.`
          : `We deliver to your guesthouse in Arugam Bay and collect from the same place at the end of the hire, so you never have to go and fetch it.`,
    },
    s.category === "safari"
      ? {
          q: `Is it a private trip or shared with other guests?`,
          a: `Private. The jeep or boat is yours and your group's alone, and the start time is whatever suits you rather than a fixed departure. That's the main reason to book this rather than a seat on a scheduled tour.`,
        }
      : {
          q: `Do I need a licence or permit?`,
          a: `To drive legally in Sri Lanka you need a local recognition permit alongside your home licence or International Driving Permit — an IDP on its own isn't enough, and it matters for insurance if anything happens. Ask us when you book and we'll point you at the process. A bicycle needs nothing at all.`,
        },
    {
      q: `What should I bring?`,
      a: s.goodToKnow,
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${s.slug}/#service`,
    name: s.title,
    description: s.intro,
    url: `${SITE_URL}/services/${s.slug}/`,
    image: `${SITE_URL}${s.image}`,
    serviceType: s.category === "safari" ? "Wildlife safari tour" : "Vehicle rental",
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Place", name: s.area },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: cta,
      servicePhone: PHONE_TEL,
      availableLanguage: ["en"],
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="relative flex min-h-[58vh] items-end overflow-hidden bg-brand-950 pb-12 pt-28">
        <Image
          src={s.image}
          alt={`${s.title} — Mr Adventure, Sri Lanka`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
          {...blurProps(s.image)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-brand-950/20" />
        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: cat.label, href: cat.href },
              { label: s.title },
            ]}
          />

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            <MapPin className="h-3.5 w-3.5" />
            {s.area}
          </span>

          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
            {s.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{s.intro}</p>

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

      {/* Body copy + what's included */}
      <section className="section bg-sand">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
                {s.category === "safari"
                  ? `What to expect on the ${s.title}`
                  : // "Scooter Rent" → "Renting a scooter in Arugam Bay"
                    `Renting a ${s.title.replace(/ Rent$/, "").toLowerCase()} in Arugam Bay`}
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-ink/75">
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>

            <aside>
              <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-lg font-bold text-brand-950">What&apos;s included</h2>
                <ul className="mt-4 space-y-2.5">
                  {s.included.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      <span className="text-ink/75">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={cta} {...externalLink} className={buttonClasses("whatsapp", "md", "mt-6 w-full")}>
                  <WhatsAppIcon className="h-4 w-4" />
                  Get a price
                </a>
              </div>

              <div className="mt-5 rounded-3xl border border-gold-500/30 bg-gold-500/5 p-6">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brand-950">
                  <Info className="h-4 w-4 text-gold-600" />
                  Good to know
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{s.goodToKnow}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQs. Open <details> so the answers are in the visible DOM — FAQPage
          markup whose answers aren't on the page is a violation. */}
      <section className="section bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
            {s.title} — common questions
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-2xl border border-brand-100 bg-sand p-5 open:bg-white open:shadow-sm"
              >
                <summary className="cursor-pointer list-none font-display text-base font-semibold text-brand-900 marker:content-none sm:text-lg">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related services — internal linking */}
      {related.length > 0 && (
        <section className="section bg-sand">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
              Also worth doing
            </h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {related.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}/`}
                    prefetch={false}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-white px-4 py-3.5 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    <span className="min-w-0 text-sm font-medium text-brand-900">{o.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gold-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="section bg-brand-900 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready when you are</h2>
          <p className="mt-4 leading-relaxed text-white/75">
            Message us with your dates and group size and we&apos;ll come back with a fixed price,
            usually within minutes. No booking fee, no deposit to hold a date.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={cta} {...externalLink} className={buttonClasses("whatsapp", "lg")}>
              <WhatsAppIcon className="h-5 w-5" />
              Book on WhatsApp
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
    </>
  );
}
