export type Destination = {
  /** URL segment — /destinations/<slug>/ */
  slug: string;
  name: string;
  image: string;
  /** One line, used on the home-page card. */
  blurb: string;
  /** Region, for breadcrumbs and page copy. */
  region: string;
  /** Two or three paragraphs of page-specific copy. Keep it honest and local. */
  body: string[];
  /** Things guests actually go there for. */
  highlights: string[];
  /** Why you'd want a driver here specifically. */
  gettingThere: string;
};

// We drive you anywhere on the island — a natural west → central → hill → south → east loop.
export const destinations: Destination[] = [
  {
    slug: "colombo-airport",
    name: "Colombo Airport",
    image: "/destinations/colombo-airport.webp",
    blurb: "Bandaranaike International (CMB) — we meet you at arrivals and drive you anywhere on the island.",
    region: "Katunayake, Western Province",
    body: [
      "Bandaranaike International Airport at Katunayake is where almost every trip to Sri Lanka begins. It sits north of Colombo, and the expressway means getting away from it is quicker than most arrivals expect — but only if someone is actually waiting for you.",
      "We meet guests inside arrivals with a name board, help with luggage, and drive straight out. Share your flight number when you book and we track it, so a delayed landing costs you nothing and nobody is left waiting in the car park at 3am.",
    ],
    highlights: ["24/7 arrivals pickup", "Name-board meet and greet", "Flight tracking on delays", "Child seats on request"],
    gettingThere:
      "Transfers run around the clock. Most guests head straight for Negombo, Colombo, Kandy or the south coast — tell us your onward destination and we'll send the right vehicle for your group and luggage.",
  },
  {
    slug: "colombo",
    name: "Colombo",
    image: "/destinations/colombo.webp",
    blurb: "The vibrant capital — Galle Face, markets and nightlife by the Indian Ocean.",
    region: "Western Province",
    body: [
      "Sri Lanka's commercial capital is louder, faster and more modern than the rest of the island, and worth a day or two at either end of a trip. Colonial arcades sit next to glass towers, and the seafront at Galle Face fills every evening with kite-sellers and street food.",
      "Traffic is the one real headache, and it's the main reason guests hire a driver here rather than self-driving. We know which roads seize up at which hours and route around them.",
    ],
    highlights: ["Galle Face Green at sunset", "Pettah market", "Gangaramaya Temple", "Independence Square"],
    gettingThere:
      "A short hop from the airport on the expressway. We also run day trips out of Colombo to Kandy, Galle and Sigiriya, and full island-wide tours starting here.",
  },
  {
    slug: "kandy",
    name: "Kandy",
    image: "/destinations/kandy.webp",
    blurb: "The hill capital and the sacred Temple of the Tooth beside the lake.",
    region: "Central Province",
    body: [
      "The last kingdom of Sri Lanka to fall to colonial rule, Kandy still feels like the cultural heart of the country. The Temple of the Sacred Tooth Relic sits on the lake in the middle of town, and the hills around it are thick with tea and spice.",
      "It's cooler here than the coast and makes a natural base between Colombo and the Cultural Triangle. Most guests give it two nights.",
    ],
    highlights: ["Temple of the Sacred Tooth Relic", "Kandy Lake", "Royal Botanical Gardens, Peradeniya", "Kandyan dance shows"],
    gettingThere:
      "A steady climb inland from the airport or Colombo, with spice gardens and the Pinnawala elephant orphanage on the way. Roads narrow as you climb, so most guests take a car or 7-seater van.",
  },
  {
    slug: "sigiriya",
    name: "Sigiriya",
    image: "/destinations/sigiriya.webp",
    blurb: "The ancient Lion Rock fortress rising above the central plains.",
    region: "Central Province",
    body: [
      "Lion Rock is the single most recognisable sight in Sri Lanka — a sheer granite plug rising two hundred metres straight out of flat dry-zone forest, with a fifth-century royal citadel on top and frescoes part-way up.",
      "Climb it at first light. By mid-morning the steps are crowded and the rock is genuinely hot. Nearby Pidurangala offers the better photograph of Sigiriya itself, for a fraction of the ticket price.",
    ],
    highlights: ["Sigiriya Lion Rock", "Pidurangala Rock at sunrise", "Dambulla Cave Temple", "Minneriya elephant gathering"],
    gettingThere:
      "North-east of Colombo through Kurunegala and Dambulla, on good main road most of the way. Groups touring the Cultural Triangle usually keep the same van and driver for several days.",
  },
  {
    slug: "dambulla",
    name: "Dambulla",
    image: "/destinations/dambulla.webp",
    blurb: "The golden cave temple — centuries of murals and Buddha statues.",
    region: "Central Province",
    body: [
      "Five caves cut into a rock overhang, painted floor to ceiling and packed with more than a hundred and fifty Buddha statues, some of them two thousand years old. It's the best-preserved cave temple complex in the country and a UNESCO site.",
      "It sits right on the road between Kandy and Sigiriya, which makes it the easiest major sight on the island to fit into a transfer day rather than a separate trip.",
    ],
    highlights: ["Golden Cave Temple", "Rock-top views over the plains", "Dambulla produce market", "Easy add-on to Sigiriya"],
    gettingThere:
      "Directly on the Kandy–Sigiriya road. Ask us to build in an hour here on any Cultural Triangle transfer — it costs almost no extra driving time.",
  },
  {
    slug: "ella",
    name: "Ella",
    image: "/destinations/ella-nine-arch.webp",
    blurb: "Misty hill country, tea trails and the iconic Nine Arch Bridge.",
    region: "Uva Province",
    body: [
      "A small hill town wedged in a gap in the mountains, cool and often wrapped in cloud. Ella has become the backpacker centre of the hill country, and for good reason — the walking is excellent and the views out through Ella Gap run all the way to the southern plains on a clear day.",
      "The Nine Arch Bridge is the photograph everyone comes for. Go early, check the train times, and walk in from the Ella side rather than driving to the bridge itself.",
    ],
    highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Ella Rock", "Rawana Falls", "Tea factory tours"],
    gettingThere:
      "A long, steep climb whichever way you come. From Arugam Bay it's our most-requested run; from the airport it's a big day and many guests break it overnight in Kandy or Nuwara Eliya.",
  },
  {
    slug: "galle",
    name: "Galle",
    image: "/destinations/galle.webp",
    blurb: "The Dutch fort city — ramparts, lighthouse and boutique lanes by the sea.",
    region: "Southern Province",
    body: [
      "A walled Dutch colonial town on a headland, still lived in rather than preserved behind glass. Inside the ramparts the streets are narrow and shaded, full of cafés, jewellers and small hotels, and you can walk the full circuit of the walls in under an hour.",
      "Do it at sunset, when local families gather on the ramparts and boys throw themselves off the wall into the sea by the lighthouse.",
    ],
    highlights: ["Galle Fort ramparts", "Galle Lighthouse", "Dutch Reformed Church", "Unawatuna and Mirissa beaches nearby"],
    gettingThere:
      "The easiest long transfer on the island — the Southern Expressway runs nearly the whole way from the airport, so it's fast, flat driving on good tarmac.",
  },
  {
    slug: "matara",
    name: "Matara",
    image: "/destinations/matara.webp",
    blurb: "Southern coast town with wild surf, golden beaches and rocky headlands.",
    region: "Southern Province",
    body: [
      "Further down the south coast past Galle, Matara is a working town rather than a tourist one, and it's the better for it. The beaches either side are long and largely empty outside weekends, and the surf at nearby Midigama and Weligama suits beginners.",
      "The old Dutch fort and the island temple at Parey Dewa reached by footbridge are both worth an hour.",
    ],
    highlights: ["Polhena reef snorkelling", "Parey Dewa island temple", "Weligama and Midigama surf", "Dondra Head lighthouse"],
    gettingThere:
      "Continue along the coast past Galle, or come down from the hills via Ella. We run this as a coastal day trip with as many beach stops as you want.",
  },
  {
    slug: "arugam-bay",
    name: "Arugam Bay",
    image: "/destinations/arugam-bay.webp",
    blurb: "World-class surf, golden beaches and our home base on the east coast.",
    region: "Eastern Province",
    body: [
      "This is where we're based, so we'll be straight with you: Arugam Bay is a single sandy street that happens to sit next to one of the best right-hand point breaks in Asia. The season runs roughly May to September, when the surf is consistent and the town is busy.",
      "Out of season it empties and slows right down, which some people prefer. Either way, the lagoons and Kumana National Park are minutes away, and the wildlife is genuinely excellent.",
    ],
    highlights: ["Main Point surf break", "Whiskey Point and Peanut Farm", "Kumana National Park safaris", "Lagoon and boat safaris", "Elephant Rock"],
    gettingThere:
      "A full cross-island run from Colombo airport and our most familiar road — it's our own. From Mattala in the south it's considerably shorter. Roof racks for boards at no extra cost.",
  },
  {
    slug: "pasikuda",
    name: "Pasikuda",
    image: "/destinations/pasikuda.webp",
    blurb: "Shallow turquoise bay with some of the calmest swimming in Sri Lanka.",
    region: "Eastern Province",
    body: [
      "A wide, shallow, reef-sheltered bay where you can wade out a long way and the water stays flat. That makes it the most family-friendly swimming on the east coast, and a complete contrast to the surf at Arugam Bay a few hours south.",
      "The resort strip is quiet and low-key. Neighbouring Kalkudah is emptier still if you want the beach to yourself.",
    ],
    highlights: ["Shallow calm-water swimming", "Kalkudah beach", "Snorkelling on the reef", "Batticaloa lagoon nearby"],
    gettingThere:
      "Straight up the east coast from Arugam Bay through Batticaloa — flat, easy driving that stays close to the sea most of the way.",
  },
  {
    slug: "trincomalee",
    name: "Trincomalee",
    image: "/destinations/trincomalee.webp",
    blurb: "Natural harbour, whale watching and the beaches of the north-east.",
    region: "Eastern Province",
    body: [
      "One of the finest deep-water natural harbours in the world, with the Koneswaram temple on the cliff above it and long white beaches at Uppuveli and Nilaveli just to the north. The north-east season runs opposite to the south coast, so this is where to be when Galle is being rained on.",
      "Blue whales pass offshore in season, and Pigeon Island is a short boat ride out for snorkelling over live coral.",
    ],
    highlights: ["Koneswaram Temple", "Nilaveli and Uppuveli beaches", "Pigeon Island snorkelling", "Whale watching in season"],
    gettingThere:
      "The top of the east-coast run from Arugam Bay via Batticaloa and Pasikuda, or across the interior from Kandy and the Cultural Triangle.",
  },
];

export const destinationBySlug = (slug: string) => destinations.find((d) => d.slug === slug);
