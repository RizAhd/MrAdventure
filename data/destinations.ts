export type Destination = {
  name: string;
  image: string;
  blurb: string;
};

// We drive you anywhere on the island — a natural west → central → hill → south → east loop.
export const destinations: Destination[] = [
  {
    name: "Colombo Airport",
    image: "/destinations/colombo-airport.webp",
    blurb: "Bandaranaike International (CMB) — we meet you at arrivals and drive you anywhere on the island.",
  },
  {
    name: "Colombo",
    image: "/destinations/colombo.webp",
    blurb: "The vibrant capital — Galle Face, markets and nightlife by the Indian Ocean.",
  },
  {
    name: "Kandy",
    image: "/destinations/kandy.webp",
    blurb: "The hill capital and the sacred Temple of the Tooth beside the lake.",
  },
  {
    name: "Sigiriya",
    image: "/destinations/sigiriya.webp",
    blurb: "The ancient Lion Rock fortress rising above the central plains.",
  },
  {
    name: "Dambulla",
    image: "/destinations/dambulla.webp",
    blurb: "The golden cave temple — centuries of murals and Buddha statues.",
  },
  {
    name: "Ella",
    image: "/destinations/ella-nine-arch.webp",
    blurb: "Misty hill country, tea trails and the iconic Nine Arch Bridge.",
  },
  {
    name: "Galle",
    image: "/destinations/galle.webp",
    blurb: "The Dutch fort city — ramparts, lighthouse and boutique lanes by the sea.",
  },
  {
    name: "Matara",
    image: "/destinations/matara.webp",
    blurb: "Southern coast town with wild surf, golden beaches and rocky headlands.",
  },
  {
    name: "Arugam Bay",
    image: "/destinations/arugam-bay.webp",
    blurb: "World-class surf, golden beaches and our home base on the east coast.",
  },
  {
    name: "Pasikuda",
    image: "/destinations/pasikuda.webp",
    blurb: "Shallow turquoise bay with some of the calmest swimming in Sri Lanka.",
  },
  {
    name: "Trincomalee",
    image: "/destinations/trincomalee.webp",
    blurb: "Natural harbour, whale watching and the beaches of the north-east.",
  },
];
