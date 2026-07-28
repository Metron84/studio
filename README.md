# MRMELO — Nostalgia Player

**mrmelo.com** — A nostalgia player for your music. Stream your favourite decades—80s, 90s, 2000s, folk, and MrMelo Mix. Each track comes with a reflection from a historical figure.

## PWA & mobile

- **PWA:** Installable as an app (Add to Home Screen). Uses `manifest.json` and `sw.js`.
- **Mobile:** Responsive layout, touch-friendly controls (44px min), safe-area insets for notches.
- **Sharing:** Add `og-image.png` (1200×630) for social previews. Use `og-image.html` as a template—open in browser, screenshot at 1200×630, save as `og-image.png`.

## Demo tracks

Deployed builds include royalty-free demo tracks from [SoundHelix](https://www.soundhelix.com/) (CC licensed). To use your own music, run the build script—it overwrites `playlist.json` with local paths.

## Setup

1. **Music folders:** Place MP3s in `music/80s/`, `music/90s/`, `music/2000/`, `music/folk/`, `music/MrMelo Mix/`.
2. **Build playlist:** After adding tracks, run:
   ```bash
   cd "/path/to/MRMELO VIBES"
   MUSIC_PATH="/path/to/MRMELO VIBES/music" node build-playlist.cjs
   ```
   This scans the folders and generates `playlist.json` with reflections.
3. **Serve locally:** Browsers block `file://` for fetch/audio. Run a local server:
   ```bash
   npx serve .
   ```
   Or: `python3 -m http.server 8080` (then open http://localhost:8080)

## Catalogue

Select **Entire catalogue** or a single catalogue (80s, 90s, 2000, MrMelo Mix, Oldies and Goldies, Summer Dance, FootFans) to filter tracks.

## DJ Set mix download (R2 CORS)

**Download mix** in Your DJ Set fetches tracks in the browser and renders one WAV with the same ~6s crossfades. That needs CORS on the public R2 bucket (playback alone does not).

In Cloudflare → R2 → your music bucket → **Settings → CORS policy**, allow:

```json
[
  {
    "AllowedOrigins": [
      "https://mrmelo.com",
      "https://www.mrmelo.com",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://127.0.0.1:8080"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Range", "Content-Type"],
    "MaxAgeSeconds": 86400
  }
]
```

Add any Vercel preview origins you use. Without this, mix export shows: “Enable CORS on the music bucket…”

## Reflections

Each track has a reflection from a historical figure (public domain, pre-1950) — Oscar Wilde, Emily Dickinson, Mark Twain, Nietzsche, Montaigne, Voltaire, Shakespeare, Jane Austen, Emerson, Thoreau, Pascal, Walt Whitman. The build script assigns figures and reflections per track.
