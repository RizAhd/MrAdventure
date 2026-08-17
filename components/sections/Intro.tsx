import { MapPin, Clock, BadgeDollarSign } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/**
 * Long-form intro copy. The rest of the page is cards, chips and one-line
 * subtitles, which left the home page with almost no prose to match its own
 * title and H1 — "cab" appeared exactly once on the page, inside the H1. This
 * section carries the plain-English description of the service so the words
 * customers actually search for exist in real sentences, not just headings.
 */
export function Intro() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-[1.12] text-brand-950 text-balance sm:text-4xl">
            A Sri Lanka taxi and cab service that covers the whole island
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/75 sm:text-lg">
            <p>
              Mr Adventure is a locally run taxi and cab service based in Arugam Bay, driving the
              full length of Sri Lanka. We pick up from Colombo and Negombo on the west coast,
              run the hill country between Kandy, Nuwara Eliya and Ella, and cover the southern
              beaches from Bentota through Galle and Mirissa down to Yala — as well as
              Trincomalee and Pasikuda in the north-east.
            </p>
            <p>
              Airport pickup and drop is what we do most. Colombo (CMB) and Mattala (HRI)
              transfers run around the clock — share your flight number and we&apos;ll track it, so
              a delayed landing at 3am still means a driver waiting in arrivals with a name board,
              at no extra charge. Beyond airport runs, the same cabs handle one-way intercity
              trips, day excursions and multi-day tours with a driver who stays with you.
            </p>
            <p>
              Every price is fixed and agreed on WhatsApp before you travel. No meters, no
              booking fee, and no renegotiating at the destination — you get one quote for your
              exact route, vehicle and group size, usually within minutes of messaging us. With
              cars, vans and a 27-seat coach on the fleet, the same applies whether you are
              travelling solo or moving a whole wedding party.
            </p>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { Icon: MapPin, term: "Service area", desc: site.serviceArea },
              { Icon: Clock, term: "Availability", desc: "24/7, including airport runs" },
              { Icon: BadgeDollarSign, term: "Pricing", desc: "Fixed up front, no booking fee" },
            ].map(({ Icon, term, desc }) => (
              <div
                key={term}
                className="rounded-2xl border border-brand-100 bg-sand px-4 py-3.5"
              >
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-700">
                  <Icon className="h-4 w-4 text-gold-500" />
                  {term}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-brand-950">{desc}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
