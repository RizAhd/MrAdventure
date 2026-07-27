export type Route = {
  /** URL segment — /taxi/<slug>/ */
  slug: string;
  from: string;
  to: string;
  /** Short forms for compact UI (chips, breadcrumbs, related-route lists). */
  fromShort: string;
  toShort: string;
  /** Two or three sentences of genuinely route-specific copy. */
  intro: string;
  /** Which vehicle suits this particular trip, and why. */
  vehicleNote: string;
  /** Places worth breaking the drive at. */
  stops: string[];
  /**
   * Approximate driving time, e.g. "6h 15m". LEFT BLANK ON PURPOSE — these come
   * from the operator, who actually drives them. Never guess: a wrong duration
   * on an airport transfer page is a missed flight. The page simply omits the
   * line until a real value is filled in.
   */
  duration?: string;
};

/**
 * Popular taxi / airport-transfer routes, one page each at /taxi/<slug>/.
 *
 * Every route needs its OWN copy. Twelve pages that differ only by city name
 * are doorway pages under Google's spam policy and get filtered, not ranked —
 * so `intro`, `vehicleNote` and `stops` must stay genuinely specific.
 *
 * No prices here by decision: there's no verified rate card, and published
 * fares we can't honour are worse than no fares. Every page asks for a quote.
 */
