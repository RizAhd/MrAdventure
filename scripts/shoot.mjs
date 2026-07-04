import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3100/";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\shots";
fs.mkdirSync(OUT, { recursive: true });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 350;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight + 1000) {
          clearInterval(timer);
          resolve();
        }
      }, 90);
    });
  });
  await wait(700);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(500);
}

const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: "new",
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

// Desktop
const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await d.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
await wait(1200);
await d.screenshot({ path: `${OUT}\\desktop-hero.png` });
await autoScroll(d);
await d.screenshot({ path: `${OUT}\\desktop-full.png`, fullPage: true });
console.log("desktop shots done");

// Mobile
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await m.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
await wait(1200);
await m.screenshot({ path: `${OUT}\\mobile-hero.png` });
await autoScroll(m);
await m.screenshot({ path: `${OUT}\\mobile-full.png`, fullPage: true });
console.log("mobile shots done");

await browser.close();
console.log("OK", OUT);
