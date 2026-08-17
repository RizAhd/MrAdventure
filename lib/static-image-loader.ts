// Relative rather than the "@/" alias — the loader file is bundled through a
// separate path to next.config.ts and doesn't reliably see tsconfig paths.
import { imageSizes } from "../data/image-sizes";

/**
 * next/image loader backed by width variants pre-generated at build time.
 *
 * `output: "export"` has no server to resize on request, so the site ran with
 * `images.unoptimized`: no srcset at all, and every photo delivered at full
 * resolution regardless of the box it rendered into.
 *
 * scripts/gen-image-sizes.mjs writes `<name>-<width>.webp` beside each source
 * and records the available widths in data/image-sizes.ts. This resolves a
 * request for width N to the narrowest variant that still covers it, so a card
 * at 390px gets the 480px file rather than the 1400px original.
 *
 * Unlike the Cloudflare loader this needs no particular host — the files are
 * just sitting in public/.
 */
export default function staticImageLoader({ src, width }: { src: string; width: number }): string {
  const available = imageSizes[src];
  // Images below the narrowest rung (logos, icons) aren't resized at all.
  if (!available || available.length === 0) return src;

  const pick = available.find((w) => w >= width) ?? available[available.length - 1];
  return src.replace(/\.webp$/i, `-${pick}.webp`);
}
