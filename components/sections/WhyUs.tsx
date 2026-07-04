import { MapPinned, BadgeDollarSign, MessageCircle, ShieldCheck, CalendarClock, Heart } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { Icon: MapPinned, title: "Local expert guides", text: "Born-and-raised guides who know the wildlife, the roads and the secret spots." },
  { Icon: BadgeDollarSign, title: "Best, honest prices", text: "Fair fixed rates with no hidden fees — quoted clearly before you book." },
  { Icon: MessageCircle, title: "24/7 WhatsApp support", text: "Message anytime and get a fast, friendly reply from a real person." },
  { Icon: ShieldCheck, title: "Safe & reliable", text: "Well-maintained vehicles, careful drivers and safety gear provided." },
  { Icon: CalendarClock, title: "Flexible & custom", text: "Mix safaris, rentals and transfers into a trip that fits your plans." },
  { Icon: Heart, title: "Loved by travellers", text: "Guests from around the world return and recommend us to friends." },
];

export function WhyUs() {
  return (
    <section id="why" className="section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Mr Adventure"
          title="Local experts who go the extra mile"
          subtitle="We treat every guest like a friend visiting our island — that's the Mr Adventure difference."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl border border-brand-100 bg-sand p-7 transition-shadow hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
