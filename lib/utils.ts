import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { blur } from "@/data/blur";

/** Merge Tailwind classes with conditional logic. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Props for every outbound link — WhatsApp deep-links and social profiles.
 *
 * `nofollow` is the point: the page carries ~38 outbound links, almost all of
 * them the same wa.me booking CTA repeated per card. They're conversion paths,
 * not editorial citations, so they shouldn't bleed link equity or read as a
 * link farm. `noopener noreferrer` stays for the usual target="_blank" safety.
 *
 * Spread this instead of hand-writing target/rel so the policy lives in one
 * place, the way the phone number lives in lib/whatsapp.ts.
 */
export const externalLink = {
  target: "_blank",
  rel: "noopener noreferrer nofollow",
} as const;

/**
 * next/image blur-up props for a local image path. Returns `placeholder="blur"`
 * with the generated tiny base64 for a smooth fade-in, or nothing if there's no
 * placeholder for that src (degrades safely).
 */
export function blurProps(src: string) {
  const blurDataURL = blur[src];
  return blurDataURL ? ({ placeholder: "blur", blurDataURL } as const) : {};
}
