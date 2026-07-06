export type Destination = {
  name: string;
  image: string;
  blurb: string;
};

// We drive you anywhere on the island — a natural west → central → hill → south → east loop.
export const destinations: Destination[] = [
  {
    name: "Colombo Airport",
    image: "/destinations/colombo-airport.jpg",
    blurb: "Bandaranaike International (CMB) — we meet you at arrivals and drive you anywhere on the island.",
  },
  {
    name: "Colombo",
    image: "/destinations/colombo.jpg",
    blurb: "The vibrant capital — Galle Face, markets and nightlife by the Indian Ocean.",
  },
  {
    name: "Kandy",
    image: "/destinations/kandy.jpg",
    blurb: "The hill capital and the sacred Temple of the Tooth beside the lake.",
  },
  {
    name: "Sigiriya",
    image: "/destinations/sigiriya.jpg",
    blurb: "The ancient Lion Rock fortress rising above the central plains.",
  },
  {
    name: "Dambulla",
    image: "/destinations/dambulla.jpg",
    blurb: "The golden cave temple — centuries of murals and Buddha statues.",
  },
  {
    name: "Ella",
    image: "/destinations/ella-nine-arch.jpg",
    blurb: "Misty hill country, tea trails and the iconic Nine Arch Bridge.",
  },
  {
    name: "Galle",
    image: "/destinations/galle.jpg",
    blurb: "The Dutch fort city — ramparts, lighthouse and boutique lanes by the sea.",
  },
  {
    name: "Matara",
    image: "/destinations/matara.jpg",
    blurb: "Southern coast town with wild surf, golden beaches and rocky headlands.",
  },
  {
    name: "Arugam Bay",
    image: "/destinations/arugam-bay.jpg",
    blurb: "World-class surf, golden beaches and our home base on the east coast.",
  },
  {
    name: "Pasikuda",
    image: "/destinations/pasikuda.jpg",
    blurb: "Shallow turquoise bay with some of the calmest swimming in Sri Lanka.",
  },
  {
    name: "Trincomalee",
    image: "/destinations/trincomalee.jpg",
    blurb: "Natural harbour, whale watching and the beaches of the north-east.",
  },
];
