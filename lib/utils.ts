import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { blur } from "@/data/blur";

/** Merge Tailwind classes with conditional logic. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * next/image blur-up props for a local image path. Returns `placeholder="blur"`
 * with the generated tiny base64 for a smooth fade-in, or nothing if there's no
 * placeholder for that src (degrades safely).
 */
export function blurProps(src: string) {
  const blurDataURL = blur[src];
  return blurDataURL ? ({ placeholder: "blur", blurDataURL } as const) : {};
}
