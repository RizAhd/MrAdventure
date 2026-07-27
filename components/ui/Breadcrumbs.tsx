import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

const SITE_URL = "https://mradventure.lk";

/**
 * Visible breadcrumb trail plus the matching BreadcrumbList JSON-LD.
 *
 * Both come from the same array so the markup can't drift from what's on
 * screen — Google treats mismatched breadcrumb structured data as a violation.
 * The final crumb is the current page and is rendered unlinked.
 */
export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1 text-sm ${light ? "text-white/70" : "text-ink/60"}`}>
          {items.map((c, i) => (
            <li key={c.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />}
              {c.href ? (
                <Link
                  href={c.href}
                  className={`transition-colors ${light ? "hover:text-gold-300" : "hover:text-brand-700"}`}
                >
                  {c.label}
                </Link>
              ) : (
                <span className={light ? "font-medium text-white" : "font-medium text-brand-900"} aria-current="page">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
