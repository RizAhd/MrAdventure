import puppeteer from "puppeteer-core";
const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new" });

for (const value of ["no-preference", "reduce"]) {
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value }]);
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 90000 });
  await p.evaluate(() => document.getElementById("reviews")?.scrollIntoView());
  await wait(2500);
  const r = await p.evaluate(() => {
    const t = document.querySelector(".animate-marquee");
    const rail = document.querySelector(".marquee-rail");
    const cs = getComputedStyle(t);
    return {
      animationName: cs.animationName,
      transform: cs.transform,
      railOverflowX: getComputedStyle(rail).overflowX,
      // is the first card still on screen, or has the strip fast-forwarded away?
      firstCardLeft: Math.round(t.querySelector("figure").getBoundingClientRect().left),
    };
  });
  console.log(`prefers-reduced-motion: ${value} →`, JSON.stringify(r));
  await p.close();
}
await Promise.race([browser.close().catch(() => {}), wait(4000)]);
process.exit(0);
