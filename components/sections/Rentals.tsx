import { rentals } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";

export function Rentals() {
  return (
    <section id="rentals" className="section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Rentals"
          title="Explore at your own pace"
          subtitle="Scooters, tuk-tuks and bicycles — well-maintained, ready to ride, and delivered with a smile."
        />
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rentals.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
