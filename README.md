# Mr Adventure Tours & Travels — Website

Marketing website for **Mr Adventure Tours & Travels** (Arugam Bay, Sri Lanka): wildlife safaris,
scooter / tuk-tuk / bicycle rentals, and island-wide taxi. Bookings happen through **WhatsApp**
(no database) — every call-to-action opens WhatsApp to **+94 77 890 9277** with a pre-filled message.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**.

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
```

## Where to edit content (no code needed for most changes)
All site content lives in plain files under [`data/`](data/):

| File | What it controls |
|------|------------------|
| `data/site.ts` | Business name, tagline, location, **social media links**, nav, stats |
| `data/services.ts` | Safaris & rentals (titles, descriptions, features, images) |
| `data/destinations.ts` | Destination cards (Sigiriya, Ella, …) |
| `data/fleet.ts` | Vehicle fleet list |
| `data/gallery.ts` | Photo gallery |
| `lib/whatsapp.ts` | The WhatsApp number and message templates |

Images live in [`public/`](public/). To re-import/optimize source photos, edit the mapping in
[`scripts/prep-images.mjs`](scripts/prep-images.mjs) and run `node scripts/prep-images.mjs`.
The original photos are kept in `Places/`, `Vehicles/`, `logos/` as backup.

## Deploy (free)
The site is a static export deployed to **GitHub Pages** by GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) and served from the
custom domain **https://mradventure.lk/**:
1. In the repo, set **Settings → Pages → Source = "GitHub Actions"** (one-time).
2. In **Settings → Pages → Custom domain**, enter `mradventure.lk` (one-time). The
   [`public/CNAME`](public/CNAME) file keeps that setting on every deploy.
3. Push to `main` — the workflow runs `npm run build`, then publishes the `out/` folder.
4. Because the site serves from the **domain root**, there is **no `basePath`**
   ([`next.config.ts`](next.config.ts)) and [`image-loader.ts`](image-loader.ts) returns
   paths unchanged. (If you ever move back to `<user>.github.io/MrAdventure/`, restore the
   `basePath: "/MrAdventure"` and the image-loader prefix.)
5. The site URL is set in `metadataBase` inside [`app/layout.tsx`](app/layout.tsx).

### DNS at Cloudflare
Point the domain at GitHub Pages (Cloudflare proxy can stay **on**, orange cloud):
- Apex `mradventure.lk` → four **A** records: `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153` (and optionally the matching **AAAA** records).
- `www` → **CNAME** → `rizahd.github.io`.
- In Cloudflare **SSL/TLS → Overview**, set encryption mode to **Full** (not Flexible), or
  you'll get a redirect loop.

## Still to do before launch
- [ ] Add real **Facebook / Instagram / TikTok** URLs in `data/site.ts` (currently `#`).
- [ ] Replace the **sample reviews** in `components/sections/Testimonials.tsx` with real ones.
- [ ] Confirm **"Boat Safari"** wording (the poster prints "Board Safari").
- [ ] Add prices, or keep "best price on WhatsApp".
- [ ] Confirm **+94 77 890 9277** has WhatsApp active.
- [ ] (Nice) Swap licensed stock landmark/tuk-tuk/bicycle photos for your own — see [CREDITS.md](CREDITS.md).

## Security
The 21st.dev API key was shared in plaintext during setup — **rotate it** at https://21st.dev/mcp.
