# Mr Adventure Tours & Travels — Project Handoff / Context

> Read this first when continuing work. It captures everything needed to run, edit, and deploy the site.

## 1. What this is
A single-page **marketing website** for **Mr Adventure Tours & Travels**, a Sri Lankan (Arugam Bay–based)
operator whose **main service is an island-wide taxi / airport-transfer service**, plus wildlife safaris
and scooter / tuk-tuk / bicycle rentals. **Bookings are WhatsApp-only** (no backend/database) — every CTA
opens WhatsApp with a pre-filled message.

- **Live site:** https://rizahd.github.io/MrAdventure/
- **Repo:** https://github.com/RizAhd/MrAdventure (public), branch `main`, GitHub user **RizAhd**
- **WhatsApp / phone:** +94 77 890 9277 (digits `94778909277`) — lives in `lib/whatsapp.ts`
- **Socials:** Instagram https://www.instagram.com/mradventure40 · Facebook
  https://www.facebook.com/share/p/185CRRJ4FF/ · TikTok = `#` placeholder (no link yet). In `data/site.ts`.

## 2. Stack
Next.js **16** (App Router) · TypeScript · **Tailwind CSS v4** (CSS `@theme` in `app/globals.css`, NO
`tailwind.config.js`) · Framer Motion · lucide-react · **cobe** (globe) · sharp (build-time image opt).
Node 20 in CI, Node 26 locally.

## 3. ⚠️ Deployment — the important part
The site is a **static export deployed to GitHub Pages at a sub-path** `/MrAdventure/`. Three things make
that work — do not break them:
1. **`next.config.ts`**: `output: "export"`, `basePath: "/MrAdventure"` (prod only), `trailingSlash: true`,
   and a **custom image loader** (`images.loader: "custom", loaderFile: "./image-loader.ts"`).
2. **`image-loader.ts`**: prepends the basePath to every image URL. This is REQUIRED — plain `next/image`
   (unoptimized) does NOT add basePath, which 404s every photo on Pages. Bug history: this was the
   "photos not loading" issue.
3. **`.github/workflows/deploy.yml`**: on push to `main` → build static export → deploy to Pages
   (`configure-pages@v5` with `enablement: true`, `deploy-pages@v4`). There must be **only this one**
   Pages workflow (a duplicate `nextjs.yml` template once fought it and re-broke images — it was deleted).

### ⚠️ CURRENT STATE (2026-07-05) — read this
GitHub **Pages source is "Deploy from a branch" (main /root)**, NOT GitHub Actions. That made Pages run
**Jekyll**, which rendered `README.md` as the homepage and 404'd all assets ("website not showing" bug).
Because the source is a branch, the Actions `deploy-pages` artifact is often ignored and the two race.

**Applied workaround (works today):** the **built site is committed to the branch root** (`index.html`,
`_next/`, `fleet/`, `gallery/`, `destinations/`, `hero/`, `logos/`, `og.jpg`, `icon.png`, `404.html`,
plus `.txt` route files) **and a root `.nojekyll`** disables Jekyll — so branch-mode Pages serves the real
site at `/MrAdventure/`. **Consequence:** every content change now needs `npm run build` + copy `out/*` to
the repo root + commit (see `robocopy out . /E /XD out`), because the branch root IS what's served.

**RECOMMENDED clean fix (owner, 20 sec):** GitHub repo → **Settings → Pages → Build and deployment →
Source → "GitHub Actions"**. After that, the Actions workflow (`.github/workflows/deploy.yml`) serves the
`out/` artifact cleanly and you can **delete the build files from the repo root** (index.html, _next/,
404*, og.jpg, icon.png, the duplicated image folders at root, .nojekyll, *.txt) — keep them only in
`public/` + `out/`. Then deploy = just push.

**Deploy = just push to `main`.** A repo hook **auto-commits and auto-pushes** file changes with generated
messages, so often your edits are already committed. Always `git add -A`, verify with `git status`, and
check `git rev-list --count origin/main..HEAD`. The GitHub Action then deploys in ~1–2 min.

