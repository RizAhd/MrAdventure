export type Review = {
  /** Reviewer name exactly as it appears on the Google Business Profile. */
  name: string;
  /** Stars given on Google (1–5). */
  rating: number;
  /** The review text, verbatim and in the language it was written in. */
  text: string;
  /** English translation — only for reviews not written in English. */
  translation?: string;
  /** Approximate date. Google only shows relative ages ("2 weeks ago"), so
   *  these are derived from the 27 Jul 2026 profile screenshots and are
   *  accurate to the month, which is all we display. */
  date: string;
  /** Reviewer carries Google's "Local Guide" badge. */
  localGuide?: boolean;
  /** Public review count on the reviewer's Google account. */
  reviewCount?: number;
  /** What they booked — only set where the review or the owner's reply says so. */
  service?: string;
};

/**
 * REAL reviews, transcribed from the Google Business Profile for
 * "Mr Adventure Tours & Travels" (Knowledge Graph ID /g/11zcs1hr37).
 *
 * Rules for this file:
 *  - Never invent, edit or "tidy up" a review. Transcribe verbatim, typos and all.
 *  - Never invent a reviewer's country. Google doesn't publish it, so we don't show it.
 *  - Two profile reviews (Lars Benack, Kapish Aggarwal) are star-only with no text.
 *    They count toward the Google rating but are not listed here — there is
 *    nothing to quote.
 *
 * Newest first.
 */
export const reviews: Review[] = [
  {
    name: "Michiel De Smet",
    rating: 5,
    text: "We reden van Arugam Bay naar Sinharaja met Mr Adventure Tours & Travels. Voor de lange rit werd een comfortabele van geregeld en een vriendelijke en rustige chauffeur. Alles verliep volgens de gemaakte afspraken.",
    translation:
      "We drove from Arugam Bay to Sinharaja with Mr Adventure Tours & Travels. For the long trip they arranged a comfortable van and a friendly, calm driver. Everything went exactly as agreed.",
    date: "2026-07-27",
    reviewCount: 11,
    service: "Arugam Bay → Sinharaja van transfer",
  },
  {
    name: "Ashley Hayat",
    rating: 5,
    text: "Good share taxi service and decent price. LKR8000 from Arugam Bay to Kathaluwa in 6h15m.",
    date: "2026-07-27",
    localGuide: true,
    reviewCount: 7,
    service: "Arugam Bay → Kathaluwa share taxi",
  },
  {
    name: "PACO RODRIGUEZ",
    rating: 5,
    text: "It was simply a perfect service",
    date: "2026-07-21",
    reviewCount: 15,
  },
  {
    // NOTE: Google truncated this one in the source screenshot ("…throughout the").
    // Quoted only as far as it is legible. Replace with the full text when available.
    name: "Asnas Moujoon",
    rating: 5,
    text: "Excellent service from Mr. Adventure Tours & Travels! The team was friendly, punctual, and professional throughout the…",
    date: "2026-07-20",
    reviewCount: 3,
    service: "Kumana Safari",
  },
  {
    name: "Axel Weigand",
    rating: 5,
    text: "Serios, amables y puntuales. Recomiendo 100%",
    translation: "Professional, friendly and punctual. I recommend them 100%.",
    date: "2026-07-13",
    reviewCount: 9,
  },
  {
    name: "olena roche",
    rating: 5,
    text: "Good taxi experience. Always good price and good drive. Thank you",
    date: "2026-07-13",
    localGuide: true,
    reviewCount: 31,
  },
  {
    name: "Chiara Volonnino",
    rating: 5,
    text: "I've used their shared taxi service twice. The prices are good, and the service is excellent. Stuff helpful and friendly. Highly recommended!",
    date: "2026-07-06",
    localGuide: true,
    reviewCount: 80,
    service: "Shared taxi",
  },
  {
    // Placed last: genuine, but the least specific of the eight and from a
    // single-review account, so it carries the least weight with readers.
    name: "Rizlan Ahmed",
    rating: 5,
    text: "Great Service & Highly Recommended",
    date: "2026-07-06",
    reviewCount: 1,
  },
];

/**
 * Totals for the Google profile as a whole — including the two star-only
 * reviews that aren't quoted above. Update these when the profile changes.
 *
 * Deliberately NOT emitted as `aggregateRating` structured data: reviews a
 * business collects about itself are "self-serving" and are ineligible for
 * Google's star rich results on LocalBusiness/Organization types.
 * See https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */
export const googleRating = { average: 5.0, total: 10 };
