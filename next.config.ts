import type { NextConfig } from "next";

// Static export served from the domain root at https://mradventure.lk/ — no
// basePath, so image and asset paths resolve as-is.
//
// IMAGE OPTIMIZATION is switched by the IMAGE_OPTIMIZATION env var:
//
//   unset / anything else  → images.unoptimized. Required on GitHub Pages,
//                            which has no image resizing. Every photo ships at
//                            full resolution with no srcset (measured: 4.4MB of
//                            images per page load).
//   "cloudflare"           → custom loader hitting /cdn-cgi/image/. Restores
//                            srcset + AVIF/WebP. Only valid once the site is
//                            actually behind Cloudflare with Image
//                            Transformations enabled, otherwise images 404.
//
// See docs/cloudflare-migration.md for the switchover runbook.
const useCloudflareImages = process.env.IMAGE_OPTIMIZATION === "cloudflare";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: useCloudflareImages
    ? { loader: "custom", loaderFile: "./lib/cf-image-loader.ts" }
    : { unoptimized: true },
};

export default nextConfig;
