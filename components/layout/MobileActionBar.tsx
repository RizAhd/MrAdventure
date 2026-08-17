import { Phone } from "lucide-react";
import { PHONE_TEL, PHONE_DISPLAY, waEnquiry } from "@/lib/whatsapp";
import { externalLink } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Two round, icon-only floating action buttons in the bottom-right corner
 * (Call on top, WhatsApp below). Mobile/tablet only — desktop uses FloatingWhatsApp.
 */
export function MobileActionBar() {
  return (
    <div
      className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Call */}
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label={`Call ${PHONE_DISPLAY}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-gold-400 to-gold-600 text-brand-950 shadow-lg shadow-black/20 transition-transform active:scale-95"
      >
        <Phone className="h-6 w-6" />
      </a>

      {/* WhatsApp */}
      <a
        href={waEnquiry("a booking")}
        {...externalLink}
        aria-label="Chat with Mr Adventure on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition-transform active:scale-95"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-40" aria-hidden />
        <WhatsAppIcon className="relative h-6 w-6" />
      </a>
    </div>
  );
}
