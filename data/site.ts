export const site = {
  name: "Mr Adventure",
  fullName: "Mr Adventure Tours & Travels",
  tagline: "Safe Travel · Best Prices · Reliable Service",
  location: "Arugam Bay, Sri Lanka",
  serviceArea: "Island-wide, Sri Lanka",
  blurb:
    "Reliable island-wide taxi & airport transfers across Sri Lanka — plus wildlife safaris and scooter & tuk-tuk rentals. Run by local experts you can trust.",
  socials: {
    facebook: "https://www.facebook.com/share/p/185CRRJ4FF/",
    instagram: "https://www.instagram.com/mradventure40",
    tiktok: "#", // TODO: add real TikTok link when available
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
