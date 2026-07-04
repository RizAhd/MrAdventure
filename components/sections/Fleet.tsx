"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fleet } from "@/data/fleet";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waEnquiry } from "@/lib/whatsapp";

export function Fleet() {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="fleet" className="section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Our Fleet"
            title="Ride in comfort"
            subtitle="Clean, well-maintained vehicles for every kind of trip — from open safari jeeps to spacious tour vans."
          />
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-200 text-brand-700 transition-colors hover:bg-brand-700 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-200 text-brand-700 transition-colors hover:bg-brand-700 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={track}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {fleet.map((v) => (
            <article
              key={v.name}
              className="group w-[17rem] shrink-0 snap-start overflow-hidden rounded-3xl bg-sand shadow-sm ring-1 ring-brand-950/5 sm:w-[19rem]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  sizes="304px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-brand-900">{v.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{v.note}</p>
                <a
                  href={waEnquiry(v.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-whatsapp-dark hover:underline"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Enquire
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={waEnquiry("your vehicle fleet")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "md")}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Ask about our fleet
          </a>
        </div>
      </div>
    </section>
  );
}
