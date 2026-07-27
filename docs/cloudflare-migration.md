# Moving mradventure.lk from GitHub Pages to Cloudflare Pages

## Why

The site is a Next.js static export. With `output: "export"` there is no server
to resize images at request time, so `images.unoptimized` is forced and
`next/image` emits **no `srcset` at all**. Measured on the live site:

| | |
|---|---|
| Images per page load | **4,355 KB** (of 5,022 KB total) |
| `<img>` tags with a `srcset` | **0 of 53** |
| Worst offender | `ella-nine-arch.webp` — 657 KB, 1400px wide, rendered into a 392px card |
| Cache headers | `max-age=600` on everything, including hash-immutable `/_next/static/*` |

GitHub Pages can't fix either problem — it has no image resizing and no header
control. Cloudflare fixes both.

## What you get

- `next/image` generates a real `srcset`; Cloudflare resizes and re-encodes to
  AVIF/WebP per browser. Expect **~4.4 MB → roughly 600–900 KB**.
- Long cache headers on immutable assets.
- Same custom domain, same repo, same GitHub-push-to-deploy workflow.

## Cost

Cloudflare Image Transformations is **5,000 unique transformations/month free**
([pricing](https://developers.cloudflare.com/images/pricing/)). A "unique
transformation" is one source image at one set of parameters, cached after that.

This site has 49 images × ~5 widths ≈ **250 total**, generated once and then
served from cache forever. You will not approach the free limit. Beyond it,
it's $0.50 per 1,000 on a paid plan.

## Runbook

Steps 1–4 need your Cloudflare and domain-registrar logins, so they're yours.
Step 5 is already prepared in the repo.

### 1. Add the site to Cloudflare
- Sign up at dash.cloudflare.com, **Add a site** → `mradventure.lk`, Free plan.
- Cloudflare gives you two nameservers.

### 2. Point the domain at Cloudflare
- At whoever you bought `mradventure.lk` from, replace the current nameservers
  with Cloudflare's two.
- Propagation is usually under an hour. **The existing GitHub Pages site keeps
  serving throughout** — nothing goes down.

### 3. Create the Pages project
- Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
  **Connect to Git** → pick `RizAhd/MrAdventure`.
- Build settings:
  - Framework preset: **Next.js (Static HTML Export)**
  - Build command: `npm run build`
  - Build output directory: `out`
  - Environment variable: **`IMAGE_OPTIMIZATION` = `cloudflare`** ← this is the switch
- Deploy, check the `*.pages.dev` preview URL works.

### 4. Enable Image Transformations and attach the domain
- **Images** → **Transformations** → enable for the `mradventure.lk` zone.
  (Easy to miss. Without it every `/cdn-cgi/image/` request 404s.)
- Pages project → **Custom domains** → add `mradventure.lk` and `www`.

### 5. Repo changes (already done)
- `next.config.ts` reads `IMAGE_OPTIMIZATION`; unset keeps the current
  GitHub Pages behaviour, so **nothing changes until you set the variable**.
- `lib/cf-image-loader.ts` builds the `/cdn-cgi/image/` URLs.

### 6. After cutover
- Delete `.github/workflows/nextjs.yml` so both hosts aren't deploying.
- `public/CNAME` is GitHub-Pages-specific and can go.
- Re-check the page in DevTools: images should now have a `srcset` and come back
  as `image/avif` or `image/webp`.
- Resubmit the sitemap in Search Console.

## Rollback

Unset `IMAGE_OPTIMIZATION` and redeploy — you're back to the exact current
behaviour. Point nameservers back at the registrar's defaults to leave
Cloudflare entirely.
