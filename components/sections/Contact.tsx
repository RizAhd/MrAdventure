"use client";

import { useState } from "react";
import { MapPin, Phone, Send } from "lucide-react";
import { site } from "@/data/site";
import { allServices } from "@/data/services";
import { waBooking, waEnquiry, PHONE_TEL, PHONE_DISPLAY } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, TikTokIcon, GoogleMonoIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

const serviceOptions = [
  ...allServices.map((s) => s.title),
  "Island-wide Taxi",
  "Airport Transfer",
  "Other / not sure yet",
];

// Profiles with no URL yet are dropped rather than rendered as dead `href="#"`.
const socialLinks = [
  { href: site.socials.google, label: "Google Business Profile", Icon: GoogleMonoIcon },
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
].filter((s) => s.href);

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    service: serviceOptions[0],
    date: "",
    guests: "2",
    pickup: "",
    note: "",
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waBooking(form), "_blank", "noopener,noreferrer");
  };

  const fieldClass =
    "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";

  return (
    <section id="contact" className="section bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: info */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Let's plan your adventure"
              subtitle="Tell us what you'd like to do and we'll reply on WhatsApp with availability and the best price — usually within minutes."
            />

            <div className="mt-8 space-y-3">
              <a
                href={waEnquiry("a booking")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-whatsapp text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-ink/60">WhatsApp us</span>
                  <span className="block font-display font-bold text-brand-900">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <Phone className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-ink/60">Call us</span>
                  <span className="block font-display font-bold text-brand-900">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-brand-950">
                  <MapPin className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-ink/60">Based in</span>
                  <span className="block font-display font-bold text-brand-900">{site.location}</span>
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-semibold text-ink/60">Follow us:</span>
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-white transition-colors hover:bg-gold-500 hover:text-brand-950"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100">
              <iframe
                title="Arugam Bay, Sri Lanka map"
                src="https://www.google.com/maps?q=Arugam%20Bay%2C%20Sri%20Lanka&output=embed"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: quick-book form */}
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-brand-950/5 sm:p-8">
            <h3 className="font-display text-xl font-bold text-brand-900">Quick booking</h3>
            <p className="mt-1 text-sm text-ink/60">
              Fill this in and we&apos;ll open WhatsApp with your details ready to send.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-900">
                  Your name
                </label>
                <input id="name" type="text" value={form.name} onChange={update("name")} placeholder="e.g. Emma" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-brand-900">
                  Service
                </label>
                <select id="service" value={form.service} onChange={update("service")} className={fieldClass}>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-brand-900">
                    Date
                  </label>
                  <input id="date" type="date" value={form.date} onChange={update("date")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="guests" className="mb-1.5 block text-sm font-medium text-brand-900">
                    Guests
                  </label>
                  <input id="guests" type="number" min={1} value={form.guests} onChange={update("guests")} className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="pickup" className="mb-1.5 block text-sm font-medium text-brand-900">
                  Pickup / route <span className="text-ink/40">(optional)</span>
                </label>
                <input id="pickup" type="text" value={form.pickup} onChange={update("pickup")} placeholder="e.g. Arugam Bay → Ella" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-brand-900">
                  Anything else? <span className="text-ink/40">(optional)</span>
                </label>
                <textarea id="note" rows={3} value={form.note} onChange={update("note")} placeholder="Tell us about your plans…" className={fieldClass} />
              </div>
              <button type="submit" className={buttonClasses("whatsapp", "lg", "w-full")}>
                <Send className="h-5 w-5" />
                Send on WhatsApp
              </button>
              <p className="text-center text-xs text-ink/50">
                No account needed — this opens WhatsApp with your message pre-filled.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
