import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoogleIcon } from "@/components/ui/icons";
import { reviews, googleRating, type Review } from "@/data/reviews";
import { site } from "@/data/site";

const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-gold-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={i < rating ? "h-4 w-4 fill-current" : "h-4 w-4 text-brand-200"} aria-hidden />
      ))}
    </div>
  );
}

function Card({ r }: { r: Review }) {
  return (
    // No `h-full` here: on a flex item whose parent has auto height, height:100%
    // is indefinite and collapses back to auto, which defeats `items-stretch`.
    <figure className="flex w-[19rem] shrink-0 flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-950/5">
      <div className="flex items-center justify-between">
        <Stars rating={r.rating} />
        <GoogleIcon className="h-4 w-4" />
      </div>

      <blockquote className="mt-3 text-sm leading-relaxed text-ink/80">&ldquo;{r.text}&rdquo;</blockquote>

      {/* Reviews left in another language: original above, English below. */}
      {r.translation && (
        <p className="mt-2 text-xs leading-relaxed text-ink/50">
          <span className="font-semibold uppercase tracking-wider">Translated</span> — {r.translation}
        </p>
      )}

      <figcaption className="mt-auto pt-4 text-sm font-semibold text-brand-900">
        {r.name}
        <span className="mt-0.5 block text-xs font-normal text-ink/50">
          {r.localGuide && "Local Guide · "}
          {monthYear(r.date)}
          {r.service && ` · ${r.service}`}
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // The marquee animates translateX(-50%), so the strip must (a) be wider than
  // the widest viewport and (b) contain an EVEN number of copies — otherwise
  // the halfway point isn't a copy boundary and the loop visibly jumps.
  // Each card is 19rem + 1.25rem gap ≈ 324px.
  const perHalf = Math.max(1, Math.ceil(2200 / (reviews.length * 324)));
  const loop = Array.from({ length: perHalf * 2 }, () => reviews).flat();

  return (
    <section id="reviews" className="section bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title="Travellers love Mr Adventure"
          subtitle="Every review below is a real, verified review from our Google Business Profile — nothing here is written by us."
        />

        {/* Rating summary */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <GoogleIcon className="h-6 w-6" />
          <span className="font-display text-2xl font-extrabold text-brand-900">
            {googleRating.average.toFixed(1)}
          </span>
          <Stars rating={5} />
          <span className="text-sm text-ink/60">
            from {googleRating.total} Google reviews
          </span>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max items-stretch gap-5 pl-5 animate-marquee pause-on-hover">
          {loop.map((r, i) => (
            <Card key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <a
          href={site.socials.google}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border-2 border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-700 hover:bg-brand-700 hover:text-white"
        >
          <GoogleIcon className="h-5 w-5" />
          Read all reviews on Google
        </a>
      </div>
    </section>
  );
}
