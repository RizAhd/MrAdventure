/**
 * Conversion tracking for WhatsApp enquiries.
 *
 * WhatsApp is the only conversion this site has — no cart, no server-side form
 * post, no thank-you page to count. Without an event on the click, Analytics can
 * tell you a route page got 400 visits but not whether any of them produced an
 * enquiry, which makes it impossible to know which pages are worth writing more
 * of. Every wa.me click now reports the page it came from and what the visitor
 * was asking about.
 */

type WaSource = "cta" | "hero-form" | "contact-form";

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Pull the subject out of a wa.me deep link. `waEnquiry` wraps it in asterisks
 * ("I'm interested in *Kumana Safari*"), which is what makes the event useful —
 * it records the vehicle, route or service, not just "someone clicked".
 */
export function subjectFromWaLink(href: string): string | undefined {
  try {
    const text = new URL(href).searchParams.get("text");
    return text?.match(/\*([^*]+)\*/)?.[1];
  } catch {
    return undefined;
  }
}

export function trackWhatsApp({
  source,
  subject,
  label,
}: {
  source: WaSource;
  subject?: string;
  label?: string;
}) {
  // Optional-call on purpose: gtag is absent whenever the Analytics script is
  // blocked, and a missing metric must never break an actual booking.
  window.gtag?.("event", "whatsapp_click", {
    source,
    subject: subject ?? "unspecified",
    label: label ?? "",
    page_path: window.location.pathname,
  });
}
