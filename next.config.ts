import type { NextConfig } from "next";

// Deployed as a GitHub Pages project site at https://rizahd.github.io/MrAdventure/
// so we need a static export, a basePath, and unoptimized images (no image server on Pages).
const isProd = process.env.NODE_ENV === "production";
const repoBase = "/MrAdventure";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? repoBase : "",
  trailingSlash: true,
};

export default nextConfig;
