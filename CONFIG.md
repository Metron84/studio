# White-label config (`config.json`)

Loaded before `playlist.json`. A missing or malformed file falls back to the defaults below without breaking boot.

| Key | Default | Purpose |
|-----|---------|---------|
| `brandName` | `"MRMELO VIBES"` | Logo text / PWA identity |
| `brandTagline` | `"NOSTALGIA PLAYER"` | Tagline under the brand |
| `brandLogoUrl` | `null` | Optional image URL (40px height) instead of text lockup |
| `accent` | `"#00ffe1"` | `--accent`; derives `--accent-dim` and `--line` |
| `bg` | `"#070707"` | `--bg` |
| `mediaBaseUrl` | `null` | Rewrite track URLs to this base (path after bucket root preserved) |
| `showQuotes` | `true` | Show reflection quotes |
| `quoteSource` | `"default"` | Quote source mode |
| `defaultCatalogue` | `"Entire catalogue"` | Catalogue selected on load |
| `venueModeOnLoad` | `false` | Enter venue mode after load |
| `ambientOnLoad` | `false` | Start venue ambient mode |
| `schedule` | `[]` | Optional `{ start: "HH:MM", catalogue: "…" }` windows (venue mode only; applies at next track) |

Accent contrast against `bg` must stay ≥ 4.5:1 or the default accent is kept and a console warning is logged.

DJ Set entries match by **filename**, so changing `mediaBaseUrl` does not empty saved sets.
