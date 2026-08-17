/**
 * Destination names only, as a standalone literal.
 *
 * The Hero is a client component and only needs these strings for its
 * <datalist> autocomplete. Importing `destinations` there pulled the whole
 * 18 kB table — body copy, highlights, getting-there notes, image paths — into
 * the client JS bundle to render 17 <option> values.
 *
 * This has to be a literal rather than `destinations.map(d => d.name)`, because
 * deriving it would put the full table back in the bundle. `data/destinations.ts`
 * guards against the two drifting apart in development.
 */
export const destinationNames = [
  "Colombo Airport",
  "Negombo",
  "Colombo",
  "Kandy",
  "Sigiriya",
  "Dambulla",
  "Nuwara Eliya",
  "Ella",
  "Bentota",
  "Hikkaduwa",
  "Galle",
  "Mirissa",
  "Matara",
  "Yala",
  "Arugam Bay",
  "Pasikuda",
  "Trincomalee",
] as const;
