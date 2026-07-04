import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest",
            light ? "bg-white/15 text-gold-300" : "bg-brand-100 text-brand-700",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] text-balance",
          light ? "text-white" : "text-brand-950",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            light ? "text-white/80" : "text-ink/70",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
