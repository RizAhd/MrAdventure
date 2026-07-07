import type { NextConfig } from "next";

// Static export deployed to GitHub Pages and served from the custom domain
// https://mradventure.lk/ (see public/CNAME and .github/workflows/nextjs.yml).
// Because the site is served from the domain root there is NO basePath, so image
// and asset paths resolve as-is. `images.unoptimized` is required for a static
// export (there is no server to optimize images at request time).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
