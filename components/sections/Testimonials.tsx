import { Star, Quote, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoogleIcon } from "@/components/ui/icons";
import { reviews, googleRating, type Review } from "@/data/reviews";
import { site } from "@/data/site";

const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

/** Initials for the avatar disc — "Michiel De Smet" → "MD". */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

/** Deterministic avatar tint so the same guest always gets the same colour. */
const tints = [
  "from-brand-500 to-brand-700",
  "from-gold-400 to-gold-600",
  "from-brand-600 to-brand-800",
  "from-gold-500 to-brand-600",
];
const tintFor = (name: string) =>
  tints[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % tints.length];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < rating ? "h-4 w-4 fill-gold-500 text-gold-500" : "h-4 w-4 text-brand-200"}
          aria-hidden
        />
      ))}
    </div>
  );
}

function Card({ r }: { r: Review }) {
  return (
    <figure className="group/card relative flex w-[20rem] shrink-0 flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-brand-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-gold-500/40 sm:w-[21rem]">
      {/* Gold hairline that wipes in on hover */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-gold-600 transition-transform duration-500 group-hover/card:scale-x-100" />

      {/* Oversized watermark glyph, low and right so it fills the dead space on
          short reviews instead of crowding the Google mark up top. */}
      <Quote
        className="pointer-events-none absolute -bottom-5 -right-4 h-28 w-28 rotate-180 text-brand-950/[0.04]"
        aria-hidden
      />

      <div className="relative flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tintFor(
            r.name,
          )} font-display text-sm font-bold text-white shadow-sm`}
          aria-hidden
        >
          {initials(r.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate font-display text-sm font-bold text-brand-900">{r.name}</span>
            {r.localGuide && <BadgeCheck className="h-4 w-4 shrink-0 text-brand-500" aria-label="Google Local Guide" />}
          </span>
          <span className="block text-xs text-ink/50">
            {r.localGuide ? "Local Guide · " : ""}
            {monthYear(r.date)}
          </span>
        </span>
        <GoogleIcon className="h-5 w-5 shrink-0" />
      </div>

      <div className="relative mt-4">
        <Stars rating={r.rating} />
        <blockquote className="mt-3 text-[0.9375rem] leading-relaxed text-ink/80">
          &ldquo;{r.text}&rdquo;
        </blockquote>
        {/* Reviews left in another language: original above, English below. */}
        {r.translation && (
          <p className="mt-2.5 border-l-2 border-brand-100 pl-3 text-xs leading-relaxed text-ink/45">
            <span className="font-semibold uppercase tracking-wider text-ink/55">Translated</span> — {r.translation}
          </p>
        )}
      </div>

      <figcaption className="relative mt-auto flex items-center justify-between gap-2 pt-5">
        {r.service ? (
          <span className="truncate rounded-full bg-brand-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-brand-700">
            {r.service}
          </span>
        ) : (
          <span />
        )}
        <span className="shrink-0 text-[0.6875rem] font-medium text-ink/40">Posted on Google</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // The marquee animates translateX(-50%), so the strip must (a) be wider than
  // the widest viewport and (b) contain an EVEN number of copies — otherwise
  // the halfway point isn't a copy boundary and the loop visibly jumps.
  // Each card is ~21rem + 1.25rem gap ≈ 356px.
  const perHalf = Math.max(1, Math.ceil(2200 / (reviews.length * 356)));
  const loop = Array.from({ length: perHalf * 2 }, () => reviews).flat();

  return (
    <section id="reviews" className="section relative overflow-hidden bg-sand">
      {/* soft brand glow behind the rail */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-brand-500/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title="Rated 5.0 by travellers on Google"
          subtitle="Every review below is a real, verified review from our Google Business Profile — nothing here is written by us."
        />

        {/* Rating summary */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 rounded-full border border-brand-100 bg-white/80 px-5 py-3 shadow-sm backdrop-blur-sm">
            <GoogleIcon className="h-6 w-6" />
            <span className="font-display text-2xl font-extrabold leading-none text-brand-900">
              {googleRating.average.toFixed(1)}
            </span>
            <Stars rating={5} />
            <span className="text-sm text-ink/60">from {googleRating.total} Google reviews</span>
          </div>
        </div>
      </div>

      {/* Auto-rolling rail. Pauses on hover; falls back to a manual swipe strip
          for visitors who've asked for reduced motion. */}
      <div className="marquee-rail relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max items-stretch gap-5 px-5 animate-marquee pause-on-hover">
          {loop.map((r, i) => (
            <Card key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>

      <div className="relative mt-12 text-center">
        <a
          href={site.socials.google}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full border-2 border-brand-200 bg-white px-6 py-3.5 text-sm font-semibold text-brand-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-700 hover:bg-brand-700 hover:text-white hover:shadow-lg"
        >
          <GoogleIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[360deg]" />
          Read all reviews on Google
        </a>
      </div>
    </section>
  );
}
