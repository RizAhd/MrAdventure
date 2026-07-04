// Optimize the chosen premium hero images into public/.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const HQ = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\hq";
const CAND = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\cand";

const heroJobs = [
  { src: path.join(HQ, "leopard.jpg"), out: "public/hero/leopard.jpg" },
  { src: path.join(CAND, "elephant-1.jpg"), out: "public/hero/elephant.jpg" },
  { src: path.join(CAND, "sigiriya-1.jpg"), out: "public/hero/sigiriya.jpg" },
  { src: path.join(HQ, "beach.jpg"), out: "public/hero/beach.jpg" },
  { src: path.join(CAND, "fishermen-2.jpg"), out: "public/hero/fishermen.jpg" },
];

for (const j of heroJobs) {
  const dest = path.join(ROOT, j.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(j.src)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(dest);
  const kb = Math.round(fs.statSync(dest).size / 1024);
  console.log(`  ✓ ${j.out} (${kb}KB)`);
}

// Upgrade the Sigiriya destination card with the premium shot
await sharp(path.join(CAND, "sigiriya-1.jpg"))
  .rotate()
  .resize({ width: 1400, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true, progressive: true })
  .toFile(path.join(ROOT, "public/destinations/sigiriya.jpg"));
console.log("  ✓ public/destinations/sigiriya.jpg (upgraded)");

// Refresh the social share image from the premium leopard
await sharp(path.join(HQ, "leopard.jpg"))
  .rotate()
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));
console.log("  ✓ public/og.jpg (refreshed)");

console.log("\nDone.");
