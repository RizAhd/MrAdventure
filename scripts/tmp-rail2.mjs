import puppeteer from "puppeteer-core";
const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const B = "http://localhost:3000";
const sel = '[aria-label^="Guest reviews"]';

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars"] });

for (const motion of [null, "no-preference", "reduce"]) {
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 1000 });
  if (motion) await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: motion }]);
  await p.goto(B + "/", { waitUntil: "networkidle2", timeout: 90000 });
  await p.evaluate(() => document.getElementById("reviews")?.scrollIntoView());
  await wait(1800);

  const reports = await p.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const a = await p.$eval(sel, (el) => el.scrollLeft);
  await wait(2500);
  const b = await p.$eval(sel, (el) => el.scrollLeft);
  console.log(
    `emulate=${String(motion).padEnd(13)} matchMedia(reduce)=${String(reports).padEnd(5)} scroll ${a.toFixed(0)}->${b.toFixed(0)} ${b > a ? "MOVING" : "stopped"}`,
  );
  await p.close();
}
await Promise.race([browser.close().catch(() => {}), wait(4000)]);
process.exit(0);
