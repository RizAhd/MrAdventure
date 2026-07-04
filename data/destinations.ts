export type Destination = {
  name: string;
  image: string;
  blurb: string;
};

/** Poster route: "Arugam Bay to South — Ella, Pasikuda, Trinco, Dambulla, Sigiriya". */
export const destinations: Destination[] = [
  {
    name: "Arugam Bay",
    image: "/destinations/arugam-bay.jpg",
    blurb: "World-class surf, golden beaches and our home base on the east coast.",
  },
  {
    name: "Ella",
    image: "/destinations/ella-nine-arch.jpg",
    blurb: "Misty hill country, tea trails and the iconic Nine Arch Bridge.",
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
