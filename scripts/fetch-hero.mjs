// Fetch premium high-res, commercially-usable images from Wikimedia Commons.
import fs from "node:fs";
import path from "node:path";

const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\hq";
fs.mkdirSync(OUT, { recursive: true });
const UA = "MrAdventureTravelSite/1.0 (https://mradventure.example; hyshamhashim@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";

const strip = (s) => (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

// license short-names that are safe for commercial use
const okLicense = (l) => /cc0|public domain|pdm|cc-by(?!-nc)|cc by(?! nc)/i.test(l || "");

async function search(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: "6",
    gsrlimit: "20",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: "2400",
    format: "json",
  });
  const r = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  const pages = Object.values(j.query?.pages || {});
  return pages
    .map((p) => p.imageinfo?.[0])
    .filter(Boolean)
    .filter((i) => /image\/(jpeg|png)/.test(i.mime))
    .filter((i) => i.width >= 2200 && i.width > i.height * 1.15) // high-res landscape
    .map((i) => ({
      thumb: i.thumburl,
      w: i.width,
      h: i.height,
      license: strip(i.extmetadata?.LicenseShortName?.value),
      artist: strip(i.extmetadata?.Artist?.value),
      page: i.descriptionurl,
    }))
    .filter((i) => okLicense(i.license))
    .sort((a, b) => b.w * b.h - a.w * a.h);
}

const targets = [
  { slug: "leopard", queries: ["Sri Lankan leopard Yala", "Panthera pardus kotiya", "leopard Sri Lanka"] },
  { slug: "elephant", queries: ["Sri Lankan elephant Udawalawe", "wild elephant Sri Lanka", "Elephas maximus maximus"] },
  { slug: "beach", queries: ["Mirissa beach Sri Lanka", "Nilaveli beach", "beach Sri Lanka aerial"] },
  { slug: "train", queries: ["Nine Arch Bridge train Ella", "Demodara Nine Arches", "train Sri Lanka hill country"] },
  { slug: "sigiriya", queries: ["Sigiriya rock fortress", "Sigiriya aerial", "Sigiriya"] },
  { slug: "tea", queries: ["tea plantation Sri Lanka Ella", "tea estate Nuwara Eliya", "Sri Lanka hill country tea"] },
];

const creds = [];
for (const t of targets) {
  let picked = null;
  for (const q of t.queries) {
    try {
      const res = await search(q);
      if (res.length) {
        picked = res[0];
        break;
      }
    } catch (e) {
      console.log(`  ! ${t.slug} query "${q}" -> ${e.message}`);
    }
  }
  if (!picked) {
    console.log(`  ✗ ${t.slug}: no suitable image`);
    continue;
  }
  const dest = path.join(OUT, `${t.slug}.jpg`);
  const img = await fetch(picked.thumb, { headers: { "User-Agent": UA } });
  const buf = Buffer.from(await img.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`  ✓ ${t.slug.padEnd(9)} ${picked.w}x${picked.h} [${picked.license}] ${Math.round(buf.length / 1024)}KB`);
  creds.push(`${t.slug} | ${picked.license} | ${picked.artist} | ${picked.page}`);
}
fs.writeFileSync(path.join(OUT, "_sources.txt"), creds.join("\n"));
console.log("\nSaved to", OUT);
