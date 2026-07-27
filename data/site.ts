export const site = {
  name: "Mr Adventure",
  fullName: "Mr Adventure Tours & Travels",
  tagline: "Safe Travel · Best Prices · Reliable Service",
  location: "Arugam Bay, Sri Lanka",
  serviceArea: "Island-wide, Sri Lanka",
  blurb:
    "Reliable island-wide taxi & airport transfers across Sri Lanka — plus wildlife safaris and scooter & tuk-tuk rentals. Run by local experts you can trust.",
  /**
   * Public profiles. Anything left as "" is hidden everywhere rather than
   * rendered as a dead `href="#"` link.
   */
  socials: {
    // Facebook's own canonical path for the page (it declares this itself in
    // rel=canonical). Preferred over profile.php?id= — a readable slug is a
    // stronger `sameAs` signal and survives Facebook URL changes better.
    facebook: "https://www.facebook.com/people/Mr-Adventure-Tours-Travels/61591846139360/",
    // Was mradventure40, which now returns "Profile isn't available" — a dead
    // link that was live on the site and in sameAs.
    instagram: "https://www.instagram.com/mradventuretravels/",
    tiktok: "", // no TikTok account yet — icon is hidden while this is empty
    // TODO: swap for the canonical Maps URL (…/maps/place/… with the CID).
    // share.google links are rotating shortlinks, so they're weak in `sameAs`.
    google: "https://share.google/0ndq5IgOysnODwG9W",
  },
  // Root-relative so they still resolve from /taxi/... and /destinations/...
  // pages, not just the home page.
  nav: [
    { label: "Taxi", href: "/#taxi" },
    { label: "Fleet", href: "/#fleet" },
    { label: "Destinations", href: "/#destinations" },
    { label: "Safaris", href: "/#safaris" },
    { label: "Rentals", href: "/#rentals" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export const stats = [
  { value: "All-island", label: "Taxi coverage" },
  { value: "24/7", label: "Airport transfers" },
  { value: "9", label: "Vehicles in our fleet" },
  { value: "10+", label: "Years on the road" },
];
