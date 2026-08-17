import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waEnquiry } from "@/lib/whatsapp";
import { externalLink } from "@/lib/utils";
import { faqs } from "@/data/faqs";

export function FAQ() {
  return (
    <section id="faq" className="section bg-sand">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="Everything you need to know about booking a taxi or cab with Mr Adventure. Still unsure? Just message us."
        />

        {/* Rendered as <details> so every answer is in the visible DOM — the
            FAQPage markup in app/page.tsx covers all of them, and schema whose
            answers aren't on the page is a violation. Same pattern as the
            route pages. */}
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) * 0.05}>
              <details
                open={i === 0}
                className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-base font-semibold text-brand-900 sm:text-lg">{f.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-ink/75">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a
            href={waEnquiry("a booking")}
            {...externalLink}
            className={buttonClasses("whatsapp", "md")}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Still have a question? Ask us
          </a>
        </div>
      </div>
    </section>
  );
}
