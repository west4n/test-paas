# DockBay test stand

Minimal, dependency-free web app used as a **one-off deploy test target** for a
PaaS (Vercel/Coolify-style). Not a production project.

- Pure Node.js, single `server.js`, only the built-in `node:http` module.
- Zero npm dependencies → no `npm install`, fast build.
- No build-time environment variables. Env is read only at runtime.

## Endpoints

- `GET /` → 200, dark-themed HTML page (also serves as the platform healthcheck).
- `GET /healthz` → 200, JSON `{"status":"ok"}`.

The server listens on `process.env.PORT` (fallback `8080`) and binds to `0.0.0.0`.

## The page shows

- Big `BUILD_MARKER` value.
- `os.hostname()` (container name — handy for telling blue/green apart).
- Current server time.
- `process.env.PORT`.
- `DOCKBAY_MESSAGE` runtime env value, or `(not set)`.

## Re-testing a deploy

Before each push, bump the `BUILD_MARKER` constant near the top of
[`server.js`](server.js) — `"v1"` → `"v2"` → `"v3"`… Then `git push`. When the
new marker appears on `/`, you know the fresh deploy actually landed.

## Deploy

Deployment is triggered by **`git push`** (the platform auto-detects the
`Dockerfile` and builds it). I run the push myself.

## Run locally

```sh
node server.js
# → http://localhost:8080/
```

test
