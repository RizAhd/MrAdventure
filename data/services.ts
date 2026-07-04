export type Service = {
  slug: string;
  title: string;
  category: "safari" | "rental";
  image: string;
  blurb: string;
  features: string[];
  /** Subject used to pre-fill the WhatsApp enquiry. */
  subject: string;
};

export const safaris: Service[] = [
  {
    slug: "kumana-safari",
    title: "Kumana Safari",
    category: "safari",
    image: "/gallery/leopard-2.jpg",
    blurb:
      "Track leopards, elephants and rare wetland birds through Kumana National Park with an experienced local guide.",
    features: ["Leopards & elephants", "Half or full day", "Private jeep & guide"],
    subject: "Kumana Safari",
  },
  {
    slug: "lagoon-safari",
    title: "Lagoon Safari",
    category: "safari",
    image: "/gallery/birds-sunset.jpg",
    blurb:
      "Glide across mirror-calm lagoons at golden hour among crocodiles, buffalo and hundreds of water birds.",
    features: ["Birdlife & crocodiles", "Sunrise / sunset", "Great for photography"],
    subject: "Lagoon Safari",
  },
  {
    slug: "boat-safari",
    title: "Boat Safari",
    category: "safari",
    image: "/gallery/boat-1.jpg",
    blurb:
      "A peaceful mangrove boat ride through hidden waterways — wildlife, nature and calm off-the-map scenery.",
    features: ["Mangrove waterways", "Life jackets provided", "Family friendly"],
    subject: "Boat Safari",
  },
];

export const rentals: Service[] = [
  {
    slug: "scooter-rent",
    title: "Scooter Rent",
    category: "rental",
    image: "/gallery/scooter-couple.jpg",
    blurb:
      "Explore Arugam Bay and beyond at your own pace on a reliable, well-maintained automatic scooter.",
    features: ["Automatic & easy", "Helmets included", "Daily / weekly rates"],
    subject: "Scooter Rent",
  },
  {
    slug: "tuktuk-rent",
    title: "Tuk Tuk Rent",
    category: "rental",
    image: "/fleet/tuktuk.jpg",
    blurb:
      "The classic Sri Lankan three-wheeler — fun, shaded and perfect for road-tripping the coast with friends.",
    features: ["Self-drive or driver", "Roomy for luggage", "Flexible pickup"],
    subject: "Tuk Tuk Rent",
  },
  {
    slug: "bicycle-rent",
    title: "Bicycle Rent",
    category: "rental",
    image: "/fleet/bicycle.jpg",
    blurb:
      "Pedal the palm-lined lanes and beaches at a relaxed, eco-friendly pace. Great for short local trips.",
    features: ["Well-serviced bikes", "Locks provided", "Hourly / daily"],
    subject: "Bicycle Rent",
  },
];

export const allServices = [...safaris, ...rentals];
