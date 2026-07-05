import { waEnquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={waEnquiry("a booking")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mr Adventure on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-3.5 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 lg:flex"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-40" aria-hidden />
      <WhatsAppIcon className="relative h-6 w-6" />
      <span className="relative hidden text-sm font-semibold sm:inline">Chat with us</span>
    </a>
  );
}
