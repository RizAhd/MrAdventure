// Enhance the owner's real logo (don't replace it): upscale + sharpen + clean PNG, and use it as favicon.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

function byNum(dir, n) {
  const re = new RegExp(`^photo_${n}_`);
  const f = fs.readdirSync(dir).find((x) => re.test(x));
  if (!f) throw new Error(`logo photo_${n} not found`);
  return path.join(dir, f);
}

const src = byNum("logos", 38); // yellow-bg branded logo (car line-art + wordmark)
const meta = await sharp(src).metadata();
console.log(`  source logo: ${meta.width}x${meta.height}`);

// Enhanced square badge — centre-crop to square (logo has margin, nothing is cut), upscale, sharpen.
async function make(out, size) {
  await sharp(src)
    .resize(size, size, { fit: "cover", position: "centre", kernel: "lanczos3" })
    .sharpen({ sigma: 1.1 })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  ✓ ${out} (${size}px)`);
}

fs.mkdirSync("public/logos", { recursive: true });
await make("public/logos/logo-badge.png", 512);
await make("app/icon.png", 512); // favicon = the real (enhanced) logo
await make("app/apple-icon.png", 180);
console.log("done");
