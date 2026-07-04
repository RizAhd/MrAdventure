import type { NextConfig } from "next";

// Deployed as a GitHub Pages project site at https://rizahd.github.io/MrAdventure/
// so we need a static export, a basePath, and a custom image loader that adds the
// basePath to image URLs (next/image doesn't do this for static/unoptimized images).
const isProd = process.env.NODE_ENV === "production";
const repoBase = "/MrAdventure";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoBase : "",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
