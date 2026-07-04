import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3100/";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\shots";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars", "--force-color-profile=srgb"] });

const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 820, deviceScaleFactor: 1 });
await d.goto(URL, { waitUntil: "load", timeout: 60000 });
await wait(3500);
await d.screenshot({ path: `${OUT}\\hero-d1.png` });
console.log("d1");
await wait(5200); // auto-advance -> slide 2
await d.screenshot({ path: `${OUT}\\hero-d2.png` });
console.log("d2");
await wait(5200); // slide 3
await d.screenshot({ path: `${OUT}\\hero-d3.png` });
console.log("d3");

const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await m.goto(URL, { waitUntil: "load", timeout: 60000 });
await wait(3500);
await m.screenshot({ path: `${OUT}\\hero-m.png` });
console.log("m");

await Promise.race([browser.close().catch(() => {}), wait(4000)]);
console.log("OK");
process.exit(0);
