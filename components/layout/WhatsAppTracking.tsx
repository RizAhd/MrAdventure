"use client";

import { useEffect } from "react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { subjectFromWaLink, trackWhatsApp } from "@/lib/analytics";

/**
 * Reports every WhatsApp CTA click to Analytics.
 *
 * Done with one delegated listener rather than an onClick on each link: the CTAs
 * are spread across ~30 sites, most of them in server components that can't take
 * a handler at all. This catches every current and future wa.me anchor without
 * touching a single call site.
 *
 * Renders nothing. The two booking forms fire their own events directly, since
 * they open WhatsApp via window.open rather than an anchor.
 */
export function WhatsAppTracking() {
  useEffect(() => {
    const prefix = `https://wa.me/${WHATSAPP_NUMBER}`;

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith(prefix)) return;

      trackWhatsApp({
        source: "cta",
        subject: subjectFromWaLink(href),
        // Which button it was — "Get a taxi quote" vs "Book on WhatsApp" —
        // so identical subjects from different CTAs stay distinguishable.
        label: (anchor.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60),
      });
    };

    // Capture phase, so the event still fires if anything downstream stops
    // propagation before the click reaches the document.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
