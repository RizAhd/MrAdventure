export const site = {
  name: "Mr Adventure",
  fullName: "Mr Adventure Tours & Travels",
  tagline: "Safe Travel · Best Prices · Reliable Service",
  location: "Arugam Bay, Sri Lanka",
  serviceArea: "Island-wide, Sri Lanka",
  blurb:
    "Wildlife safaris, scooter & tuk-tuk rentals, and reliable island-wide taxi service — run by local experts on Sri Lanka's east coast.",
  // TODO: replace "#" with the real profile URLs when available.
  socials: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
  },
  nav: [
    { label: "Safaris", href: "#safaris" },
    { label: "Rentals", href: "#rentals" },
    { label: "Taxi", href: "#taxi" },
    { label: "Destinations", href: "#destinations" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const stats = [
  { value: "10+", label: "Years exploring" },
  { value: "6", label: "Signature experiences" },
  { value: "All-island", label: "Taxi coverage" },
  { value: "24/7", label: "WhatsApp support" },
];
