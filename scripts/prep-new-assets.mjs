// Optimize the new named fleet photos + new destination stock into public/.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const V = path.join(ROOT, "Vehicles");
const DEST = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\dest";

const jobs = [
  // ---- new named fleet (taxi vehicles) ----
  { src: path.join(V, "Toyota Prius.jpg"), out: "public/fleet/taxi-prius.jpg", w: 1200 },
  { src: path.join(V, "Honda Fit Shuttle.jpg"), out: "public/fleet/fit-shuttle.jpg", w: 1200 },
  { src: path.join(V, "Toyota Hiace 7 sitter.jpg"), out: "public/fleet/hiace-7.jpg", w: 1200 },
  { src: path.join(V, "Toyota Hiace 14 sitter.jpg"), out: "public/fleet/hiace-14.jpg", w: 1200 },
  { src: path.join(V, "Toyota cOaster Bus.jpg"), out: "public/fleet/coaster.jpg", w: 1200 },
  // ---- new destinations ----
  { src: path.join(DEST, "kandy.jpg"), out: "public/destinations/kandy.jpg", w: 1400 },
  { src: path.join(DEST, "colombo.jpg"), out: "public/destinations/colombo.jpg", w: 1400 },
  { src: path.join(DEST, "galle.jpg"), out: "public/destinations/galle.jpg", w: 1400 },
  { src: path.join(DEST, "matara.jpg"), out: "public/destinations/matara.jpg", w: 1400 },
];

for (const j of jobs) {
  const dest = path.join(ROOT, j.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(j.src)
    .rotate()
    .resize({ width: j.w, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(dest);
  console.log(`  ✓ ${j.out} (${Math.round(fs.statSync(dest).size / 1024)}KB)`);
}
console.log("done");
