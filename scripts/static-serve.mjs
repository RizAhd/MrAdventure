import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = "C:\\Users\\rizla\\AppData\\Local\\Temp\\claude\\c--Users-rizla-Desktop-MrAdventure\\31d18fb0-4d70-4eab-8fe4-0357918f75f8\\scratchpad\\stage";
const PORT = 3300;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".webp": "image/webp",
  ".woff2": "font/woff2", ".woff": "font/woff", ".txt": "text/plain",
};

const server = http.createServer((req, res) => {
  try {
    let p = decodeURIComponent(req.url.split("?")[0]);
    let fp = path.join(ROOT, p);
    if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) fp = path.join(fp, "index.html");
    if (!fs.existsSync(fp)) {
      // trailingSlash export: /MrAdventure/foo -> /MrAdventure/foo/index.html
      const alt = path.join(ROOT, p, "index.html");
      if (fs.existsSync(alt)) fp = alt;
      else { res.writeHead(404); res.end("not found: " + p); return; }
    }
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(fp).pipe(res);
  } catch (e) {
    res.writeHead(500); res.end(String(e));
  }
});
server.listen(PORT, () => console.log("static-serve on http://localhost:" + PORT + "/MrAdventure/"));
