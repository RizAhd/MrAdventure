import { stats } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section className="bg-brand-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <dt className="font-display text-3xl font-extrabold text-gold-400 sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 text-sm font-medium uppercase tracking-wider text-white/70">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
