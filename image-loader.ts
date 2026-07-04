// Custom next/image loader for static export on GitHub Pages.
// Prepends the Pages basePath to local images (next/image does not do this for
// unoptimized images), and leaves absolute URLs untouched.
const BASE_PATH = process.env.NODE_ENV === "production" ? "/MrAdventure" : "";

export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${BASE_PATH}${src}`;
}
