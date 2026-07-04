/* Optimize + rename source photos into public/. Run: node scripts/prep-images.mjs */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const P = path.join(ROOT, "Places");
const V = path.join(ROOT, "Vehicles");
const L = path.join(ROOT, "logos");
const S = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\stock";

function byNum(dir, num) {
  const re = new RegExp(`^photo_${num}_`);
  const f = fs.readdirSync(dir).find((n) => re.test(n));
  if (!f) throw new Error(`no photo ${num} in ${dir}`);
  return path.join(dir, f);
}
const stock = (name) => path.join(S, name);

const jobs = [
  // ---- gallery (real photos) ----
  { src: byNum(P, 4), out: "public/gallery/leopard-1.jpg", w: 1600 },
  { src: byNum(P, 24), out: "public/gallery/leopard-2.jpg", w: 1600 },
  { src: byNum(P, 25), out: "public/gallery/leopard-3.jpg", w: 1600 },
  { src: byNum(P, 11), out: "public/gallery/elephant-1.jpg", w: 1600 },
  { src: byNum(P, 20), out: "public/gallery/elephant-2.jpg", w: 1600 },
  { src: byNum(P, 1), out: "public/gallery/crocodiles.jpg", w: 1600 },
  { src: byNum(P, 12), out: "public/gallery/buffalo.jpg", w: 1600 },
  { src: byNum(P, 18), out: "public/gallery/deer.jpg", w: 1600 },
  { src: byNum(P, 16), out: "public/gallery/birds-sunset.jpg", w: 1600 },
  { src: byNum(P, 5), out: "public/gallery/jeep-tourists-1.jpg", w: 1600 },
  { src: byNum(P, 6), out: "public/gallery/jeep-tourists-2.jpg", w: 1600 },
  { src: byNum(P, 13), out: "public/gallery/boat-1.jpg", w: 1600 },
  { src: byNum(P, 15), out: "public/gallery/boat-2.jpg", w: 1600 },
  { src: byNum(P, 17), out: "public/gallery/boat-mangrove.jpg", w: 1600 },
  { src: byNum(P, 7), out: "public/gallery/scooter-park.jpg", w: 1600 },
  { src: byNum(P, 8), out: "public/gallery/scooter-group.jpg", w: 1600 },
  { src: byNum(P, 9), out: "public/gallery/scooter-couple.jpg", w: 1600 },
  // ---- fleet ----
  { src: byNum(V, 30), out: "public/fleet/safari-jeep.jpg", w: 1200 },
  { src: byNum(V, 3), out: "public/fleet/scooter.jpg", w: 1200 },
  { src: stock("tuktuk.jpg"), out: "public/fleet/tuktuk.jpg", w: 1200 },
  { src: stock("bicycle.jpg"), out: "public/fleet/bicycle.jpg", w: 1200 },
  { src: byNum(V, 26), out: "public/fleet/taxi-car.jpg", w: 1200 },
  { src: byNum(V, 34), out: "public/fleet/taxi-suv.jpg", w: 1200, trim: true },
  { src: byNum(V, 29), out: "public/fleet/taxi-wagon.jpg", w: 1200 },
  { src: byNum(V, 31), out: "public/fleet/van.jpg", w: 1200 },
  // ---- destinations (licensed stock) ----
  { src: stock("sigiriya.jpg"), out: "public/destinations/sigiriya.jpg", w: 1400 },
  { src: stock("ella-nine-arch.jpg"), out: "public/destinations/ella-nine-arch.jpg", w: 1400 },
  { src: stock("dambulla.jpg"), out: "public/destinations/dambulla.jpg", w: 1400 },
  { src: stock("pasikuda.jpg"), out: "public/destinations/pasikuda.jpg", w: 1400 },
  { src: stock("trincomalee.jpg"), out: "public/destinations/trincomalee.jpg", w: 1400 },
  { src: stock("arugam-bay.jpg"), out: "public/destinations/arugam-bay.jpg", w: 1400 },
  // ---- logos ----
  { src: byNum(L, 38), out: "public/logos/logo-badge.jpg", w: 512 },
  { src: byNum(L, 36), out: "public/logos/logo-mark.jpg", w: 512 },
];

let ok = 0;
for (const j of jobs) {
  const dest = path.join(ROOT, j.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let img = sharp(j.src).rotate();
  if (j.trim) img = img.trim({ threshold: 25 });
  await img
    .resize({ width: j.w, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(dest);
  ok++;
  console.log("  ✓", j.out);
}

// Favicon (app/icon.png) + social share image (public/og.jpg) from the brand assets
fs.mkdirSync(path.join(ROOT, "app"), { recursive: true });
await sharp(byNum(L, 38)).resize(256, 256, { fit: "cover" }).png().toFile(path.join(ROOT, "app/icon.png"));
console.log("  ✓ app/icon.png");
await sharp(byNum(P, 4))
  .rotate()
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));
console.log("  ✓ public/og.jpg");

console.log(`\nDone: ${ok} images + favicon + og.`);
