/**
 * One-time <symbol> definitions for the icons that repeat heavily on the page.
 *
 * React renders an icon component's full <path> data at every use site, with no
 * deduplication. On the home page that meant 263 inline <svg> elements totalling
 * ~155 kB of markup — a quarter of the whole document — dominated by four icons:
 * Star ×86 (the review stars), WhatsAppIcon ×24 (a single 1,003-character path),
 * GoogleIcon ×20 and Quote ×16.
 *
 * Defining them once here and referencing them with <use href="#i-…"> collapses
 * that to one copy per page. The wrappers in icons.tsx keep the same component
 * API, so call sites are unchanged apart from the import.
 *
 * Rendered once, immediately inside <body> in app/layout.tsx — the reference is
 * same-document, so it works under `output: "export"` with no extra request.
 */
export function IconSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* lucide `star` (v1.23.0, ISC). fill and stroke stay unset here so the
            Tailwind colour classes on the wrapper decide filled vs outline. */}
        <symbol id="i-star" viewBox="0 0 24 24">
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </symbol>

        {/* lucide `quote` (v1.23.0, ISC) */}
        <symbol id="i-quote" viewBox="0 0 24 24">
          <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
          <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
        </symbol>

        <symbol id="i-whatsapp" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
        </symbol>

        {/* Google "G" in brand colour — the reviews badge, where it reads as a
            trust mark. Fills are baked in, so it ignores the wrapper's colour. */}
        <symbol id="i-google" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.642h6.458a5.52 5.52 0 01-2.396 3.622v3.01h3.878c2.269-2.088 3.58-5.165 3.58-8.82z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.956-1.075 7.941-2.908l-3.878-3.01c-1.075.72-2.45 1.145-4.063 1.145-3.125 0-5.77-2.11-6.714-4.946H1.276v3.109A11.995 11.995 0 0012 24z" />
          <path fill="#FBBC05" d="M5.286 14.281A7.212 7.212 0 014.909 12c0-.791.136-1.56.377-2.281V6.61H1.276A11.995 11.995 0 000 12c0 1.936.464 3.769 1.276 5.39l4.01-3.109z" />
          <path fill="#EA4335" d="M12 4.773c1.762 0 3.344.606 4.588 1.795l3.442-3.442C17.951 1.19 15.235 0 12 0 7.31 0 3.255 2.69 1.276 6.609l4.01 3.11C6.23 6.882 8.875 4.773 12 4.773z" />
        </symbol>

        {/* Same glyph with the fills left to inherit currentColor, for the dark
            social-icon circles where four brand colours would muddy. Duplicating
            the paths here still costs less than inlining the monochrome copy at
            each of its use sites. */}
        <symbol id="i-google-mono" viewBox="0 0 24 24">
          <path d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.642h6.458a5.52 5.52 0 01-2.396 3.622v3.01h3.878c2.269-2.088 3.58-5.165 3.58-8.82z" />
          <path d="M12 24c3.24 0 5.956-1.075 7.941-2.908l-3.878-3.01c-1.075.72-2.45 1.145-4.063 1.145-3.125 0-5.77-2.11-6.714-4.946H1.276v3.109A11.995 11.995 0 0012 24z" />
          <path d="M5.286 14.281A7.212 7.212 0 014.909 12c0-.791.136-1.56.377-2.281V6.61H1.276A11.995 11.995 0 000 12c0 1.936.464 3.769 1.276 5.39l4.01-3.109z" />
          <path d="M12 4.773c1.762 0 3.344.606 4.588 1.795l3.442-3.442C17.951 1.19 15.235 0 12 0 7.31 0 3.255 2.69 1.276 6.609l4.01 3.11C6.23 6.882 8.875 4.773 12 4.773z" />
        </symbol>
      </defs>
    </svg>
  );
}
