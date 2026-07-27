import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { blurProps } from "@/lib/utils";

export function Destinations() {
  return (
    <section id="destinations" className="section bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Destinations"
          title="Where we'll take you"
          subtitle="From east-coast surf to misty hill country and ancient rock fortresses — we cover the whole island."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.1}>
              {/* Links to the destination page rather than straight to WhatsApp:
                  gives crawlers an internal link and gives visitors the detail
                  before they commit to a message. The CTA lives on that page. */}
              <Link
                href={`/destinations/${d.slug}/`}
                className="group relative block h-80 overflow-hidden rounded-3xl shadow-sm ring-1 ring-brand-950/5 transition-transform duration-200 active:scale-[0.98]"
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  {...blurProps(d.image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
                <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-gold-500 text-brand-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl font-bold text-white drop-shadow">{d.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">{d.blurb}</p>
                  <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-widest text-gold-300">
                    Explore {d.name} →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
