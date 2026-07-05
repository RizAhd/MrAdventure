// Fetch premium high-res, commercially-usable destination images from Wikimedia Commons.
import fs from "node:fs";
import path from "node:path";

const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\dest";
fs.mkdirSync(OUT, { recursive: true });
const UA = "MrAdventureTravelSite/1.0 (https://rizahd.github.io/MrAdventure; hyshamhashim@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const strip = (s) => (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const okLicense = (l) => /cc0|public domain|pdm|cc-by(?!-nc)|cc by(?! nc)/i.test(l || "");

async function search(query) {
  const params = new URLSearchParams({
    action: "query", generator: "search",
    gsrsearch: `filetype:bitmap ${query}`, gsrnamespace: "6", gsrlimit: "25",
    prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "1600", format: "json",
  });
  const r = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
  const j = await r.json();
  return Object.values(j.query?.pages || {})
    .map((p) => p.imageinfo?.[0]).filter(Boolean)
    .filter((i) => /image\/(jpeg|png)/.test(i.mime))
    .filter((i) => i.width >= 2000 && i.width > i.height * 1.2 && i.width < i.height * 2.2)
    .map((i) => ({ thumb: i.thumburl, w: i.width, h: i.height, license: strip(i.extmetadata?.LicenseShortName?.value), artist: strip(i.extmetadata?.Artist?.value), page: i.descriptionurl }))
    .filter((i) => okLicense(i.license))
    .sort((a, b) => b.w * b.h - a.w * a.h);
}

const targets = [
  { slug: "kandy", queries: ["Temple of the Tooth Kandy", "Kandy lake Sri Lanka", "Kandy Sri Lanka city"] },
  { slug: "colombo", queries: ["Colombo skyline Sri Lanka", "Colombo Lotus Tower skyline", "Galle Face Colombo"] },
  { slug: "galle", queries: ["Galle Fort lighthouse Sri Lanka", "Galle Dutch Fort", "Galle Fort Sri Lanka aerial"] },
  { slug: "matara", queries: ["Parey Dewa Matara", "Matara Sri Lanka beach", "Matara Sri Lanka"] },
];

const creds = [];
for (const t of targets) {
  let picked = null;
  for (const q of t.queries) {
    try { const res = await search(q); if (res.length) { picked = res[0]; break; } } catch (e) { console.log(`  ! ${t.slug} "${q}": ${e.message}`); }
  }
  if (!picked) { console.log(`  ✗ ${t.slug}: none found`); continue; }
  const dest = path.join(OUT, `${t.slug}.jpg`);
  const img = await fetch(picked.thumb, { headers: { "User-Agent": UA } });
  fs.writeFileSync(dest, Buffer.from(await img.arrayBuffer()));
  console.log(`  ✓ ${t.slug.padEnd(8)} ${picked.w}x${picked.h} [${picked.license}] ${Math.round(fs.statSync(dest).size / 1024)}KB`);
  creds.push(`${t.slug} | ${picked.license} | ${picked.artist} | ${picked.page}`);
}
fs.writeFileSync(path.join(OUT, "_sources.txt"), creds.join("\n"));
console.log("\nSaved to", OUT);
