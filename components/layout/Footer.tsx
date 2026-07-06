import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { allServices } from "@/data/services";
import { waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/icons";

const socialLinks = [
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-gold-500/70 shadow-md">
              <Image src="/logos/logo-badge.png" alt={site.fullName} fill sizes="48px" className="object-cover" />
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
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-brand-950"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-gold-400">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {allServices.map((s) => (
              <li key={s.slug}>
                <a
                  href={waEnquiry(s.subject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-400"
                >
                  {s.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#taxi" className="transition-colors hover:text-gold-400">
                Island-wide Taxi
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3.5 text-sm">
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
                target="_blank"
                rel="noopener noreferrer"
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
      </div>
    </footer>
  );
}
