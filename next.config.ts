import type { NextConfig } from "next";

// Deployed as a static export on GitHub Pages, served from the custom domain
// https://mradventure.lk/ (set via the public/CNAME file). Because the site is
// served from the domain root (not a /MrAdventure/ subpath), we do NOT set a
// basePath. We still need `output: "export"` for the static build and a custom
// image loader (next/image doesn't optimize images in a static export).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
