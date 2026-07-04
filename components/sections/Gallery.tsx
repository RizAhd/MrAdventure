"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <section id="gallery" className="section bg-brand-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Real moments, real adventures"
          subtitle="Every photo here is from an actual Mr Adventure trip — the wildlife, the water, and the smiles."
        />

        <div className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {gallery.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-brand-950/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-brand-950/0 transition-colors group-hover:bg-brand-950/15" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/95 p-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next"
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            <motion.figure
              key={gallery[index].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[80vh] w-[92vw] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[index].src}
                alt={gallery[index].alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
              <figcaption className="absolute inset-x-0 -bottom-9 text-center text-sm text-white/80">
                {gallery[index].alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
