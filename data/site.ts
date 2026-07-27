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
    // TODO: this is a share link to a single *post*, not the page itself.
    // Replace with the Facebook Page URL — `sameAs` needs a profile Google can
    // match to the business entity.
    facebook: "https://www.facebook.com/share/p/185CRRJ4FF/",
    instagram: "https://www.instagram.com/mradventure40",
    tiktok: "", // no TikTok account yet — icon is hidden while this is empty
    // TODO: swap for the canonical Maps URL (…/maps/place/… with the CID).
    // share.google links are rotating shortlinks, so they're weak in `sameAs`.
    google: "https://share.google/0ndq5IgOysnODwG9W",
  },
  nav: [
    { label: "Taxi", href: "#taxi" },
    { label: "Fleet", href: "#fleet" },
    { label: "Destinations", href: "#destinations" },
    { label: "Safaris", href: "#safaris" },
    { label: "Rentals", href: "#rentals" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const stats = [
  { value: "All-island", label: "Taxi coverage" },
  { value: "24/7", label: "Airport transfers" },
  { value: "9", label: "Vehicles in our fleet" },
  { value: "10+", label: "Years on the road" },
];
