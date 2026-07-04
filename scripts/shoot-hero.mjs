import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3100/";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\shots";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars", "--force-color-profile=srgb"] });

// Desktop — capture each hero slide
const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 820, deviceScaleFactor: 1 });
await d.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
await wait(2600);
for (let i = 1; i <= 5; i++) {
  try {
    await d.click(`button[aria-label="Show slide ${i}"]`);
  } catch {}
  await wait(1500);
  await d.screenshot({ path: `${OUT}\\hero-d${i}.png` });
  console.log("desktop slide", i);
}

// Mobile hero
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await m.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
await wait(2600);
await m.screenshot({ path: `${OUT}\\hero-m.png` });
console.log("mobile hero done");

await Promise.race([browser.close().catch(() => {}), wait(5000)]);
console.log("OK");
process.exit(0);
