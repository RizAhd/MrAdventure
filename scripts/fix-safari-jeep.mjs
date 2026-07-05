// Fix: /fleet/safari-jeep.jpg was a Prius. Reprocess from the real open safari jeep photo.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const src = path.join(ROOT, "Vehicles", "photo_22_2026-07-04_13-43-48.jpg");
const out = path.join(ROOT, "public", "fleet", "safari-jeep.jpg");

await sharp(src)
  .rotate()
  .trim({ threshold: 20 }) // remove the black letterbox bars
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true, progressive: true })
  .toFile(out);

console.log("  ✓ public/fleet/safari-jeep.jpg (" + Math.round(fs.statSync(out).size / 1024) + "KB) — now the real open jeep");
