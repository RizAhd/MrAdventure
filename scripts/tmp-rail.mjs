import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\d--Freelancing-MrAdventure\\ca8934e3-e71f-4b4f-b02d-6884086d9614\\scratchpad\\rail";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const B = "http://localhost:3000";

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars"] });
const p = await browser.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
await p.setViewport({ width: 1440, height: 1000 });
await p.goto(B + "/", { waitUntil: "networkidle2", timeout: 90000 });
await p.evaluate(() => document.getElementById("reviews")?.scrollIntoView());
await wait(2000);

const sel = '[aria-label^="Guest reviews"]';

// 1. does it auto-scroll?
const a = await p.$eval(sel, (el) => el.scrollLeft);
await wait(2500);
const b = await p.$eval(sel, (el) => el.scrollLeft);
console.log(`auto-scroll:        ${a.toFixed(0)} -> ${b.toFixed(0)}  ${b > a ? "MOVING ✓" : "STUCK ✗"}`);

// 2. does hovering pause it?
const box = await p.$eval(sel, (el) => { const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await p.mouse.move(box.x, box.y);
await wait(300);
const c = await p.$eval(sel, (el) => el.scrollLeft);
await wait(1800);
const d = await p.$eval(sel, (el) => el.scrollLeft);
console.log(`hover pause:        ${c.toFixed(0)} -> ${d.toFixed(0)}  ${Math.abs(d - c) < 2 ? "PAUSED ✓" : "STILL MOVING ✗"}`);

// 3. manual drag
await p.mouse.down();
await p.mouse.move(box.x - 300, box.y, { steps: 12 });
await p.mouse.up();
await wait(400);
const e = await p.$eval(sel, (el) => el.scrollLeft);
console.log(`drag -300px:        ${d.toFixed(0)} -> ${e.toFixed(0)}  ${e > d + 150 ? "DRAGGED ✓" : "NO DRAG ✗"}`);

// 4. arrow buttons
await p.mouse.move(0, 0);
const before = await p.$eval(sel, (el) => el.scrollLeft);
await p.click('button[aria-label="Next reviews"]');
await wait(900);
const after = await p.$eval(sel, (el) => el.scrollLeft);
console.log(`next button:        ${before.toFixed(0)} -> ${after.toFixed(0)}  ${after > before ? "WORKS ✓" : "FAILED ✗"}`);

// 5. is the review text server-rendered (must be, for SEO)
const raw = await (await fetch(B + "/")).text();
console.log(`SSR review text:    ${raw.includes("Michiel De Smet") && raw.includes("comfortabele van") ? "IN HTML ✓" : "MISSING ✗"}`);

// 6. wrap-around never hits a hard edge
const wrapOk = await p.evaluate((s) => {
  const el = document.querySelector(s);
  el.scrollLeft = el.scrollWidth / 2 + 50;
  return { half: Math.round(el.scrollWidth / 2), set: Math.round(el.scrollLeft) };
}, sel);
await wait(600);
const afterWrap = await p.$eval(sel, (el) => Math.round(el.scrollLeft));
console.log(`wrap at half(${wrapOk.half}): scrollLeft now ${afterWrap} ${afterWrap < wrapOk.half ? "WRAPPED ✓" : "NOT WRAPPED ✗"}`);

await p.screenshot({ path: `${OUT}\\rail-desktop.png` });
await p.setViewport({ width: 390, height: 844 });
await wait(1200);
await p.evaluate(() => document.getElementById("reviews")?.scrollIntoView());
await wait(1500);
await p.screenshot({ path: `${OUT}\\rail-mobile.png` });

console.log("page errors:", errs.length ? errs : "none");
await Promise.race([browser.close().catch(() => {}), wait(5000)]);
process.exit(0);
