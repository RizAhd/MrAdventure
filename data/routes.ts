export type Route = { from: string; to: string };

/**
 * Popular taxi / airport-transfer routes.
 *
 * These exist to put the phrases real customers actually search for
 * ("Colombo airport to Ella taxi", "Arugam Bay to Kandy cab") into crawlable
 * on-page text, and to give visitors a one-tap way to ask for that exact fare.
 *
 * Deliberately NO prices or durations: we don't have a verified fare table, and
 * publishing guessed numbers would be both wrong and a refund argument waiting
 * to happen. Every route links to a WhatsApp quote instead. Add a `price` field
 * here only once there's a real rate card to copy from.
 */
export const routes: Route[] = [
  { from: "Colombo Airport (CMB)", to: "Colombo City" },
  { from: "Colombo Airport (CMB)", to: "Kandy" },
  { from: "Colombo Airport (CMB)", to: "Sigiriya" },
  { from: "Colombo Airport (CMB)", to: "Ella" },
  { from: "Colombo Airport (CMB)", to: "Galle" },
  { from: "Colombo Airport (CMB)", to: "Arugam Bay" },
  { from: "Mattala Airport (HRI)", to: "Arugam Bay" },
  { from: "Arugam Bay", to: "Ella" },
  { from: "Arugam Bay", to: "Kandy" },
  { from: "Arugam Bay", to: "Trincomalee" },
  { from: "Ella", to: "Galle" },
  { from: "Kandy", to: "Sigiriya" },
];