export const routes: Route[] = [
  {
    slug: "colombo-airport-to-colombo",
    from: "Colombo Airport (CMB)",
    to: "Colombo City",
    fromShort: "Colombo Airport",
    toShort: "Colombo",
    intro:
      "The shortest and most common transfer we run. Bandaranaike International sits at Katunayake, north of the city, and the Colombo–Katunayake Expressway makes the run into town quick and smooth at almost any hour. Most guests take this straight after landing, so we track the flight and wait if you're delayed.",
    vehicleNote:
      "A car is plenty for one to three people with normal luggage. If you're a family with big cases or surfboards, take the 7-seater van — the expressway means it costs little more in time.",
    stops: ["Negombo beach", "Colombo Fort", "Galle Face Green"],
  },
  {
    slug: "colombo-airport-to-negombo",
    from: "Colombo Airport (CMB)",
    to: "Negombo",
    fromShort: "Colombo Airport",
    toShort: "Negombo",
    intro:
      "The shortest transfer on our list — Negombo sits just north of the airport, so you're at your hotel in minutes rather than an hour. It's the reason so many trips start and end here: land late, sleep by the sea, and begin properly in the morning.",
    vehicleNote:
      "Any vehicle is fine over this distance. Pick by luggage rather than comfort — a car for two, the 7-seater if you're a family arriving with a season's worth of bags.",
    stops: ["Negombo fish market", "Dutch canal", "Negombo lagoon"],
  },
  {
    slug: "colombo-airport-to-kandy",
    from: "Colombo Airport (CMB)",
    to: "Kandy",
    fromShort: "Colombo Airport",
    toShort: "Kandy",
    intro:
      "A classic first leg for anyone starting in the Cultural Triangle. The road leaves the coastal plain and climbs steadily into the hills, and the last stretch into Kandy winds through tea and spice country. Plenty of guests break the drive at a spice garden or at the Pinnawala elephant orphanage.",
    vehicleNote:
      "Roads narrow and twist as you climb, so a comfortable car or the 7-seater van is the sweet spot. For groups of eight or more the 14-seater HiAce handles the bends better than two separate cars.",
    stops: ["Pinnawala Elephant Orphanage", "Spice gardens at Matale", "Kegalle"],
  },
  {
    slug: "colombo-airport-to-sigiriya",
    from: "Colombo Airport (CMB)",
    to: "Sigiriya",
    fromShort: "Colombo Airport",
    toShort: "Sigiriya",
    intro:
      "Straight from the plane into the Cultural Triangle. The route runs north-east through Kurunegala and Dambulla, flattening out into dry-zone scrub and paddy as you go. Arrive in the afternoon and you can climb Lion Rock at first light the next morning, before the heat and the crowds.",
    vehicleNote:
      "Mostly good main road, so any of our vehicles is comfortable. Groups doing a Cultural Triangle loop usually keep the same van and driver for several days rather than booking each leg separately.",
    stops: ["Dambulla Cave Temple", "Kurunegala", "Habarana"],
  },
  {
    slug: "colombo-airport-to-ella",
    from: "Colombo Airport (CMB)",
    to: "Ella",
    fromShort: "Colombo Airport",
    toShort: "Ella",
    intro:
      "One of our longest airport transfers, and one of the most scenic. The drive heads south-east and climbs hard into the hill country, ending on the narrow ridge roads around Ella. It's a big day after a long flight, so many guests break it overnight in Kandy or Nuwara Eliya rather than doing it in one push.",
    vehicleNote:
      "Take a comfortable A/C car or the 7-seater van — the climb is long and the bends are constant, and legroom matters more here than on the flat. We'll stop as often as you like.",
    stops: ["Ratnapura", "Nuwara Eliya tea country", "Rawana Falls"],
  },
  {
    slug: "colombo-airport-to-galle",
    from: "Colombo Airport (CMB)",
    to: "Galle",
    fromShort: "Colombo Airport",
    toShort: "Galle",
    intro:
      "The easiest long transfer on the island. The Southern Expressway runs almost the whole way, so this is a fast, flat, straightforward drive on good tarmac — a real relief straight off an overnight flight. Ideal if you're heading for the south-coast beaches at Unawatuna, Mirissa or Weligama.",
    vehicleNote:
      "Expressway the whole way, so comfort beats clearance here. A car or the Fit Shuttle is ideal for couples; the HiAce for families with surf gear.",
    stops: ["Bentota", "Hikkaduwa", "Galle Fort ramparts"],
  },
  {
    slug: "colombo-airport-to-arugam-bay",
    from: "Colombo Airport (CMB)",
    to: "Arugam Bay",
    fromShort: "Colombo Airport",
    toShort: "Arugam Bay",
    intro:
      "A full cross-island crossing, from the west coast airport all the way to the east-coast surf. It's the longest transfer we run and easily the one we know best — Arugam Bay is our home base, so this is our own road. Surfers usually take it in one go; everyone else tends to break it in the hills.",
    vehicleNote:
      "Long day, so take the space: the 7-seater or 14-seater van, especially with boards. Roof racks and board straps are available at no extra cost — just tell us how many you're bringing.",
    stops: ["Ratnapura", "Wellawaya", "Monaragala"],
  },
  {
    slug: "mattala-airport-to-arugam-bay",
    from: "Mattala Airport (HRI)",
    to: "Arugam Bay",
    fromShort: "Mattala Airport",
    toShort: "Arugam Bay",
    intro:
      "The quiet way in. Mattala Rajapaksa International sits near Hambantota in the deep south, and it's a far shorter run up to Arugam Bay than coming from Colombo. If your flight routes through Mattala, this is the transfer you want — and the drive skirts some of the best national-park country on the island.",
    vehicleNote:
      "A car handles this comfortably for a couple. Take a van if you're carrying boards, and ask us about adding a Yala or Kumana game drive on the way through — it's barely a detour.",
    stops: ["Yala National Park", "Kataragama", "Panama"],
  },
  {
    slug: "arugam-bay-to-ella",
    from: "Arugam Bay",
    to: "Ella",
    fromShort: "Arugam Bay",
    toShort: "Ella",
    intro:
      "The classic surf-to-hills hop, and probably the single most requested trip from our base. You leave the dry east coast, cross the plains around Monaragala and Wellawaya, then climb sharply into cool hill country. The temperature drop over the last hour genuinely surprises people — bring a layer.",
    vehicleNote:
      "The climb is steep and winding near the top, so a well-maintained car or the 7-seater van is the right call. This is a popular one to run as a half-day with stops rather than a straight transfer.",
    stops: ["Buttala", "Diyaluma Falls", "Rawana Falls", "Ella Rock viewpoint"],
  },
  {
    slug: "arugam-bay-to-kandy",
    from: "Arugam Bay",
    to: "Kandy",
    fromShort: "Arugam Bay",
    toShort: "Kandy",
    intro:
      "East coast to the old hill capital. The route crosses the dry-zone interior before lifting into the central highlands, and it's a genuine cross-section of the island in a single day — surf, scrub, paddy, then tea. Good option if you're heading on to the Cultural Triangle afterwards.",
    vehicleNote:
      "A long day on mixed roads. The 7-seater van is the most comfortable choice for two to five people; larger groups should take the 14-seater rather than splitting up.",
    stops: ["Monaragala", "Mahiyanganaya", "Victoria Reservoir"],
  },
  {
    slug: "arugam-bay-to-trincomalee",
    from: "Arugam Bay",
    to: "Trincomalee",
    fromShort: "Arugam Bay",
    toShort: "Trincomalee",
    intro:
      "Straight up the east coast, staying near the sea most of the way. This is the run for anyone chasing the east-coast season northward — flat, easy driving through Batticaloa and the Pasikuda lagoons, with plenty of empty beach if you want to stop and swim.",
    vehicleNote:
      "Flat and straightforward, so a car is fine for a couple. Take the van if you want to load boards and stop at Pasikuda or Nilaveli on the way.",
    stops: ["Batticaloa", "Pasikuda", "Nilaveli beach"],
  },
  {
    slug: "ella-to-galle",
    from: "Ella",
    to: "Galle",
    fromShort: "Ella",
    toShort: "Galle",
    intro:
      "Down out of the hills to the south coast. The drive drops through tea estates and waterfalls before flattening into coconut country and finally hitting the sea near the Galle Fort. A popular way to finish a hill-country stay before a few last days on the beach.",
    vehicleNote:
      "Steep descent for the first stretch, then easy road. Any vehicle is comfortable; a car is usually enough unless you're a family with luggage for a long trip.",
    stops: ["Ella Gap viewpoint", "Diyaluma Falls", "Matara", "Weligama"],
  },
  {
    slug: "kandy-to-sigiriya",
    from: "Kandy",
    to: "Sigiriya",
    fromShort: "Kandy",
    toShort: "Sigiriya",
    intro:
      "A short, easy leg between two of the island's biggest sights, and one most people do as a half-day with stops rather than a pure transfer. The road runs north through Matale spice country and past the Dambulla cave temple, which is well worth an hour on the way through.",
    vehicleNote:
      "Short and comfortable in anything. Most guests hire the car or van for the whole day so they can stop at Dambulla and the spice gardens without watching the clock.",
    stops: ["Matale spice gardens", "Dambulla Cave Temple", "Nalanda Gedige"],
  },
];

/** Routes sharing an endpoint with `slug` — used for internal linking. */
export function relatedRoutes(slug: string, limit = 4): Route[] {
  const current = routes.find((r) => r.slug === slug);
  if (!current) return [];
  return routes
    .filter((r) => r.slug !== slug)
    .map((r) => ({
      r,
      score:
        (r.fromShort === current.fromShort ? 2 : 0) +
        (r.toShort === current.toShort ? 2 : 0) +
        (r.fromShort === current.toShort || r.toShort === current.fromShort ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.r);
}

export const routeBySlug = (slug: string) => routes.find((r) => r.slug === slug);
