"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Plane, Car, PawPrint, Bike, Compass, Check, ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { waEnquiry } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

// Taxi-themed: the places we drive you to — "travel anywhere in Sri Lanka".
const slides = [
  { src: "/destinations/galle.jpg", alt: "Galle Fort lighthouse on the south coast" },
  { src: "/hero/sigiriya.jpg", alt: "Sigiriya Lion Rock fortress" },
  { src: "/hero/beach.jpg", alt: "Golden sunset over a Sri Lankan beach" },
  { src: "/destinations/kandy.jpg", alt: "The Temple of the Tooth in Kandy" },
  { src: "/destinations/ella-nine-arch.jpg", alt: "Nine Arch Bridge in the Ella hills" },
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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-950">
      {/* Rotating scenic background */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.3 }, scale: { duration: 6, ease: "linear" } }}
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Legibility overlays — neutral so the real photo colours show through */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left: message */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur-sm"
          >
            <Compass className="h-4 w-4" />
            Island-wide taxi · Airport transfers
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 max-w-2xl font-display text-[2.7rem] font-bold leading-[1.03] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
          >
            Sri Lanka, <span className="text-gold-400">door to door.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 text-base font-semibold text-gold-300 sm:text-lg">
            Travel anywhere in Sri Lanka — your island-wide Taxi Service.
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Reliable island-wide taxi &amp; airport transfers — cars, vans and mini-buses for any group
            size. Fixed fair prices, friendly local drivers, booked in seconds on WhatsApp.
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
          <div className="rounded-3xl border border-white/15 bg-brand-950/40 p-6 shadow-2xl backdrop-blur-md sm:p-7">
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

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 lg:left-8 lg:translate-x-0">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className={
              i === index
                ? "h-2 w-7 rounded-full bg-gold-400 transition-all"
                : "h-2 w-2 rounded-full bg-white/40 transition-all hover:bg-white/70"
            }
          />
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#taxi"
        aria-label="Scroll to taxi service"
        className="absolute bottom-5 right-5 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 lg:flex"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
