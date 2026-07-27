import type { MetadataRoute } from "next";
import { routes } from "@/data/routes";
import { destinations } from "@/data/destinations";

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
const LAST_CONTENT_CHANGE = new Date("2026-07-28");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Route pages carry the highest commercial intent after the home page.
    ...routes.map((r) => ({
      url: `${SITE_URL}/taxi/${r.slug}/`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...destinations.map((d) => ({
      url: `${SITE_URL}/destinations/${d.slug}/`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
