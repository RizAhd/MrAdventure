export type Service = {
  slug: string;
  title: string;
  category: "safari" | "rental";
  image: string;
  blurb: string;
  features: string[];
  /** Subject used to pre-fill the WhatsApp enquiry. */
  subject: string;
  /** Where it runs. Used in page copy and as `areaServed` in schema. */
  area: string;
  /** Opening paragraph on /services/<slug>/ — also the meta description base. */
  intro: string;
  /** Two or three paragraphs of page-specific copy. Keep it honest and local. */
  body: string[];
  /** What you actually get. Rendered as a checklist. */
  included: string[];
  /** Practical caveats. Better said up front than discovered on the day. */
  goodToKnow: string;
};

export const safaris: Service[] = [
  {
    slug: "kumana-safari",
    title: "Kumana Safari",
    category: "safari",
    image: "/hero/leopard.webp",
    blurb:
      "Track leopards, elephants and rare wetland birds through Kumana National Park with an experienced local guide.",
    features: ["Leopards & elephants", "Half or full day", "Private jeep & guide"],
    subject: "Kumana Safari",
    area: "Kumana National Park, Eastern Province",
    intro:
      "Kumana sits at the quiet end of the same protected belt as Yala, on the coast south of Arugam Bay. It has the same headline wildlife — leopard, elephant, sloth bear — with a fraction of the jeep traffic, which is the whole reason to come here instead.",
    body: [
      "The park is best known for its bird life. The Kumana Villu, a flooded mangrove lagoon at the heart of it, draws thousands of migratory and resident water birds, and between roughly April and July it becomes one of the largest nesting grounds in the country. Painted storks, spoonbills, pelicans and herons nest in numbers that are hard to believe until you're sitting in front of them.",
      "Leopard sightings are real but never guaranteed — anyone promising you one is selling something. Elephants are far more reliable, and the drive itself takes you through scrub jungle, brackish lagoons and open plains that change character every few kilometres.",
      "We run it as a private trip: your own jeep, your own driver-guide, and a start time that suits you rather than a fixed departure. Early morning is the best light and the most active wildlife; late afternoon is a close second and easier if you're not a morning person.",
    ],
    included: [
      "Private 4x4 safari jeep for your group",
      "Experienced local driver-guide who knows the park",
      "Hotel or guesthouse pickup around Arugam Bay",
      "Half-day or full-day, your choice of start time",
    ],
    goodToKnow:
      "National park entrance fees are payable separately at the gate and are set by the Department of Wildlife Conservation, not by us — we'll tell you the current rate when you enquire so there are no surprises. The park closes periodically for conservation, usually around September and October, so check with us before fixing dates.",
  },
  {
    slug: "lagoon-safari",
    title: "Lagoon Safari",
    category: "safari",
    image: "/gallery/crocodiles.webp",
    blurb:
      "Glide across mirror-calm lagoons at golden hour among crocodiles, buffalo and hundreds of water birds.",
    features: ["Birdlife & crocodiles", "Sunrise / sunset", "Great for photography"],
    subject: "Lagoon Safari",
    area: "Pottuvil Lagoon, near Arugam Bay",
    intro:
      "A slow boat through the lagoon just north of Arugam Bay, threading between mangrove stands and open water. It is the gentlest wildlife trip we run and, for photographers, often the most rewarding one.",
    body: [
      "Crocodiles are the draw most people arrive for, and you will almost certainly see them — sunning on the banks or holding position just under the surface. Water buffalo wade through the shallows, monkeys work the treeline, and elephants come down to drink often enough that it is worth keeping your camera ready rather than packed.",
      "The bird life is constant: kingfishers, egrets, herons, sea eagles overhead. Because the boat moves quietly and sits low, you get much closer than a jeep ever would, and the water stays glassy enough at either end of the day to double everything in reflection.",
      "Trips run at sunrise or sunset, when the light is best and the animals are most active. It takes roughly two hours door to door, which makes it easy to fit around a surf session or a travel day.",
    ],
    included: [
      "Private boat with a local guide",
      "Life jackets for everyone on board",
      "Sunrise or sunset departure",
      "Pickup from your place in Arugam Bay",
    ],
    goodToKnow:
      "Wear something you don't mind getting a little damp and bring insect repellent — the mangroves earn their reputation at dusk. The boats are stable and the water is calm, so it suits children and non-swimmers, but tell us ages when you book so we bring the right jackets.",
  },
  {
    slug: "boat-safari",
    title: "Boat Safari",
    category: "safari",
    image: "/gallery/boat-1.webp",
    blurb:
      "A peaceful mangrove boat ride through hidden waterways — wildlife, nature and calm off-the-map scenery.",
    features: ["Mangrove waterways", "Life jackets provided", "Family friendly"],
    subject: "Boat Safari",
    area: "Mangrove waterways around Arugam Bay",
    intro:
      "Deeper into the mangroves than the lagoon trip goes, following narrow channels where the canopy closes overhead and the water goes completely still. Less about ticking off big animals, more about being somewhere very quiet.",
    body: [
      "The mangrove system around Arugam Bay is a nursery for most of what lives in the surrounding water, so there is life everywhere once your eyes adjust — monitor lizards along the roots, kingfishers working the channels, crabs and mudskippers on the exposed banks, troops of monkeys moving through the branches above.",
      "Your guide grew up on this water and reads it accordingly, cutting the engine in the narrow sections so you drift through on the current. It is the trip guests most often describe afterwards as the unexpected highlight, precisely because it isn't a headline attraction.",
      "It works well for families and for anyone who would rather not spend three hours being shaken around in a jeep. Pair it with the lagoon trip on the same morning if you want both, and we'll build the timings around it.",
    ],
    included: [
      "Private boat and local guide",
      "Life jackets provided",
      "Flexible departure time",
      "Pickup from your place in Arugam Bay",
    ],
    goodToKnow:
      "There is shade for part of the route but not all of it, so bring a hat, water and sun cream. The channels are shallow in places and the route can shift depending on tide and rainfall — your guide will pick the best line on the day.",
  },
];

