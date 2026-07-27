/**
 * next/image loader backed by Cloudflare Image Transformations.
 *
 * `output: "export"` has no server, so Next can't resize images at request
 * time — which is why the site previously ran with `images.unoptimized` and
 * shipped every photo at full resolution with no srcset at all (measured: 4.4MB
 * of images on one page load, a 1400px file rendered into a 392px card).
 *
 * Pointing the loader at Cloudflare's /cdn-cgi/image/ endpoint gives the srcset
 * back: Next generates the width variants, Cloudflare does the actual resize
 * and re-encodes to AVIF/WebP per browser via `format=auto`.
 *
 * ONLY WORKS ON CLOUDFLARE. On GitHub Pages /cdn-cgi/ doesn't exist and every
 * image 404s, which is why next.config.ts gates this behind an env var rather
 * than enabling it by default. See docs/cloudflare-migration.md.
 */
export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // `next dev` has no Cloudflare in front of it — serve the original.
  if (process.env.NODE_ENV === "development") return src;

  const options = [`width=${width}`, `quality=${quality ?? 78}`, "format=auto"].join(",");
  // src is already root-relative ("/destinations/ella.webp").
  return `/cdn-cgi/image/${options}${src}`;
}
