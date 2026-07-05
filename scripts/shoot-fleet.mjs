import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3100/";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\shots";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars", "--force-color-profile=srgb"] });
const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await d.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
await wait(4000);
for (const id of ["fleet", "taxi", "destinations"]) {
  await d.evaluate((x) => document.getElementById(x)?.scrollIntoView({ behavior: "instant", block: "start" }), id);
  await wait(1800);
  await d.screenshot({ path: `${OUT}\\sec-${id}.png` });
  console.log("shot", id);
}
await Promise.race([browser.close().catch(() => {}), wait(4000)]);
console.log("OK");
process.exit(0);