Verify a deploy:
```
# Actions run status (unauthenticated works on public repo)
https://api.github.com/repos/RizAhd/MrAdventure/actions/runs?per_page=5
# Then confirm live HTML/text, e.g. it should contain "Island-Wide" and /MrAdventure/... image paths
```

## 4. Run / build locally
```
npm install
npm run dev            # localhost:3000 (basePath is prod-only, so dev serves at root)
npm run build          # static export -> ./out
```
`npm run start` does NOT work (static export). To preview the BUILT output with correct basePath, serve
`out/` under a `/MrAdventure/` path (see `scripts/static-serve.mjs`).

### Windows dev-server gotcha (known issue)
The Next dev server on this machine sometimes keeps serving **stale code** (an old server holds the port).
If screenshots/preview show old content: kill node and restart, or verify against the real build:
```
# kill everything, then build + serve the built output for screenshots
Get-CimInstance Win32_Process -Filter "Name='node.exe'" | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
npm run build
robocopy out <STAGE>\MrAdventure /MIR
node scripts/static-serve.mjs         # serves <STAGE> at http://localhost:3300/MrAdventure/
node scripts/shoot-built.mjs          # puppeteer screenshots -> scratchpad/shots
```
Screenshots use **puppeteer-core + local Chrome** (`C:\Program Files\Google\Chrome\Application\chrome.exe`).
Chrome `--headless` + `--virtual-time-budget` HANGS on this site (infinite CSS animations) — use puppeteer
with `waitUntil:"domcontentloaded"` + a fixed wait, NOT `networkidle`/virtual-time.

## 5. Code layout
- `app/layout.tsx` — fonts (**Space Grotesk** display + **Manrope** body via next/font), SEO metadata,
  viewport/theme-color, wraps Navbar + Footer + FloatingWhatsApp + **MobileActionBar**.
- `app/page.tsx` — section order + JSON-LD. Current order: **Hero → Stats → Taxi → Fleet → Destinations →
  Safaris → Rentals → Gallery → WhyUs → Worldwide (globe) → Testimonials → Contact**.
- `app/globals.css` — Tailwind v4 `@theme` tokens (brand green `brand-50..950`, `gold-300..700`, `sand`,
  `cream`, `ink`, `whatsapp`), fonts, keyframes (`marquee`, `float-up`), mobile-native base styles.
- `components/sections/*` — one file per section.
- `components/layout/*` — Navbar, Footer, FloatingWhatsApp (desktop only), MobileActionBar (sticky
  Call+WhatsApp bar, mobile only).
- `components/ui/*` — `Button` (`buttonClasses` variants), `Reveal`, `SectionHeading`, `ServiceCard`,
  brand `icons` (WhatsApp/FB/IG/TikTok SVGs), `modern-hero-section` (HeroCollage — used by the Gallery),
  `cobe-globe` (Globe — used by Worldwide section).
- `lib/whatsapp.ts` — `waLink` / `waEnquiry` / `waBooking`; the number lives here.
- `lib/utils.ts` — `cn()`.
- `data/*` — all editable content: `site.ts` (name, tagline, socials, nav, stats), `services.ts`
  (safaris + rentals), `destinations.ts` (10 places), `fleet.ts` (vehicles + capacity), `gallery.ts`.
- `scripts/*` — image tooling (see below) + screenshot/serve helpers.
- `public/` — `hero/`, `fleet/`, `gallery/`, `destinations/`, `logos/`, `og.jpg`, favicon (`app/icon.png`).
- Originals kept in `Places/`, `Vehicles/`, `logos/` (source photos; the owner adds new named vehicle
  files here, e.g. `Vehicles/Toyota Prius.jpg`).

