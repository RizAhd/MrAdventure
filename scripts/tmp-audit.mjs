import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\d--Freelancing-MrAdventure\\ca8934e3-e71f-4b4f-b02d-6884086d9614\\scratchpad\\audit";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars"] });

for (const [label, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const p = await browser.newPage();
  const errs = [], failed = [];
  let bytes = 0, imgBytes = 0;
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text()));
  p.on("requestfailed", (r) => { if (!r.url().includes("google")) failed.push(r.url()); });
  p.on("response", async (r) => {
    try {
      const len = Number(r.headers()["content-length"] || 0);
      bytes += len;
      if ((r.headers()["content-type"] || "").startsWith("image")) imgBytes += len;
    } catch {}
  });

  await p.setViewport({ width: w, height: h });
  const t0 = Date.now();
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 90000 });
  const loadMs = Date.now() - t0;
  await wait(3000);

  // scroll the whole page so every lazy section reveals + loads
  await p.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 400); y += 400;
        if (y >= document.body.scrollHeight + 800) { clearInterval(t); res(); }
      }, 80);
    });
  });
  await wait(2500);

  const report = await p.evaluate(() => {
    const all = [...document.querySelectorAll("*")];
    const stuck = all.filter((el) => {
      const cs = getComputedStyle(el);
      return cs.opacity === "0" && el.offsetHeight > 0 && !el.closest("[aria-hidden=true]");
    });
    const imgs = [...document.images];
    return {
      h1: [...document.querySelectorAll("h1")].map((x) => x.textContent.trim()),
      h2Count: document.querySelectorAll("h2").length,
      images: imgs.length,
      brokenImages: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
      oversizedImages: imgs
        .filter((i) => i.naturalWidth > i.clientWidth * 2.2 && i.clientWidth > 0)
        .map((i) => `${i.currentSrc.split("/").pop()} ${i.naturalWidth}px natural vs ${Math.round(i.clientWidth)}px shown`),
      stuckInvisible: stuck.length,
      deadLinks: [...document.querySelectorAll("a")].filter((a) => !a.getAttribute("href") || a.getAttribute("href") === "#").length,
      hDocScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      reviewCards: document.querySelectorAll("#reviews figure").length,
      routeLinks: document.querySelectorAll('#taxi a[href*="a%20taxi%20from"]').length,
    };
  });

  console.log(`\n########## ${label} (${w}x${h}) ##########`);
  console.log("loadMs:", loadMs, "| totalKB:", Math.round(bytes / 1024), "| imageKB:", Math.round(imgBytes / 1024));
  console.log(JSON.stringify(report, null, 1));
  console.log("pageErrors:", errs.length ? errs.slice(0, 5) : "none");
  console.log("failedRequests:", failed.length ? failed.slice(0, 5) : "none");

  await p.evaluate(() => window.scrollTo(0, 0));
  await wait(1200);
  await p.screenshot({ path: `${OUT}\\full-${label}.png`, fullPage: true });
}

await Promise.race([browser.close().catch(() => {}), wait(5000)]);
process.exit(0);
