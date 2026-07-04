// Fetch several candidate images per subject so we can pick the best.
import fs from "node:fs";
import path from "node:path";

const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\cand";
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const UA = "MrAdventureTravelSite/1.0 (https://mradventure.example; hyshamhashim@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const strip = (s) => (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const okLicense = (l) => /cc0|public domain|pdm|cc-by(?!-nc)|cc by(?! nc)/i.test(l || "");

async function search(query) {
  const params = new URLSearchParams({
    action: "query", generator: "search",
    gsrsearch: `filetype:bitmap ${query}`, gsrnamespace: "6", gsrlimit: "25",
    prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "2400", format: "json",
  });
  const r = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
  const j = await r.json();
  return Object.values(j.query?.pages || {})
    .map((p) => p.imageinfo?.[0]).filter(Boolean)
    .filter((i) => /image\/(jpeg|png)/.test(i.mime))
    .filter((i) => i.width >= 2000 && i.width > i.height * 1.2 && i.width < i.height * 2.4) // landscape, not extreme panorama
    .map((i) => ({ thumb: i.thumburl, w: i.width, h: i.height, license: strip(i.extmetadata?.LicenseShortName?.value), artist: strip(i.extmetadata?.Artist?.value), page: i.descriptionurl }))
    .filter((i) => okLicense(i.license))
    .sort((a, b) => b.w * b.h - a.w * a.h);
}

const subjects = [
  { slug: "elephant", n: 3, queries: ["wild elephant Yala National Park", "Sri Lankan elephant grassland", "elephant Minneriya"] },
  { slug: "sigiriya", n: 2, queries: ["Sigiriya rock fortress front", "Lion Rock Sigiriya"] },
  { slug: "fishermen", n: 2, queries: ["stilt fishermen Sri Lanka", "stilt fishing Weligama"] },
  { slug: "tea", n: 2, queries: ["tea plantation rows Sri Lanka", "tea estate Haputale"] },
];

const creds = [];
for (const s of subjects) {
  const seen = new Set();
  let saved = 0;
  for (const q of s.queries) {
    let res = [];
    try { res = await search(q); } catch { res = []; }
    for (const pick of res) {
      if (saved >= s.n) break;
      if (seen.has(pick.thumb)) continue;
      seen.add(pick.thumb);
      const name = `${s.slug}-${saved + 1}.jpg`;
      try {
        const img = await fetch(pick.thumb, { headers: { "User-Agent": UA } });
        const buf = Buffer.from(await img.arrayBuffer());
        fs.writeFileSync(path.join(OUT, name), buf);
        console.log(`  ✓ ${name.padEnd(14)} ${pick.w}x${pick.h} [${pick.license}] ${Math.round(buf.length / 1024)}KB`);
        creds.push(`${name} | ${pick.license} | ${pick.artist} | ${pick.page}`);
        saved++;
      } catch (e) { console.log(`  ! ${name} download failed: ${e.message}`); }
    }
    if (saved >= s.n) break;
  }
  if (!saved) console.log(`  ✗ ${s.slug}: none found`);
}
fs.writeFileSync(path.join(OUT, "_sources.txt"), creds.join("\n"));
console.log("\nSaved to", OUT);
