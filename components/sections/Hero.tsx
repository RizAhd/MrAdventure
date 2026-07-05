"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Plane, Car, PawPrint, Bike, Compass, Check } from "lucide-react";
import { site } from "@/data/site";
import { waEnquiry } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

// Vehicle + travel photos that float behind the hero — "taxi service in the background".
const backdrop = [
  { src: "/fleet/hiace-7.jpg", alt: "Taxi van", cls: "left-[50%] top-[9%] w-60 rotate-2 sm:w-64", delay: "0s" },
  { src: "/fleet/safari-jeep.jpg", alt: "Safari jeep", cls: "left-[71%] top-[45%] w-52 -rotate-3 sm:w-56", delay: "-1.4s" },
  { src: "/fleet/coaster.jpg", alt: "Coaster bus", cls: "left-[38%] top-[60%] w-52 rotate-3 hidden lg:block", delay: "-2.6s" },
  { src: "/fleet/taxi-prius.jpg", alt: "Prius car", cls: "left-[84%] top-[14%] w-48 -rotate-2 hidden lg:block", delay: "-3.6s" },
  { src: "/destinations/galle.jpg", alt: "Galle", cls: "left-[29%] top-[18%] w-44 -rotate-2 hidden xl:block", delay: "-4.6s" },
  { src: "/gallery/jeep-tourists-1.jpg", alt: "Happy guests", cls: "left-[60%] top-[74%] w-48 rotate-2 hidden lg:block", delay: "-5.4s" },
];

const quickPicks = [
  { label: "Airport Transfer", subject: "an airport transfer", Icon: Plane },
  { label: "Island Taxi", subject: "an island-wide taxi", Icon: Car },
  { label: "Safari", subject: "a wildlife safari", Icon: PawPrint },
  { label: "Rental", subject: "a scooter or tuk-tuk rental", Icon: Bike },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-[#04140d]"
    >
      {/* Floating vehicle-photo backdrop */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {backdrop.map((b) => (
          <div
            key={b.src}
            style={{ animationDelay: b.delay }}
            className={`animate-float-up absolute aspect-[4/3] overflow-hidden rounded-2xl opacity-[0.42] shadow-2xl ring-1 ring-white/10 blur-[0.5px] ${b.cls}`}
          >
            <Image src={b.src} alt={b.alt} fill sizes="256px" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-950/70 to-brand-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-brand-950/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left: message */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur-sm"
          >
            <Compass className="h-4 w-4" />
            Cars · Vans · Coaches · Airport transfers
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 max-w-2xl font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.75rem]"
          >
            Island-Wide <span className="text-gold-400">Taxi Service</span> &amp; Travels
          </motion.h1>

          <motion.p variants={item} className="mt-4 text-base font-semibold text-gold-300 sm:text-lg">
            Travel anywhere in Sri Lanka — safe, door-to-door rides.
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Reliable island-wide taxi &amp; airport transfers for any group size — plus wildlife safaris
            and scooter &amp; tuk-tuk rentals. Fixed fair prices, booked in seconds on WhatsApp.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={waEnquiry("an island-wide taxi / airport transfer")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("whatsapp", "lg")}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Book a taxi on WhatsApp
            </a>
            <a href="#fleet" className={buttonClasses("outline", "lg")}>
              See the fleet
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {site.tagline.split(" · ").map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-white/90">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                  <Check className="h-4 w-4" />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: quick-book card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="rounded-3xl border border-white/15 bg-brand-950/50 p-6 shadow-2xl backdrop-blur-md sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">Book your ride</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-white">Where can we take you?</h2>
            <p className="mt-1.5 text-sm text-white/70">
              Tap a service — we&apos;ll reply on WhatsApp within minutes.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {quickPicks.map(({ label, subject, Icon }) => (
                <a
                  key={label}
                  href={waEnquiry(subject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white transition-colors hover:border-gold-400/50 hover:bg-white/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500/90 text-brand-950 transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold leading-tight">{label}</span>
                </a>
              ))}
            </div>

            <a
              href={waEnquiry("a booking")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("whatsapp", "lg", "mt-4 w-full")}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Message us on WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-white/60">
              No booking fee · Friendly local team · Fast replies
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
