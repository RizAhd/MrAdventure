// Shrink hero images for faster mobile loading (unoptimized export = no auto-resize).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "hero");
for (const f of fs.readdirSync(dir).filter((n) => n.endsWith(".jpg"))) {
  const p = path.join(dir, f);
  const buf = fs.readFileSync(p); // read into memory first so we can overwrite
  await sharp(buf)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(p);
  console.log("  ✓", f, Math.round(fs.statSync(p).size / 1024) + "KB");
}
console.log("done");
