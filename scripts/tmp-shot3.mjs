import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\d--Freelancing-MrAdventure\\ca8934e3-e71f-4b4f-b02d-6884086d9614\\scratchpad\\v3";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars"] });

for (const [label, w, h] of [["desktop", 1440, 1000], ["mobile", 390, 844]]) {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 90000 });
  await wait(2000);

  // Scroll the routes heading into view so Reveal's whileInView actually fires
  await p.evaluate(() => {
    const hs = [...document.querySelectorAll("#taxi h3")];
    hs.find((x) => x.textContent.includes("Popular taxi"))?.scrollIntoView({ block: "center" });
  });
  await wait(2500);
  await p.screenshot({ path: `${OUT}\\routes-${label}.png` });

  // Reviews with the repositioned watermark
  await p.evaluate(() => document.getElementById("reviews")?.scrollIntoView({ behavior: "instant" }));
  await wait(2500);
  await (await p.$("#reviews")).screenshot({ path: `${OUT}\\reviews-${label}.png` });

  const vis = await p.evaluate(() => {
    const links = [...document.querySelectorAll('#taxi a[href*="a%20taxi%20from"]')];
    const wrap = links[0]?.closest("[style]");
    return { count: links.length, wrapperOpacity: wrap ? getComputedStyle(wrap).opacity : "n/a" };
  });
  console.log(label, JSON.stringify(vis));
}
await Promise.race([browser.close().catch(() => {}), wait(5000)]);
process.exit(0);
