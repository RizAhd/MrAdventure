// Generate a crisp, on-brand favicon (gold tile + car glyph) — replaces the low-res photo badge.
import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffe08a"/>
      <stop offset="1" stop-color="#d99200"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="116" fill="url(#g)"/>
  <g transform="translate(96,104) scale(13.3)" fill="none" stroke="#0d3320" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
    <circle cx="7" cy="17" r="2"/>
    <path d="M9 17h6"/>
    <circle cx="17" cy="17" r="2"/>
  </g>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf).resize(512, 512).png().toFile("app/icon.png");
await sharp(buf).resize(180, 180).png().toFile("app/apple-icon.png");
console.log("  ✓ app/icon.png + app/apple-icon.png (crisp gold car mark)");
