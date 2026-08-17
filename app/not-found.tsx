import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waEnquiry } from "@/lib/whatsapp";
import { externalLink } from "@/lib/utils";
import { routes } from "@/data/routes";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Mr Adventure Tours & Travels" },
  // A 404 should never be indexed, and the static export serves this as
  // 404.html rather than with a real 404 status, so the meta tag is the only
  // signal crawlers get.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  // A handful of the most-searched transfers, so the page is a way back into
  // the site rather than a dead end.
  const popular = routes.slice(0, 6);

  return (
    <>
      {/* Dark hero. The Navbar is transparent with white text until you scroll
          past 24px, so any page whose first section is light renders the nav
          links invisible — every other page opens on a dark hero for exactly
          this reason. */}
      <section className="relative overflow-hidden bg-brand-900 pb-16 pt-32 text-white sm:pt-36">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            <Compass className="h-4 w-4" />
            404
          </span>

          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.1] text-balance sm:text-4xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            The link may be out of date. Head back to the home page, pick one of the popular
            transfers below, or just message us and we&apos;ll quote your trip directly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className={buttonClasses("gold", "md")}>
              Back to home
            </Link>
            <a href={waEnquiry("a booking")} {...externalLink} className={buttonClasses("whatsapp", "md")}>
              <WhatsAppIcon className="h-5 w-5" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-700">
            Popular transfers
          </h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {popular.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/taxi/${r.slug}/`}
                  prefetch={false}
                  className="block rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm font-medium text-brand-900 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  {r.from} <span className="text-gold-600">→</span> {r.to}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
