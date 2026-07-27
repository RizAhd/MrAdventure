import puppeteer from "puppeteer-core";
const EXE = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: EXE, headless: "new", args: ["--hide-scrollbars"] });

const countStuck = (p) =>
  p.evaluate(() =>
    [...document.querySelectorAll("*")].filter((el) => {
      const cs = getComputedStyle(el);
      return cs.opacity === "0" && el.offsetHeight > 0;
    }).length,
  );

// step = px per tick, delay = ms per tick  → px/sec
for (const [name, step, delay] of [
  ["fling  (5000 px/s)", 400, 80],
  ["brisk  (1200 px/s)", 240, 200],
  ["slow   ( 400 px/s)", 200, 500],
]) {
  const p = await browser.newPage();
  await p.setViewport({ width: 390, height: 844 });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 90000 });
  await wait(2500);
  await p.evaluate(
    async (s, d) => {
      await new Promise((res) => {
        let y = 0;
        const t = setInterval(() => {
          window.scrollBy(0, s); y += s;
          if (y >= document.body.scrollHeight + 800) { clearInterval(t); res(); }
        }, d);
      });
    },
    step, delay,
  );
  await wait(3000);
  console.log(`${name} → stuck-invisible elements: ${await countStuck(p)}`);
  await p.close();
}

await Promise.race([browser.close().catch(() => {}), wait(4000)]);
process.exit(0);
