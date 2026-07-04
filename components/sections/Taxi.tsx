import Image from "next/image";
import { Plane, Users, Car, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waEnquiry } from "@/lib/whatsapp";

const features = [
  { Icon: Plane, title: "Airport Drop & Pickup", text: "On-time transfers to and from Colombo (CMB) and Mattala airports." },
  { Icon: Users, title: "Share Taxi Service", text: "Split the cost with other travellers on popular island routes." },
  { Icon: Car, title: "Island-wide Coverage", text: "Cars, SUVs and vans for day trips or multi-day tours anywhere." },
];

const route = ["Arugam Bay", "Ella", "Pasikuda", "Trincomalee", "Dambulla", "Sigiriya"];

export function Taxi() {
  return (
    <section id="taxi" className="section relative overflow-hidden bg-brand-900 text-white">
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          align="left"
          eyebrow="All-Island Taxi"
          title="Anywhere on the island, anytime"
          subtitle="Safe, metered-fair rides across Sri Lanka — from a quick airport transfer to a full island road-trip."
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* Left: features + route + CTA */}
          <div>
            <div className="space-y-5">
              {features.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-brand-950">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/75">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">Popular routes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {route.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/90"
                  >
                    <MapPin className="h-3.5 w-3.5 text-gold-400" />
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <a
                href={waEnquiry("an island-wide taxi / airport transfer")}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("gold", "lg")}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Get a taxi quote
              </a>
            </Reveal>
          </div>

          {/* Right: image */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/fleet/van.jpg"
                  alt="Mr Adventure island-wide taxi van"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-brand-950/90 to-transparent p-5">
                <div>
                  <p className="font-display text-lg font-bold text-white">From Arugam Bay to anywhere</p>
                  <p className="text-sm text-white/75">Cars · SUVs · Vans · Group tours</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
