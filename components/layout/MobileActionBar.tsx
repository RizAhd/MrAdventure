import { Phone } from "lucide-react";
import { PHONE_TEL, waEnquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

/** App-like sticky Call + WhatsApp bar, mobile only. */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2.5 p-2.5">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-brand-700 text-base font-semibold text-brand-800 transition active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" />
          Call
        </a>
        <a
          href={waEnquiry("a booking")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp text-base font-semibold text-white shadow-sm transition active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
