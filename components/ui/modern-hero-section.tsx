import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type CollagePhoto = { src: string; alt: string };

interface HeroCollageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
  photos: CollagePhoto[];
  title?: React.ReactNode;
  subtitle?: string;
  stats?: { value: string; label: string }[];
  /** Called with the photo index when a collage image is tapped. */
  onSelect?: (index: number) => void;
}

// Position + size for each of the 7 floating cards. Delays stagger the float.
const slots = [
  { pos: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", w: "w-[300px]", aspect: "aspect-[3/4]", z: "z-20", delay: "0s" },
  { pos: "left-[19%] top-[13%]", w: "w-52", aspect: "aspect-[4/5]", z: "z-10", delay: "-1.2s" },
  { pos: "right-[21%] top-[8%]", w: "w-48", aspect: "aspect-[4/5]", z: "z-10", delay: "-2.5s" },
  { pos: "right-[17%] bottom-[10%]", w: "w-60", aspect: "aspect-[4/3]", z: "z-30", delay: "-3.5s" },
  { pos: "right-[3%] top-1/2 -translate-y-[62%]", w: "w-52", aspect: "aspect-[3/4]", z: "z-10", delay: "-4.8s" },
  { pos: "left-[15%] bottom-[6%]", w: "w-56", aspect: "aspect-[4/3]", z: "z-30", delay: "-5.2s" },
  { pos: "left-[3%] top-[22%]", w: "w-48", aspect: "aspect-[3/4]", z: "z-10", delay: "-6s" },
];

const HeroCollage = React.forwardRef<HTMLDivElement, HeroCollageProps>(
  ({ className, photos, title, subtitle, stats, onSelect, ...props }, ref) => {
    const displayPhotos = photos.slice(0, 7);

    return (
      <div ref={ref} className={cn("relative w-full font-sans", className)} {...props}>
        {(title || subtitle) && (
          <div className="container relative z-10 mx-auto px-4 text-center">
            {title && (
              <h2 className="font-display text-4xl font-bold tracking-tight text-brand-950 md:text-5xl">{title}</h2>
            )}
            {subtitle && <p className="mx-auto mt-4 max-w-2xl text-base text-ink/70 md:text-lg">{subtitle}</p>}
          </div>
        )}

        {/* Floating collage */}
        <div className="relative z-0 flex h-[600px] items-center justify-center">
          <div className="relative h-full w-full max-w-6xl">
            {displayPhotos.map((photo, i) => {
              const s = slots[i];
              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => onSelect?.(i)}
                  aria-label={`Open photo: ${photo.alt}`}
                  style={{ animationDelay: s.delay }}
                  className={cn(
                    "absolute animate-float-up overflow-hidden rounded-2xl shadow-xl ring-1 ring-brand-950/10 transition-transform duration-300 hover:z-40 hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                    s.pos,
                    s.w,
                    s.aspect,
                    s.z,
                  )}
                >
                  <Image src={photo.src} alt={photo.alt} fill sizes="300px" className="object-cover" />
                </button>
              );
            })}
          </div>
        </div>

        {stats && stats.length > 0 && (
          <div className="container relative z-10 mx-auto mt-12 px-4">
            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-4xl font-bold tracking-tight text-gold-600">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-ink/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

HeroCollage.displayName = "HeroCollage";

export { HeroCollage };
