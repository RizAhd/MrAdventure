import { Globe } from "@/components/ui/cobe-globe";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waEnquiry } from "@/lib/whatsapp";

// [lat, lon] — Colombo is our hub; the rest are where our guests travel from.
const markers = [
  { id: "colombo", location: [6.9271, 79.8612] as [number, number], label: "Colombo" },
  { id: "london", location: [51.5074, -0.1278] as [number, number], label: "London" },
  { id: "newyork", location: [40.7128, -74.006] as [number, number], label: "New York" },
  { id: "la", location: [34.0522, -118.2437] as [number, number], label: "Los Angeles" },
  { id: "paris", location: [48.8566, 2.3522] as [number, number], label: "Paris" },
  { id: "berlin", location: [52.52, 13.405] as [number, number], label: "Berlin" },
  { id: "moscow", location: [55.7558, 37.6173] as [number, number], label: "Moscow" },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "singapore", location: [1.3521, 103.8198] as [number, number], label: "Singapore" },
  { id: "tokyo", location: [35.6762, 139.6503] as [number, number], label: "Tokyo" },
  { id: "sydney", location: [-33.8688, 151.2093] as [number, number], label: "Sydney" },
  { id: "melbourne", location: [-37.8136, 144.9631] as [number, number], label: "Melbourne" },
];

export function Worldwide() {
  return (
    <section
      id="worldwide"
      className="section relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white"
    >
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8">
        {/* Left: message */}
        <div>
          <SectionHeading
            light
            align="left"
            eyebrow="Loved worldwide"
            title="Guests from around the world"
            subtitle="Travellers from every corner of the globe explore Sri Lanka with Mr Adventure — from airport pickup to their very last mile. Wherever you're flying in from, we'll be ready."
          />
          <Reveal delay={0.1} className="mt-8">
            <a
              href={waEnquiry("a booking (planning a trip to Sri Lanka)")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("gold", "lg")}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Plan your Sri Lanka trip
            </a>
          </Reveal>
        </div>

        {/* Right: interactive globe */}
        <Reveal delay={0.1} className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <Globe markers={markers} className="mx-auto" />
            <p className="mt-4 text-center text-xs font-medium uppercase tracking-widest text-white/50">
              Drag to spin · based in Sri Lanka 🇱🇰
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