## 6. Images
- Optimized via **sharp** scripts into `public/`. Key scripts: `scripts/prep-images.mjs` (original set),
  `scripts/prep-new-assets.mjs` (named fleet + new destinations), `scripts/fix-safari-jeep.mjs`,
  `scripts/fetch-*.mjs` (download licensed high-res photos from **Wikimedia Commons** — commercial-safe
  CC-BY/CC0; Unsplash is blocked without a key, Openverse is low-res/NC).
- Attribution for all stock photos is in `CREDITS.md` (keep it updated when adding stock).
- **Rule:** any new `public/...` image must be referenced via `next/image` so the custom loader adds the
  basePath. Never hardcode `/hero/x.jpg` in raw `<img>` — it 404s on Pages.

## 7. Design system / brand
- Colors: forest **green** + logo **gold**, warm neutral `sand`/`cream`, dark `ink`. Use tokens:
  `bg-brand-700`, `text-gold-400`, `bg-sand`, etc.
- Fonts: `font-display` = Space Grotesk (headings), `font-sans` = Manrope (body).
- Hero = premium **dark green gradient** with floating vehicle photos + glow orbs + dot texture.
- Buttons: `components/ui/Button.tsx` `buttonClasses(variant, size)` — variants `primary`/`gold`/
  `whatsapp`/`outline`/`ghost` (gradients + hover-lift). Change here to restyle all CTAs at once.
- Mobile-native: sticky bottom Call/WhatsApp bar (`MobileActionBar`), safe-area insets, big tap targets.

## 8. Integrated components (per 21st.dev-style requests)
- `components/ui/modern-hero-section.tsx` (**HeroCollage**) — re-themed to green/gold, `next/image`.
  Used in the **Gallery** ("Real moments"): floating collage on desktop, horizontal swipe carousel on
  mobile, tap → lightbox.
- `components/ui/cobe-globe.tsx` (**Globe**) — re-themed, options cast to `any` because the real `cobe`
  package supports **markers only, not arcs** (so the globe shows city dots, no arc lines). Used in the
  **Worldwide** section ("Guests from around the world", drag-to-spin).
- The `scroll-morph-hero` component was intentionally **NOT** added: it hijacks page scroll (traps
  visitors on a one-pager) and isn't mobile-friendly. Its floating/animated-photo spirit was delivered in
  the hero using vehicle photos instead. If wanted, add it as a proper page-scroll-driven (not
  wheel-hijacking) section.

## 9. Business facts (for content)
- Services: Kumana Safari, Lagoon Safari, Boat Safari, Scooter Rent, Tuk Tuk Rent, Bicycle Rent, and the
  main **All-Island Taxi** (airport drop & pickup). "Share Taxi" was removed per owner.
- Fleet (exact names + capacity): Toyota Prius (1–3), Honda Fit Shuttle (1–4), Toyota HiAce 7-Seater (1–7),
  Toyota HiAce 14-Seater (1–14), Toyota Coaster Bus (up to 27), Safari Jeep, Scooter, Tuk Tuk, Bicycle.
- Destinations (10): Colombo, Kandy, Sigiriya, Dambulla, Ella, Galle, Matara, Arugam Bay, Pasikuda,
  Trincomalee.
- Tagline: "Safe Travel · Best Prices · Reliable Service".

## 10. Outstanding TODOs / recommended next steps
1. **Prices / a From→To fare estimator** in the hero — biggest booking lever for a taxi.
2. **Real Google reviews** to replace the placeholder testimonials in `components/sections/Testimonials.tsx`
   (currently clearly-marked sample data).
3. **Transparent logo + favicon** — current `public/logos/logo-badge.jpg` is a low-res yellow badge that
   looks pixelated in the navbar.
4. **Real TikTok link** (`data/site.ts`).
5. **FAQ section + FAQ schema** ("Colombo airport → Ella price?") for taxi SEO.
6. Optional: multi-language, blur-up image placeholders, privacy-friendly analytics, custom domain.

## 11. Security note
A 21st.dev API key was pasted in chat earlier — the owner should **rotate it** at https://21st.dev/mcp.
No secrets are committed (`.mcp.json` references `${API_KEY_21ST}` env var, never set in the repo).
