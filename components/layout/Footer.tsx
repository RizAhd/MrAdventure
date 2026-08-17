import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { allServices } from "@/data/services";
import { waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { externalLink } from "@/lib/utils";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, TikTokIcon, GoogleMonoIcon } from "@/components/ui/icons";

// Profiles with no URL yet are dropped rather than rendered as dead `href="#"`.
const socialLinks = [
  { href: site.socials.google, label: "Google Business Profile", Icon: GoogleMonoIcon },
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-gold-500/70 shadow-md">
              <Image src="/logos/logo-badge.webp" alt={site.fullName} fill sizes="48px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-extrabold text-white">Mr Adventure</span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-400">
                Tours &amp; Travels
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.blurb}</p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                {...externalLink}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-brand-950"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore. The column labels are nav group names, not document
            headings — as <h3> they had no parent <h2> in the footer and
            orphaned onto whatever section heading came last on the page. */}
        <nav aria-labelledby="footer-explore">
          <p id="footer-explore" className="font-display text-sm font-bold uppercase tracking-widest text-white">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {/* Section hubs first — real pages, and the only place in the global
                chrome that links to them. The rest are home-page anchors. */}
            {[
              { href: "/taxi/", label: "All taxi routes" },
              { href: "/destinations/", label: "All destinations" },
              { href: "/services/", label: "Safaris & rentals" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} prefetch={false} className="transition-colors hover:text-gold-400">
                  {item.label}
                </Link>
              </li>
            ))}
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-gold-400">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-labelledby="footer-services">
          <p id="footer-services" className="font-display text-sm font-bold uppercase tracking-widest text-white">
            Services
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {/* Internal links to the service pages rather than six more wa.me
                links — better for crawlers, and it stops the footer alone
                accounting for a sixth of the page's outbound links. */}
            {allServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/`}
                  prefetch={false}
                  className="transition-colors hover:text-gold-400"
                >
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <a href="#taxi" className="transition-colors hover:text-gold-400">
                Island-wide Taxi
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p id="footer-contact" className="font-display text-sm font-bold uppercase tracking-widest text-white">
            Get in touch
          </p>
          <ul aria-labelledby="footer-contact" className="mt-4 space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              <span>{site.location}</span>
            </li>
            <li>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 transition-colors hover:text-gold-400">
                <Phone className="h-5 w-5 shrink-0 text-gold-400" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={waEnquiry("a booking")}
                {...externalLink}
                className="flex items-center gap-3 transition-colors hover:text-gold-400"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0 text-gold-400" />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Tagline + copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-semibold uppercase tracking-widest text-gold-400">{site.tagline}</p>
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
        </div>
        {/* extra bottom pad on mobile so the floating corner buttons clear the footer text */}
        <div className="pb-28 text-center text-[0.7rem] text-white/55 lg:pb-5">
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/riflan/"
            {...externalLink}
            className="font-medium text-white/75 underline-offset-2 transition-colors hover:text-gold-400 hover:underline"
          >
            Riflan Mohamed
          </a>
        </div>
      </div>
    </footer>
  );
}
