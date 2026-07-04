"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Compass } from "lucide-react";
import { site } from "@/data/site";
import { waEnquiry } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

const pills = site.tagline.split(" · ");

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <Image
        src="/gallery/leopard-1.jpg"
        alt="Sri Lankan leopard in the wild"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/55 to-brand-900/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/40" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 backdrop-blur-sm"
        >
          <Compass className="h-4 w-4" />
          {site.location}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
        >
          Chase leopards. Ride the coast.{" "}
          <span className="text-gold-400">Roam the island.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          Kumana &amp; lagoon safaris, scooter &amp; tuk-tuk rentals, and reliable island-wide taxi —
          with local experts who know every hidden corner of Sri Lanka.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={waEnquiry("a booking")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("whatsapp", "lg")}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book on WhatsApp
          </a>
          <a href="#safaris" className={buttonClasses("outline", "lg")}>
            Explore Safaris
          </a>
        </motion.div>

        <motion.ul variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {pills.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm font-medium text-white/90">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                <Check className="h-4 w-4" />
              </span>
              {p}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
