import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\d--Freelancing-MrAdventure\\ca8934e3-e71f-4b4f-b02d-6884086d9614\\scratchpad\\v2";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars"] });
const errs = [];

for (const [label, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const p = await browser.newPage();
  p.on("pageerror", (e) => errs.push(`[${label}] ${e.message}`));
  await p.setViewport({ width: w, height: h });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 90000 });
  await wait(2500);

  for (const id of ["reviews", "taxi"]) {
    await p.evaluate((i) => document.getElementById(i)?.scrollIntoView({ behavior: "instant" }), id);
    await wait(2200);
    await (await p.$(`#${id}`)).screenshot({ path: `${OUT}\\${id}-${label}.png` });
  }

  const info = await p.evaluate(() => {
    const rev = document.getElementById("reviews");
    const cards = [...rev.querySelectorAll("figure")];
    const routeLinks = [...document.querySelectorAll('#taxi a[href*="a%20taxi%20from"]')];
    return {
      reviewCards: cards.length,
      equalHeight: new Set(cards.map((c) => Math.round(c.getBoundingClientRect().height))).size === 1,
      cardHeight: Math.round(cards[0]?.getBoundingClientRect().height),
      routeLinks: routeLinks.length,
      firstRoute: routeLinks[0]?.textContent.trim(),
      h1: document.querySelector("h1")?.textContent.trim(),
    };
  });
  console.log(label, JSON.stringify(info));
}
console.log("PAGE ERRORS:", errs.length ? errs.join(" | ") : "none");
await Promise.race([browser.close().catch(() => {}), wait(5000)]);
process.exit(0);