export const rentals: Service[] = [
  {
    slug: "scooter-rent",
    title: "Scooter Rent",
    category: "rental",
    image: "/gallery/scooter-couple.webp",
    blurb:
      "Explore Arugam Bay and beyond at your own pace on a reliable, well-maintained automatic scooter.",
    features: ["Automatic & easy", "Helmets included", "Daily / weekly rates"],
    subject: "Scooter Rent",
    area: "Arugam Bay and the east coast",
    intro:
      "The default way to get around Arugam Bay. An automatic scooter turns the strip of beaches, surf points and food places spread along this coast from a series of tuk-tuk fares into somewhere you can simply ride to.",
    body: [
      "Our scooters are automatics, so if you can ride a bicycle you can ride one of these — no gears, no clutch. They're serviced between rentals and we check tyres, brakes and lights before each hire rather than after a complaint.",
      "Most guests take one for their whole stay, because it pays for itself within a couple of days. It puts Whiskey Point, Peanut Farm, Elephant Rock and Pottuvil town all within an easy ride, and the coast road south towards Panama is one of the better rides on the island.",
      "We deliver to wherever you're staying in Arugam Bay and collect from the same place at the end. If something goes wrong while you have it, message us and we'll come out — you shouldn't be stranded on a back road sorting out a puncture yourself.",
    ],
    included: [
      "Well-serviced automatic scooter",
      "Helmets for rider and passenger",
      "Delivery and collection in Arugam Bay",
      "Daily and weekly rates, with support if anything goes wrong",
    ],
    goodToKnow:
      "To ride legally in Sri Lanka you need a local recognition permit alongside your home licence or IDP — an international permit on its own isn't enough, and it matters for insurance if anything happens. Ask us when you book and we'll point you at the process. Roads here are shared with buses, tuk-tuks and the occasional cow, so ride defensively and keep your helmet on.",
  },
  {
    slug: "tuktuk-rent",
    title: "Tuk Tuk Rent",
    category: "rental",
    image: "/fleet/tuktuk.webp",
    blurb:
      "The classic Sri Lankan three-wheeler — fun, shaded and perfect for road-tripping the coast with friends.",
    features: ["Self-drive or driver", "Roomy for luggage", "Flexible pickup"],
    subject: "Tuk Tuk Rent",
    area: "Arugam Bay, with island-wide trips on request",
    intro:
      "Slower than a scooter, roomier than a car, and shaded — which on the east coast matters more than speed. A tuk tuk carries three comfortably plus boards and bags, and it stays dry when the afternoon rain arrives.",
    body: [
      "You can take one self-drive or with one of our drivers. Self-drive suits people staying a while who want the freedom; a driver makes more sense for longer cross-country runs, where the hours add up and local road knowledge saves you real time.",
      "They're genuinely practical for the way people travel here. Surfboards fit along the side, luggage goes in the back, and the open sides mean you actually see the country you're driving through rather than watching it past glass.",
      "For longer trips — the coast road down to Yala, or across the interior towards the hill country — talk to us first. A tuk tuk will get you there, but on some of those routes a car or van is faster, cheaper and considerably more comfortable, and we'll say so rather than just take the booking.",
    ],
    included: [
      "Well-maintained tuk tuk, self-drive or with a driver",
      "Room for three passengers plus luggage or boards",
      "Flexible pickup and drop-off around Arugam Bay",
      "Daily and weekly rates",
    ],
    goodToKnow:
      "Self-drive needs the same Sri Lankan recognition permit as a scooter — ask us and we'll walk you through it. Tuk tuks are three-wheeled and top-heavy, so they don't like being cornered quickly; take it steadily, especially on wet roads and loose gravel.",
  },
  {
    slug: "bicycle-rent",
    title: "Bicycle Rent",
    category: "rental",
    image: "/fleet/bicycle.webp",
    blurb:
      "Pedal the palm-lined lanes and beaches at a relaxed, eco-friendly pace. Great for short local trips.",
    features: ["Well-serviced bikes", "Locks provided", "Hourly / daily"],
    subject: "Bicycle Rent",
    area: "Arugam Bay village and the surrounding lanes",
    intro:
      "Arugam Bay is small, flat and mostly one road — which makes a bicycle the easiest way to get between your guesthouse, the beach and dinner without thinking about permits, fuel or parking.",
    body: [
      "The bikes are serviced regularly and come with a lock, which you will want: leave it at the beach for a few hours and you'd rather it were still there when you get back. We'll set the saddle height for you at drop-off rather than leaving you to fight with it.",
      "It covers the village comfortably and the quieter lanes running inland behind it, where you're riding past paddy fields and palm groves within a few minutes of the main strip. For the further surf points — Whiskey Point, Peanut Farm — a scooter is the more sensible choice, particularly in the middle of the day.",
      "Hourly and daily rates, delivered to wherever you're staying. It's the cheapest thing we rent and, for a lot of guests, the one they use most.",
    ],
    included: [
      "Serviced bicycle, sized to you",
      "Lock provided",
      "Delivery to your guesthouse in Arugam Bay",
      "Hourly and daily rates",
    ],
    goodToKnow:
      "There are no bike lanes and the main road carries buses and tuk-tuks, so ride predictably and avoid it after dark — lighting is patchy. Midday heat here is serious; early morning and late afternoon are far more pleasant, and take more water than you think you need.",
  },
];

export const allServices = [...safaris, ...rentals];

export const serviceBySlug = (slug: string) => allServices.find((s) => s.slug === slug);

/** Other services to link to from a service page — same category first. */
export const relatedServices = (slug: string) => {
  const current = serviceBySlug(slug);
  if (!current) return [];
  const sameCategory = allServices.filter((s) => s.slug !== slug && s.category === current.category);
  const rest = allServices.filter((s) => s.slug !== slug && s.category !== current.category);
  return [...sameCategory, ...rest].slice(0, 4);
};
