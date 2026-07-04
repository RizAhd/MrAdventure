# Mr Adventure Tours & Travels — dev guide

Single-page marketing site for a Sri Lankan tour operator. Bookings are **WhatsApp-only** (no backend).

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS **v4** (CSS `@theme` in `app/globals.css`, no
`tailwind.config.js`) · Framer Motion · lucide-react.

## Layout of the code
- `app/layout.tsx` — fonts (Poppins/Inter), SEO metadata, wraps Navbar + Footer + FloatingWhatsApp.
- `app/page.tsx` — composes the sections in order + JSON-LD.
- `components/sections/*` — one file per page section (Hero, Safaris, Rentals, Taxi, Destinations,
  Fleet, Gallery, WhyUs, Testimonials, Contact).
- `components/layout/*` — Navbar, Footer, FloatingWhatsApp.
- `components/ui/*` — Button/`buttonClasses`, Reveal, SectionHeading, ServiceCard, brand `icons`.
- `lib/whatsapp.ts` — `waLink` / `waEnquiry` / `waBooking`; **the number lives here** (`WHATSAPP_NUMBER`).
- `data/*` — all editable content (site, services, destinations, fleet, gallery).

## Conventions
- Brand colors are Tailwind tokens from `@theme`: `brand-50..950` (green), `gold-300..700`, plus
  `sand`, `cream`, `ink`, `whatsapp`. Use e.g. `bg-brand-700`, `text-gold-400`.
- Fonts: `font-display` (Poppins) for headings, `font-sans` (Inter) for body.
- Every booking/enquiry CTA must go through the `lib/whatsapp.ts` helpers so the number stays in one place.
- Interactive pieces are client components (`"use client"`): Navbar, Hero, Fleet, Gallery, Contact, Reveal.
- Images use `next/image`; source photos are optimized into `public/` via `scripts/prep-images.mjs`.

## Verify a change
`npm run build` (type-check + build), then `npm run start` and open the page. Screenshot helper:
`node scripts/shoot.mjs` (needs the server running; uses local Chrome via puppeteer-core).
