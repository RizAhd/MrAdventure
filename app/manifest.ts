import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Static export: emitted once at build time as /manifest.webmanifest.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    description: site.blurb,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e6", // --color-sand
    theme_color: "#0d3320", // --color-brand-900, matches the viewport themeColor
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
