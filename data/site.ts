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
    /**
     * Canonical Google Maps place URL, resolved from the profile's own share
     * link on 16 Aug 2026. Was a share.google shortlink, which rotates and is
     * therefore weak as a `sameAs` signal.
     *
     * The durable parts are the `data=` blob — feature ID
     * 0x3ae5bd0059bdd565:0x167235d08c00d272 and Knowledge Graph ID
     * /g/11zcs1hr37 — which is what ties this site to the map listing. The
     * session parameters Google appends (`entry`, `g_ep`, `skid`) are tracking
     * noise and are stripped.
     */
    google:
      "https://www.google.com/maps/place/Mr+Adventure+Tours+%26+Travels/@6.8456586,81.8305803,17z/data=!4m6!3m5!1s0x3ae5bd0059bdd565:0x167235d08c00d272!8m2!3d6.8456586!4d81.8305803!16s%2Fg%2F11zcs1hr37",
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
