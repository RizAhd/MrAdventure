import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * SAMPLE testimonials — placeholder content for layout only.
 * Replace with real guest reviews (e.g. from Google / TripAdvisor) before publishing.
 */
const reviews = [
  { name: "Emma", country: "United Kingdom", text: "Saw a leopard AND elephants on our Kumana safari. Our guide was incredible — best day of our whole Sri Lanka trip!" },
  { name: "Lukas", country: "Germany", text: "Rented scooters for a week. Bikes were spotless, price was fair and pickup was so easy. Highly recommend." },
  { name: "Sophie", country: "France", text: "The lagoon boat safari at sunset was magical. So many birds and crocodiles. Felt safe the entire time." },
  { name: "Daniel", country: "Australia", text: "Booked an airport pickup and a few island transfers. Always on time, clean van, lovely driver. Faultless." },
  { name: "Marta", country: "Poland", text: "We messaged on WhatsApp and everything was sorted in minutes. Genuinely friendly, genuinely helpful people." },
  { name: "Noah", country: "Netherlands", text: "Tuk-tuk road trip from Arugam Bay to Ella — unforgettable. Mr Adventure made the whole thing effortless." },
];

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="w-[19rem] shrink-0 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-950/5">
      <div className="flex gap-0.5 text-gold-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-ink/80">“{r.text}”</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-brand-900">
        {r.name} <span className="font-normal text-ink/50">· {r.country}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const loop = [...reviews, ...reviews];
  return (
    <section className="section bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Reviews" title="Travellers love Mr Adventure" />
      </div>
      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max gap-5 pl-5 animate-marquee pause-on-hover">
          {loop.map((r, i) => (
            <Card key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
