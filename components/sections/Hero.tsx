"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Plane, Car, PawPrint, Bike, Compass, ShieldCheck, Clock, BadgeDollarSign, MapPinned, ChevronDown } from "lucide-react";
import { waEnquiry } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

// Vehicle + travel photos that float behind the hero — "taxi service in the background".
const backdrop = [
  { src: "/fleet/hiace-7.jpg", alt: "Taxi van", cls: "left-[49%] top-[8%] w-56 rotate-2 sm:w-64", delay: "0s" },
  { src: "/fleet/safari-jeep.jpg", alt: "Safari jeep", cls: "left-[72%] top-[44%] w-52 -rotate-3 sm:w-56", delay: "-1.4s" },
  { src: "/fleet/coaster.jpg", alt: "Coaster bus", cls: "left-[37%] top-[62%] w-52 rotate-3 hidden lg:block", delay: "-2.6s" },
  { src: "/fleet/taxi-prius.jpg", alt: "Prius car", cls: "left-[85%] top-[13%] w-48 -rotate-2 hidden lg:block", delay: "-3.6s" },
  { src: "/destinations/galle.jpg", alt: "Galle", cls: "left-[28%] top-[16%] w-44 -rotate-2 hidden xl:block", delay: "-4.6s" },
  { src: "/gallery/jeep-tourists-1.jpg", alt: "Happy guests", cls: "left-[61%] top-[75%] w-48 rotate-2 hidden lg:block", delay: "-5.4s" },
];

const quickPicks = [
  { label: "Airport Transfer", subject: "an airport transfer", Icon: Plane },
  { label: "Island Taxi", subject: "an island-wide taxi", Icon: Car },
  { label: "Safari", subject: "a wildlife safari", Icon: PawPrint },
  { label: "Rental", subject: "a scooter or tuk-tuk rental", Icon: Bike },
];

const trust = [
  { Icon: MapPinned, text: "All-island coverage" },
  { Icon: BadgeDollarSign, text: "Fixed fair prices" },
  { Icon: Clock, text: "24/7 on WhatsApp" },
  { Icon: ShieldCheck, text: "Safe & reliable" },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-[#03110b]"
    >
      {/* Floating vehicle-photo backdrop */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {backdrop.map((b) => (
          <div
            key={b.src}
            style={{ animationDelay: b.delay }}
            className={`animate-float-up absolute aspect-[4/3] overflow-hidden rounded-2xl opacity-40 shadow-2xl ring-1 ring-white/15 ${b.cls}`}
          >
            <Image src={b.src} alt={b.alt} fill sizes="256px" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Depth: glow orbs + subtle dot texture */}
      <div className="pointer-events-none absolute -right-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold-500/15 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-brand-500/25 blur-[100px]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:22px_22px]"
        aria-hidden
      />

      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/94 via-brand-950/72 to-brand-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-brand-950/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left: message */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur-sm"
          >
            <Compass className="h-4 w-4" />
            Cars · Vans · Coaches · Airport transfers
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 max-w-2xl font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-white text-balance sm:text-6xl lg:text-[4.1rem]"
          >
            Island-Wide <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">Taxi Service</span> &amp; Travels
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-base font-semibold text-gold-300 sm:text-lg">
            Travel anywhere in Sri Lanka — safe, door-to-door rides.
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
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

          {/* Trust strip */}
          <motion.ul variants={item} className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6">
            {trust.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-sm font-medium text-white/85">
                <Icon className="h-4 w-4 shrink-0 text-gold-400" />
                {text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: quick-book card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-brand-950/55 p-6 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-7">
            {/* gold top accent */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
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
                  className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white transition-colors hover:border-gold-400/60 hover:bg-white/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-gold-400 to-gold-600 text-brand-950 transition-transform group-hover:scale-110">
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

      {/* Scroll cue */}
      <a
        href="#taxi"
        aria-label="Scroll down"
        className="absolute bottom-5 left-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors hover:bg-white/10 lg:flex"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
