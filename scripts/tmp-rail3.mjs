import puppeteer from "puppeteer-core";
import fs from "node:fs";
const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\d--Freelancing-MrAdventure\\ca8934e3-e71f-4b4f-b02d-6884086d9614\\scratchpad\\rail";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const B = "http://localhost:3000";
const sel = '[aria-label^="Guest reviews"]';

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars"] });
const p = await browser.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
await p.setViewport({ width: 1440, height: 1000 });
// Real users are no-preference; headless defaults to `reduce`.
await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await p.goto(B + "/", { waitUntil: "networkidle2", timeout: 90000 });
await p.evaluate(() => document.getElementById("reviews")?.scrollIntoView());
await wait(1500);

const half = await p.$eval(sel, (el) => Math.round(el.scrollWidth / 2));

// 1. starts at the first card, not slammed to the middle
const start = await p.$eval(sel, (el) => Math.round(el.scrollLeft));
console.log(`start position:  ${start} (half=${half})  ${start < 60 ? "AT FIRST CARD ✓" : "JUMPED ✗"}`);

// 2. auto-scrolls forward at a sane rate
await wait(3000);
const after = await p.$eval(sel, (el) => Math.round(el.scrollLeft));
const px = after - start;
console.log(`auto-scroll 3s:  +${px}px  ${px > 20 && px < half ? "MOVING ✓" : "WRONG ✗"}`);

// 3. hover pauses
const box = await p.$eval(sel, (el) => { const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await p.mouse.move(box.x, box.y);
await wait(300);
const h1 = await p.$eval(sel, (el) => Math.round(el.scrollLeft));
await wait(1800);
const h2 = await p.$eval(sel, (el) => Math.round(el.scrollLeft));
console.log(`hover pause:     ${h1} -> ${h2}  ${Math.abs(h2 - h1) < 3 ? "PAUSED ✓" : "STILL MOVING ✗"}`);

// 4. drag
await p.mouse.down();
await p.mouse.move(box.x - 300, box.y, { steps: 12 });
await p.mouse.up();
await wait(400);
const dg = await p.$eval(sel, (el) => Math.round(el.scrollLeft));
console.log(`drag -300px:     ${h2} -> ${dg}  ${dg > h2 + 150 ? "DRAGGED ✓" : "NO DRAG ✗"}`);

// 5. forward wrap is seamless
await p.evaluate((s) => { const el = document.querySelector(s); el.scrollLeft = el.scrollWidth / 2 + 40; }, sel);
await p.mouse.move(0, 0);
await wait(600);
const w = await p.$eval(sel, (el) => Math.round(el.scrollLeft));
console.log(`wrap past half:  ${w}  ${w < half ? "WRAPPED ✓" : "NOT WRAPPED ✗"}`);

// 6. resumes after mouse leaves
await wait(1500);
const r2 = await p.$eval(sel, (el) => Math.round(el.scrollLeft));
console.log(`resume off-hover:${w} -> ${r2}  ${r2 > w ? "RESUMED ✓" : "STILL PAUSED ✗"}`);

await p.evaluate(() => document.getElementById("reviews")?.scrollIntoView());
await wait(600);
await p.screenshot({ path: `${OUT}\\rail-desktop.png` });
await p.setViewport({ width: 390, height: 844 });
await wait(1000);
await p.evaluate(() => document.getElementById("reviews")?.scrollIntoView());
await wait(1200);
await p.screenshot({ path: `${OUT}\\rail-mobile.png` });
console.log("page errors:", errs.length ? errs : "none");
await Promise.race([browser.close().catch(() => {}), wait(5000)]);
process.exit(0);
