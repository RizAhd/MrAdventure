import type { NextConfig } from "next";

// Static export served from the domain root at https://mradventure.lk/ — no
// basePath, so image and asset paths resolve as-is.
//
// IMAGE OPTIMIZATION is switched by the IMAGE_OPTIMIZATION env var:
//
//   unset (default)  → pre-generated width variants + lib/static-image-loader.
//                      scripts/gen-image-sizes.mjs writes <name>-<width>.webp
//                      beside each photo at build time, so srcset works on ANY
//                      static host, GitHub Pages included. Run that script
//                      whenever images in public/ change.
//   "cloudflare"     → custom loader hitting /cdn-cgi/image/, which resizes and
//                      re-encodes to AVIF/WebP on the fly. Fewer files in the
//                      repo, but only valid once the site is actually behind
//                      Cloudflare with Image Transformations enabled.
//   "none"           → images.unoptimized. The old default. Every photo ships
//                      at full resolution with no srcset (measured: 6.94MB of
//                      images on the home page). Escape hatch only.
//
// See docs/cloudflare-migration.md for the Cloudflare switchover runbook.
const mode = process.env.IMAGE_OPTIMIZATION ?? "static";

// Must match LADDER in scripts/gen-image-sizes.mjs — Next only asks the loader
// for widths in this list, and the loader can only answer with files that exist.
const deviceSizes = [320, 480, 640, 828, 1080, 1400, 1920];

const images: NextConfig["images"] =
  mode === "none"
    ? { unoptimized: true }
    : mode === "cloudflare"
      ? { loader: "custom", loaderFile: "./lib/cf-image-loader.ts", deviceSizes }
      : { loader: "custom", loaderFile: "./lib/static-image-loader.ts", deviceSizes };

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images,
};

export default nextConfig;
