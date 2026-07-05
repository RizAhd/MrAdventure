// Fetch premium high-res, commercially-usable Sri Lanka road/travel images (taxi-themed hero).
import fs from "node:fs";
import path from "node:path";

const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\roads";
fs.mkdirSync(OUT, { recursive: true });
const UA = "MrAdventureTravelSite/1.0 (https://rizahd.github.io/MrAdventure; hyshamhashim@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const strip = (s) => (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const okLicense = (l) => /cc0|public domain|pdm|cc-by(?!-nc)|cc by(?! nc)/i.test(l || "");

async function search(query) {
  const params = new URLSearchParams({
    action: "query", generator: "search",
    gsrsearch: `filetype:bitmap ${query}`, gsrnamespace: "6", gsrlimit: "25",
    prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "2000", format: "json",
  });
  const r = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
  const j = await r.json();
  return Object.values(j.query?.pages || {})
    .map((p) => p.imageinfo?.[0]).filter(Boolean)
    .filter((i) => /image\/(jpeg|png)/.test(i.mime))
    .filter((i) => i.width >= 2200 && i.width > i.height * 1.3 && i.width < i.height * 2.2) // wide landscape
    .map((i) => ({ thumb: i.thumburl, w: i.width, h: i.height, license: strip(i.extmetadata?.LicenseShortName?.value), artist: strip(i.extmetadata?.Artist?.value), page: i.descriptionurl }))
    .filter((i) => okLicense(i.license))
    .sort((a, b) => b.w * b.h - a.w * a.h);
}

const targets = [
  { slug: "coast-road", queries: ["Sri Lanka southern coastal road", "coastal road Sri Lanka palm", "Galle Matara road coast"] },
  { slug: "hill-road", queries: ["Ella Sri Lanka road hills", "Sri Lanka hill country road", "mountain road Sri Lanka"] },
  { slug: "tea-road", queries: ["tea estate road Sri Lanka", "Nuwara Eliya road tea", "road tea plantation Sri Lanka"] },
  { slug: "highway", queries: ["Southern Expressway Sri Lanka", "Sri Lanka expressway highway", "Colombo Katunayake expressway"] },
  { slug: "scenic-road", queries: ["Sri Lanka road palm trees", "rural road Sri Lanka countryside", "Sri Lanka road landscape"] },
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
  console.log(`  ✓ ${t.slug.padEnd(11)} ${picked.w}x${picked.h} [${picked.license}] ${Math.round(fs.statSync(dest).size / 1024)}KB`);
  creds.push(`${t.slug} | ${picked.license} | ${picked.artist} | ${picked.page}`);
}
fs.writeFileSync(path.join(OUT, "_sources.txt"), creds.join("\n"));
console.log("\nSaved to", OUT);
