// Custom next/image loader for the static export.
// The site is served from the custom domain root (https://mradventure.lk/), so
// local image paths already resolve correctly and need no basePath prefix.
// Absolute (http/https) URLs are returned untouched.
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  return src;
}
