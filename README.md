# MRMELO VIBES — Nostalgia Player

**[mrmelo.com](https://mrmelo.com)** — A full-viewport nostalgia music player. Stream curated catalogues with dual-deck crossfades, DJ Set mix export, venue/kiosk mode, and a reflection on each track from a historical figure.

White-label keys live in [`config.json`](config.json) — see **[CONFIG.md](CONFIG.md)**.

## Catalogue (699 tracks)

| Catalogue | Tracks |
|-----------|-------:|
| 80s | 80 |
| 90s | 102 |
| 2000 | 114 |
| MrMelo Mix | 223 |
| Oldies and Goldies | 80 |
| Summer Dance | 55 |
| FootFans | 45 |

There is no Folk catalogue. Choose **Entire catalogue** or one of the rows above in the header tiles.

Audio streams from Cloudflare R2 (`pub-…r2.dev/music/…`). For production, prefer a **custom domain** on the bucket (for example `music.mrmelo.com`) and set `mediaBaseUrl` in `config.json` to that origin so the player and CORS policy stay on your domain instead of the `*.r2.dev` hostname.

## Setup

1. **Music:** Keep MP3s on R2 under `music/{catalogue}/…`, or rebuild from local folders with `build-playlist.cjs`.
2. **Build playlist** (optional, when adding local files):
   ```bash
   MUSIC_PATH="/path/to/music" node build-playlist.cjs
   ```
3. **Serve locally** (browsers block `file://` for fetch/audio):
   ```bash
   npx serve .
   ```
   Or: `python3 -m http.server 8080` → http://localhost:8080

## DJ Set mix download (R2 CORS)

**Download mix** fetches tracks in the browser, bakes the same ~6s crossfades, and encodes an MP3 (lamejs, vendored at `/vendor/lame.min.js`). That needs CORS on the public R2 bucket (or its custom domain). Playback alone does not.

In Cloudflare → R2 → your music bucket → **Settings → CORS policy**:

```json
[
  {
    "AllowedOrigins": [
      "https://mrmelo.com",
      "https://www.mrmelo.com",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://127.0.0.1:3456"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Range", "Content-Type"],
    "MaxAgeSeconds": 86400
  }
]
```

Add any Vercel preview origins you use. If you serve music from a custom domain, include the site origins above on that bucket’s CORS policy as well.

## PWA for venue screens

Install MRMELO as a PWA (Add to Home Screen / Install app) on the tablet or TV that runs the room, then open it in **standalone** and enter **Venue** mode. A installed PWA beats a normal browser tab for kiosk use: no address bar or browser chrome, orientation can follow the display (`orientation: any`), the shell/`config.json`/`playlist.json` cache via the service worker so a brief network blip does not blank the UI, and you are less likely to lose the session to an accidental tab close or “restore session” prompt during a long night.

## PWA & mobile

- **PWA:** `manifest.json` + `sw.js` (cache `mrmelo-v5`: shell, `config.json`, `playlist.json`, `/vendor/lame.min.js`).
- **Mobile:** Responsive layout, touch-friendly controls, safe-area insets; control row reorders on small screens.
- **Sharing:** `og-image.png` (1200×630); template in `og-image.html`.

## Reflections

Each track has a reflection from a historical figure (public domain, pre-1950). The build script assigns figures and reflections per track.
