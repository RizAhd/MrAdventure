import { safaris } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";

export function Safaris() {
  return (
    <section id="safaris" className="section bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Wildlife Safaris"
          title="Get closer to the wild"
          subtitle="Leopards, elephants, crocodiles and hundreds of birds — guided by locals who know exactly where to look."
        />
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {safaris.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
