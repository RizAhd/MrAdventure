import { Phone } from "lucide-react";
import { PHONE_TEL, waEnquiry } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

/** App-like sticky Call + WhatsApp bar, mobile only. */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/95 shadow-[0_-8px_24px_-12px_rgba(6,32,21,0.35)] backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-lg gap-3 p-3">
        <a href={`tel:${PHONE_TEL}`} className={buttonClasses("gold", "lg", "flex-1")}>
          <Phone className="h-5 w-5" />
          Call
        </a>
        <a
          href={waEnquiry("a booking")}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("whatsapp", "lg", "flex-1")}
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
