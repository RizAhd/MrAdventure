"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { MapPin, Navigation, Users, Compass, Star } from "lucide-react";
import { waLink, waEnquiry } from "@/lib/whatsapp";
import { destinations } from "@/data/destinations";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

const slides = [
  { src: "/destinations/galle.webp", alt: "Galle Fort lighthouse on the south coast" },
  { src: "/hero/beach.webp", alt: "Golden sunset over a Sri Lankan beach" },
  { src: "/hero/sigiriya.webp", alt: "Sigiriya Lion Rock fortress" },
  { src: "/destinations/ella-nine-arch.webp", alt: "Nine Arch Bridge in the Ella hills" },
];

const passengerOptions = ["1–2 passengers", "3–4 passengers", "5–7 passengers", "8–14 passengers", "15+ passengers"];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  const [index, setIndex] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pax, setPax] = useState(passengerOptions[0]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = ["Hi Mr Adventure! 👋 I'd like a taxi:"];
    if (from) lines.push(`• From: ${from}`);
    if (to) lines.push(`• To: ${to}`);
    lines.push(`• Passengers: ${pax}`, "", "Please share the fixed fare. Thank you!");
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-950">
      {/* Cinematic rotating background */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
        >
          <Image src={slides[index].src} alt={slides[index].alt} fill priority={index === 0} sizes="100vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-950/55 to-brand-950/90" />
      <div className="absolute inset-0 bg-brand-950/25" />

      {/* Centered content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-24 pt-28 text-center sm:px-6"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur-sm"
        >
          <Compass className="h-4 w-4" />
          Cars · Vans · Coaches · Island-wide
        </motion.span>

        <motion.h1
          variants={item}
          className="mx-auto mt-6 max-w-3xl font-display text-[2.6rem] font-bold leading-[1.03] tracking-tight text-white text-balance sm:text-6xl lg:text-[4.25rem]"
        >
          Island-Wide{" "}
          <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">Taxi Service</span>{" "}
          &amp; Travels
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          Tell us where you&apos;re headed — get a fixed, fair price on WhatsApp in minutes. Airport
          transfers, day trips and island-wide tours for any group size.
        </motion.p>

        {/* Booking bar */}
        <motion.form variants={item} onSubmit={submit} className="mx-auto mt-9 max-w-3xl">
          <div className="flex flex-col gap-1 rounded-3xl border border-white/60 bg-white/95 p-2 text-left shadow-2xl shadow-black/30 backdrop-blur sm:flex-row sm:items-stretch sm:gap-0 sm:rounded-full sm:divide-x sm:divide-brand-100">
            <label className="flex flex-1 items-center gap-2.5 rounded-2xl px-4 py-2.5 sm:rounded-none">
              <MapPin className="h-5 w-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink/50">Pickup</span>
                <input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="e.g. Colombo Airport"
                  className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink/40"
                />
              </span>
            </label>
            <label className="flex flex-1 items-center gap-2.5 rounded-2xl px-4 py-2.5 sm:rounded-none">
              <Navigation className="h-5 w-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink/50">Drop-off</span>
                <input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  list="hero-destinations"
                  placeholder="e.g. Ella"
                  className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink/40"
                />
                <datalist id="hero-destinations">
                  {destinations.map((d) => (
                    <option key={d.name} value={d.name} />
                  ))}
                </datalist>
              </span>
            </label>
            <label className="flex items-center gap-2.5 rounded-2xl px-4 py-2.5 sm:rounded-none">
              <Users className="h-5 w-5 shrink-0 text-brand-600" />
              <span className="flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink/50">Passengers</span>
                <select
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-ink outline-none"
                >
                  {passengerOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </span>
            </label>
            <button type="submit" className={buttonClasses("whatsapp", "lg", "shrink-0 sm:m-1")}>
              <WhatsAppIcon className="h-5 w-5" />
              Get my fare
            </button>
          </div>
        </motion.form>

        <motion.div variants={item} className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
            Fixed fair prices
          </span>
          <span>· No booking fee</span>
          <span>· Airport pickup &amp; drop</span>
          <span>· Replies in minutes</span>
        </motion.div>

        <motion.div variants={item} className="mt-6">
          <a
            href={waEnquiry("a booking")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gold-300 underline-offset-4 hover:underline"
          >
            or just message us on WhatsApp →
          </a>
        </motion.div>
      </motion.div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className={i === index ? "h-2 w-7 rounded-full bg-gold-400" : "h-2 w-2 rounded-full bg-white/40 hover:bg-white/70"}
          />
        ))}
      </div>
    </section>
  );
}
