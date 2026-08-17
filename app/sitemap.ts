import type { MetadataRoute } from "next";
import { routes } from "@/data/routes";
import { destinations } from "@/data/destinations";
import { allServices } from "@/data/services";

// Required for `output: "export"` so this metadata route is emitted as a static file.
export const dynamic = "force-static";

const SITE_URL = "https://mradventure.lk";

/**
 * `lastModified` is deliberately a fixed date, not `new Date()`.
 *
 * Stamping build time meant every deploy claimed every page had changed, even
 * when nothing had. Google learns to distrust lastmod that always says "just
 * now" and starts ignoring it. Bump this by hand when content actually changes.
 */
const LAST_CONTENT_CHANGE = new Date("2026-08-16");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Section hubs. Each is a rankable landing page in its own right and the
    // parent every child page's breadcrumb climbs to.
    ...["/taxi/", "/services/", "/destinations/"].map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Route pages carry the highest commercial intent after the home page.
    ...routes.map((r) => ({
      url: `${SITE_URL}/taxi/${r.slug}/`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Safaris and rentals — bookable in their own right, so they rank above
    // the destination guides but below the transfer routes.
    ...allServices.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}/`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...destinations.map((d) => ({
      url: `${SITE_URL}/destinations/${d.slug}/`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
