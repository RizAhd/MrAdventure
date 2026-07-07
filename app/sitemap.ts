import type { MetadataRoute } from "next";

// Required for `output: "export"` so this metadata route is emitted as a static file.
export const dynamic = "force-static";

// Single-page site, so the sitemap has one entry (the home page). If more routes
// are added later, list them here so Google discovers them.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mradventure.lk/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
