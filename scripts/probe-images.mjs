// Probe which free image APIs work (no key) and their quality.
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) MrAdventureSiteBot/1.0";

async function tryOpenverse(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=5&mature=false`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (!r.ok) return `Openverse HTTP ${r.status}`;
    const j = await r.json();
    const top = (j.results || []).slice(0, 3).map(
      (x) => `${x.width}x${x.height} [${x.license}] ${x.source} -> ${x.url}`,
    );
    return `Openverse OK (${j.result_count} results)\n    ` + top.join("\n    ");
  } catch (e) {
    return "Openverse ERR " + e.message;
  }
}

async function tryUnsplash(q) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=3&orientation=landscape`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (!r.ok) return `Unsplash HTTP ${r.status}`;
    const j = await r.json();
    const top = (j.results || []).slice(0, 3).map(
      (x) => `${x.width}x${x.height} likes=${x.likes} -> ${x.urls?.raw?.slice(0, 70)}`,
    );
    return `Unsplash OK (${j.total} results)\n    ` + top.join("\n    ");
  } catch (e) {
    return "Unsplash ERR " + e.message;
  }
}

for (const q of ["sri lanka leopard", "sri lanka beach"]) {
  console.log("\n### query:", q);
  console.log("  " + (await tryOpenverse(q)));
  console.log("  " + (await tryUnsplash(q)));
}
