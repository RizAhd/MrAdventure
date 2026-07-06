"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waEnquiry } from "@/lib/whatsapp";

export const faqs = [
  {
    q: "How much does a taxi or airport transfer cost?",
    a: "Prices depend on the route, the vehicle and how many passengers you are. Message us on WhatsApp with your pickup, drop-off and dates and we'll send a fixed, fair quote — usually within minutes. No hidden fees, no surge pricing.",
  },
  {
    q: "Do you offer airport pickup and drop-off?",
    a: "Yes — 24/7 transfers to and from Colombo (CMB) and Mattala (HRI) airports. Your driver meets you at arrivals with a name board and helps with your luggage.",
  },
  {
    q: "How do I pay? Is a deposit required?",
    a: "Simple and flexible — many guests pay 50% at the start of the trip and the balance at the end. Cash (LKR) is easiest; we'll confirm everything on WhatsApp when you book.",
  },
  {
    q: "How many passengers and how much luggage can you take?",
    a: "Everything from a car (1–3) up to a 14-seater HiAce van and a 27-seat Coaster bus. Tell us your group size and luggage and we'll send the right vehicle. Child seats available on request.",
  },
  {
    q: "What happens if my flight is delayed?",
    a: "No problem — share your flight number when you book and we'll track it and adjust the pickup time automatically, at no extra charge.",
  },
  {
    q: "Can I change or cancel my booking?",
    a: "Yes. Plans change — just message us on WhatsApp as early as you can and we'll happily rearrange or cancel. We keep it fair and friendly.",
  },
  {
    q: "Do you also do day trips, safaris and multi-day tours?",
    a: "Absolutely. Beyond taxi transfers we run wildlife safaris, scooter & tuk-tuk rentals, and fully custom island-wide tours. Tell us your plans and we'll build an itinerary around them.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-sand">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="Everything you need to know about booking a ride with Mr Adventure. Still unsure? Just message us."
        />

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={(i % 4) * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-base font-semibold text-brand-900 sm:text-lg">{f.q}</span>
                    <ChevronDown
                      className={cn("h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300", isOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ink/75">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-9 text-center">
          <a
            href={waEnquiry("a booking")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("whatsapp", "md")}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Still have a question? Ask us
          </a>
        </div>
      </div>
    </section>
  );
}
