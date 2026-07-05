import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3300/MrAdventure/";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\shots";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const scrollTo = (page, id) =>
  page.evaluate((x) => document.getElementById(x)?.scrollIntoView({ behavior: "instant", block: "start" }), id);

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars", "--force-color-profile=srgb"] });

const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 880, deviceScaleFactor: 1 });
await d.goto(URL, { waitUntil: "load", timeout: 60000 });
await wait(4500);
await d.screenshot({ path: `${OUT}\\b-hero-d.png` });
console.log("hero-d");
for (const id of ["worldwide", "gallery"]) {
  await scrollTo(d, id);
  await wait(2200);
  await d.screenshot({ path: `${OUT}\\b-${id}-d.png` });
  console.log(id + "-d");
}

const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await m.goto(URL, { waitUntil: "load", timeout: 60000 });
await wait(4500);
await m.screenshot({ path: `${OUT}\\b-hero-m.png` });
console.log("hero-m");

await Promise.race([browser.close().catch(() => {}), wait(4000)]);
console.log("OK");
process.exit(0);
