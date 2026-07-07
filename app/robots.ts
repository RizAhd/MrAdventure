import type { MetadataRoute } from "next";

// Required for `output: "export"` so this metadata route is emitted as a static file.
export const dynamic = "force-static";

// Allow all search engines to crawl everything, and point them at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mradventure.lk/sitemap.xml",
    host: "https://mradventure.lk",
  };
}
