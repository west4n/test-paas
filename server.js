const http = require("node:http");
const os = require("node:os");

// Bump this before each `git push` to visually confirm the new deploy landed.
const BUILD_MARKER = "v2";

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPage() {
  const hostname = os.hostname();
  const now = new Date().toISOString();
  const message = process.env.DOCKBAY_MESSAGE || "(not set)";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DockBay test stand</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    background: #0b0f14;
    color: #e6edf3;
  }
  .card {
    width: min(560px, 92vw);
    padding: 2.5rem;
    border: 1px solid #1f2933;
    border-radius: 16px;
    background: #11161d;
    box-shadow: 0 20px 60px rgba(0,0,0,.45);
  }
  h1 { margin: 0 0 1.5rem; font-size: 1.9rem; line-height: 1.2; }
  .marker {
    display: inline-block;
    margin-bottom: 1.75rem;
    padding: .35em .75em;
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: .04em;
    color: #0b0f14;
    background: #3fb950;
    border-radius: 12px;
  }
  dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: .6rem 1rem; }
  dt { color: #8b98a5; }
  dd { margin: 0; word-break: break-all; }
  .val { color: #58a6ff; }
</style>
</head>
<body>
  <main class="card">
    <h1>DockBay test stand ✅</h1>
    <div class="marker">${escapeHtml(BUILD_MARKER)}</div>
    <dl>
      <dt>Hostname</dt><dd class="val">${escapeHtml(hostname)}</dd>
      <dt>Server time</dt><dd class="val">${escapeHtml(now)}</dd>
      <dt>PORT</dt><dd class="val">${escapeHtml(process.env.PORT || "(unset → 8080)")}</dd>
      <dt>DOCKBAY_MESSAGE</dt><dd class="val">${escapeHtml(message)}</dd>
    </dl>
  </main>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  const path = req.url.split("?")[0];

  if (path === "/healthz") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (path === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(renderPage());
    return;
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

server.listen(PORT, HOST, () => {
  console.log(`DockBay test stand [${BUILD_MARKER}] listening on http://${HOST}:${PORT}`);
});
