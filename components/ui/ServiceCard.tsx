import Image from "next/image";
import { Check } from "lucide-react";
import type { Service } from "@/data/services";
import { waEnquiry } from "@/lib/whatsapp";
import { blurProps } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

export function ServiceCard({ service }: { service: Service }) {
  const cta = service.category === "safari" ? "Book on WhatsApp" : "Rent on WhatsApp";
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          {...blurProps(service.image)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent" />
        <h3 className="absolute bottom-4 left-5 font-display text-2xl font-bold text-white drop-shadow">
          {service.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-ink/70">{service.blurb}</p>
        <ul className="mt-4 space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm font-medium text-brand-800">
              <Check className="h-4 w-4 shrink-0 text-gold-600" />
              {f}
            </li>
          ))}
        </ul>
        <a
          href={waEnquiry(service.subject)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("primary", "md", "mt-6 w-full")}
        >
          <WhatsAppIcon className="h-5 w-5" />
          {cta}
        </a>
      </div>
    </article>
  );
}
