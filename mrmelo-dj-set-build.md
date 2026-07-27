# MRMELO VIBES — DJ Set feature build guide

All edits are to `index.html`. Nothing else changes. Three sections, in order:

1. **Pick & Save** — star tracks into your set; persists across refresh.
2. **The Set view** — a "Your DJ Set" panel to name, reorder, remove, and play.
3. **Natural crossfade** — a dual-deck engine that fades one track into the next.

**Config knobs** (Section 3): `CROSSFADE_SEC` (fade length, default 6s) and `djCrossfade` (on/off, default on).

**Note on CORS:** the crossfade uses two `<audio>` elements with volume automation, so it works with the cross-origin R2 files as-is. No CORS headers needed. (CORS is only required if you later make the *visualizer* react to real audio — not part of this build.)

> If you already added the star toggle from our chat, skip Section 1 — it's reproduced here so this document stands alone.

---

## Section 1 — Pick & Save

### 1A. Add the set state + helpers

Find the state variables near the top of the `<script>`:

```js
let isShuffled = false;
```

Add immediately after:

```js
let djSet = [];
try { djSet = JSON.parse(localStorage.getItem('mrmelo_djset') || '[]'); } catch (_) { djSet = []; }
function saveDjSet() { try { localStorage.setItem('mrmelo_djset', JSON.stringify(djSet)); } catch (_) {} }
function inDjSet(file) { return djSet.includes(file); }
function toggleDjSet(file) {
  const i = djSet.indexOf(file);
  if (i === -1) djSet.push(file); else djSet.splice(i, 1);
  saveDjSet();
}
```

The track's `file` URL is its stable ID.

### 1B. Add a star toggle to each Up Next row

In `buildUpNextListContent`, find the actions block:

```js
      '<div class="modal-track-actions">' +
        '<button type="button" class="modal-queue-btn" title="Play next">Next</button>' +
        '<button type="button" class="modal-queue-btn" title="Add to end">End</button>' +
        '<button type="button" class="modal-queue-btn modal-queue-btn-remove" title="Remove from queue">Remove</button>' +
      '</div>';
```

Replace with (adds the star as the first action; deliberately uses class `modal-set-btn`, **not** `modal-queue-btn`, so it doesn't disturb the `btns[0/1/2]` wiring below):

```js
      '<div class="modal-track-actions">' +
        '<button type="button" class="modal-set-btn' + (inDjSet(t.file) ? ' active' : '') + '" title="Add to your set" aria-pressed="' + (inDjSet(t.file) ? 'true' : 'false') + '">' + (inDjSet(t.file) ? '★' : '☆') + '</button>' +
        '<button type="button" class="modal-queue-btn" title="Play next">Next</button>' +
        '<button type="button" class="modal-queue-btn" title="Add to end">End</button>' +
        '<button type="button" class="modal-queue-btn modal-queue-btn-remove" title="Remove from queue">Remove</button>' +
      '</div>';
```

### 1C. Wire the star + protect the row click

In the same function, find the row's click handler guard:

```js
      if (e.target.closest('.modal-queue-btn') || e.target.closest('.modal-track-drag-handle')) return;
```

Replace with (adds `.modal-set-btn` so tapping the star doesn't start the track):

```js
      if (e.target.closest('.modal-queue-btn') || e.target.closest('.modal-set-btn') || e.target.closest('.modal-track-drag-handle')) return;
```

Then find the existing button wiring:

```js
    if (btns[2]) btns[2].addEventListener('click', (e) => { e.stopPropagation(); removeFromQueue(i); });
```

Add immediately after:

```js
    const setBtn = row.querySelector('.modal-set-btn');
    if (setBtn) setBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDjSet(t.file);
      const on = inDjSet(t.file);
      setBtn.classList.toggle('active', on);
      setBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      setBtn.textContent = on ? '★' : '☆';
      updateDjSetBadge();
      if (document.getElementById('djSetModal')?.classList.contains('show')) buildDjSetList();
    });
```

### 1D. Style the star

Add anywhere inside the `<style>` block:

```css
.modal-set-btn {
  appearance:none; cursor:pointer; background:transparent;
  border:1px solid rgba(255,255,255,0.18); color:var(--dim);
  border-radius:6px; font-size:0.95rem; line-height:1; padding:4px 8px;
  transition:color .15s, border-color .15s, text-shadow .15s;
}
.modal-set-btn:hover { color:var(--text); border-color:rgba(255,255,255,0.35); }
.modal-set-btn.active { color:var(--accent); border-color:var(--accent); text-shadow:0 0 10px var(--accent); }
```

---

## Section 2 — The Set view

### 2A. Add the "Set" button to the control row

Find the Up Next button in the control row:

```html
    <button type="button" class="btn btn-transport" id="upNextBtn" onclick="openUpNext()" aria-label="Open Up Next queue" title="Up Next"><span class="ctrl-text">Up Next</span><span class="ctrl-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="5" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="18" r="1" fill="currentColor" stroke="none"/></svg></span></button>
```

Add immediately after:

```html
    <button type="button" class="btn btn-transport" id="djSetBtn" onclick="openDjSet()" aria-label="Open your DJ set" title="Your DJ set"><span class="ctrl-text">Set <span id="djSetBadge">0</span></span><span class="ctrl-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span></button>
```

### 2B. Add the Set modal markup

Find the end of the catalogue mobile modal:

```html
  <div class="modal-list catalogue-mobile-list" id="catalogueMobileList" role="listbox" aria-label="Catalogue categories"></div>
</div>
```

Add immediately after:

```html
<div class="modal-backdrop" id="djSetBackdrop" onclick="closeDjSet()"></div>
<div class="modal" id="djSetModal" role="dialog" aria-modal="true" aria-labelledby="djSetTitle">
  <div class="modal-header">
    <div>
      <div class="modal-title" id="djSetTitle">Your DJ Set</div>
      <div class="modal-order" id="djSetCount">0 tracks</div>
    </div>
    <div class="modal-header-actions">
      <button type="button" class="modal-restore-btn" onclick="playDjSet()" aria-label="Play your set">▶ Play set</button>
      <button type="button" class="modal-restore-btn" onclick="clearDjSet()" aria-label="Clear your set">Clear</button>
      <button class="modal-close" onclick="closeDjSet()" aria-label="Close">&times;</button>
    </div>
  </div>
  <div class="modal-search-wrap" style="padding:0 24px 12px;">
    <input type="text" id="djSetNameInput" class="search-input" placeholder="Name tonight's set…" autocomplete="off" aria-label="Name your set" style="min-width:0;width:100%;">
  </div>
  <div class="modal-list" id="djSetList" role="listbox" aria-label="Your DJ set" tabindex="0"></div>
</div>
```

It reuses the existing `.modal`, `.modal-track`, and button styles — no new CSS needed here.

### 2C. Add the Set logic

Find `function escapeHtml(s) {` and add this block **immediately before** it (so it sits with the other modal functions):

```js
// ---- DJ Set ----
let djSetName = '';
try { djSetName = localStorage.getItem('mrmelo_djset_name') || ''; } catch (_) {}
function saveDjSetName(n) { djSetName = n; try { localStorage.setItem('mrmelo_djset_name', n); } catch (_) {} }

function djSetTracks() {
  const byFile = new Map(ALL_TRACKS.map((t) => [t.file, t]));
  return djSet.map((f) => byFile.get(f)).filter(Boolean);
}

function updateDjSetBadge() {
  const b = document.getElementById('djSetBadge');
  if (b) b.textContent = String(djSet.length);
}

function openDjSet() {
  closeUpNext();
  closeCatalogSearch();
  closeCatalogueMobileModal();
  const nameInput = document.getElementById('djSetNameInput');
  if (nameInput) nameInput.value = djSetName;
  buildDjSetList();
  document.getElementById('djSetBackdrop').classList.add('show');
  document.getElementById('djSetModal').classList.add('show');
}

function closeDjSet() {
  document.getElementById('djSetBackdrop')?.classList.remove('show');
  document.getElementById('djSetModal')?.classList.remove('show');
  const btn = document.getElementById('djSetBtn');
  if (btn) btn.focus();
}

function buildDjSetList() {
  const list = document.getElementById('djSetList');
  if (!list) return;
  const tracks = djSetTracks();
  document.getElementById('djSetCount').textContent = tracks.length + (tracks.length === 1 ? ' track' : ' tracks');
  list.innerHTML = '';
  if (!tracks.length) {
    const empty = document.createElement('div');
    empty.style.cssText = 'padding:32px 24px;color:var(--dim);text-align:center;font-size:0.8rem;letter-spacing:1px;';
    empty.textContent = 'No tracks yet. Star songs from Up Next to build your set.';
    list.appendChild(empty);
    return;
  }
  tracks.forEach((t, i) => {
    const row = document.createElement('div');
    row.className = 'modal-track';
    row.setAttribute('role', 'option');
    row.dataset.index = String(i);
    row.draggable = true;
    const durStr = (t.duration != null && !isNaN(t.duration)) ? fmt(t.duration) : '';
    row.innerHTML =
      '<span class="modal-track-drag-handle" aria-hidden="true" title="Drag to reorder">⋮⋮</span>' +
      '<span class="modal-track-num">' + (i + 1) + '</span>' +
      '<div class="modal-track-info">' +
        '<div class="modal-track-title">' + escapeHtml(t.title) + '</div>' +
        '<div class="modal-track-artist">' + escapeHtml(t.artist) + '</div>' +
      '</div>' +
      '<span class="modal-track-catalogue">' + escapeHtml(t.catalogue || '') + '</span>' +
      '<span class="modal-track-duration">' + escapeHtml(durStr) + '</span>' +
      '<div class="modal-track-actions">' +
        '<button type="button" class="modal-queue-btn modal-queue-btn-remove" title="Remove from set">Remove</button>' +
      '</div>';
    row.addEventListener('click', (e) => {
      if (e.target.closest('.modal-queue-btn') || e.target.closest('.modal-track-drag-handle')) return;
      playDjSetFrom(i);
    });
    row.querySelector('.modal-queue-btn-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromDjSet(i);
    });
    row.addEventListener('dragstart', (e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(i)); row.classList.add('dragging'); });
    row.addEventListener('dragend', () => row.classList.remove('dragging'));
    row.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; list.querySelectorAll('.modal-track.drag-over').forEach((r) => { if (r !== row) r.classList.remove('drag-over'); }); row.classList.add('drag-over'); });
    row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
    row.addEventListener('drop', (e) => {
      e.preventDefault();
      row.classList.remove('drag-over');
      const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
      const to = parseInt(row.dataset.index, 10);
      if (!isNaN(from) && !isNaN(to) && from !== to) moveDjSetItem(from, to);
    });
    list.appendChild(row);
  });
}

function removeFromDjSet(i) {
  djSet.splice(i, 1);
  saveDjSet();
  updateDjSetBadge();
  buildDjSetList();
  if (document.getElementById('upNextModal')?.classList.contains('show')) buildUpNextListContent();
}

function moveDjSetItem(from, to) {
  const item = djSet.splice(from, 1)[0];
  const insertIdx = from < to ? to - 1 : to;
  djSet.splice(insertIdx, 0, item);
  saveDjSet();
  buildDjSetList();
}

function clearDjSet() {
  if (!djSet.length) return;
  djSet = [];
  saveDjSet();
  updateDjSetBadge();
  buildDjSetList();
  if (document.getElementById('upNextModal')?.classList.contains('show')) buildUpNextListContent();
}

function playDjSetFrom(startIdx) {
  const tracks = djSetTracks();
  if (!tracks.length) return;
  isShuffled = false;
  document.getElementById('shuffleBtn')?.classList.remove('glow');
  playlist = [...tracks];
  queue = [...tracks];
  trackIdx = Math.max(0, Math.min(startIdx, queue.length - 1));
  isPlaying = true;
  setPlayButtonVisual(true);
  const pb = document.getElementById('playBtn');
  if (pb) { pb.setAttribute('aria-label', 'Pause'); pb.setAttribute('title', 'Pause'); }
  loadTrack(trackIdx);
  closeDjSet();
}
function playDjSet() { playDjSetFrom(0); }
```

### 2D. Wire the name input + show the badge on load

Find where the search inputs get wired — the line:

```js
(function wireSearchInputs() {
```

Add this **above** it:

```js
document.getElementById('djSetNameInput')?.addEventListener('input', (e) => saveDjSetName(e.target.value));
updateDjSetBadge();
```

Playing a set replaces the queue with your set's tracks, so the existing Up Next, shuffle, prev/next, and progress bar all keep working on it — and the crossfade from Section 3 applies automatically.

---

## Section 3 — Natural crossfade (dual-deck engine)

This replaces the single-audio playback with two decks that overlap track tails. Manual actions (next/prev/track click/catalogue change) switch instantly; automatic end-of-track fades.

### 3A. Split `loadTrack` into meta + audio

Replace the **entire** existing `loadTrack` function with these two functions:

```js
function renderTrackMeta(i) {
  const t = queue[i];
  if (!t) return;
  document.getElementById('trackName').textContent = t.title;
  document.getElementById('trackArtist').textContent = t.artist + ' · ' + t.catalogue;
  document.getElementById('trackNum').textContent = (i + 1) + ' / ' + queue.length;
  document.getElementById('progFill').style.width = '0%';
  document.getElementById('tEl').textContent = '0:00';
  document.getElementById('tDur').textContent = '0:00';
  document.getElementById('subtitle').classList.remove('show');
  document.getElementById('subtitleQuote').textContent = '';
  document.getElementById('subtitleSig').textContent = t.figure ? '— ' + t.figure : '— Mr. Melo';
  setTimeout(() => {
    // only show if this track is still the current one (guards against fast skips)
    if (queue[trackIdx] && queue[trackIdx].file === t.file) {
      document.getElementById('subtitleQuote').textContent = t.reflection || '';
      if (t.reflection) document.getElementById('subtitle').classList.add('show');
    }
  }, 600);
}

function loadTrack(i) {
  if (!queue[i]) return;
  cancelFade();
  trackIdx = i;
  const t = queue[i];
  renderTrackMeta(i);
  audio.volume = 1;
  audio.crossOrigin = t.file.startsWith('http') ? null : 'anonymous';
  audio.src = t.file;
  audio.load();
  if (isPlaying) {
    audio.play().catch((e) => {
      if (e && e.name === 'NotAllowedError') {
        isPlaying = false;
        setPlayButtonVisual(false);
        const p = document.getElementById('playBtn');
        p.setAttribute('aria-label', 'Play');
        p.setAttribute('title', 'Play');
      }
    });
  }
}
```

### 3B. Replace the audio setup + event block

Find the current single-audio block:

```js
// Audio events
const audio = document.getElementById('audio');

audio.addEventListener('timeupdate', () => {
  if (audio.duration && !isNaN(audio.duration)) {
    const pct = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('tEl').textContent = fmt(audio.currentTime);
    document.getElementById('tDur').textContent = fmt(audio.duration);
  }
});

audio.addEventListener('ended', nextTrack);

audio.addEventListener('error', () => {
  document.getElementById('tDur').textContent = '—';
});
```

Replace the whole thing with:

```js
// ---- Dual-deck playback engine (crossfade) ----
let audio = document.getElementById('audio');   // active deck
let idleDeck = audio.cloneNode(false);          // second deck
idleDeck.id = 'audio2';
audio.parentNode.insertBefore(idleDeck, audio.nextSibling);

let djCrossfade = true;    // natural fade between tracks
const CROSSFADE_SEC = 6;   // fade length in seconds
let isFading = false;

function cancelFade() {
  if (!isFading) return;
  isFading = false;
  idleDeck.pause();
  idleDeck.volume = 1;
  try { idleDeck.currentTime = 0; } catch (_) {}
  audio.volume = 1;
}

function maybeStartCrossfade() {
  if (!djCrossfade || isFading || !isPlaying) return;
  if (!audio.duration || isNaN(audio.duration)) return;
  if (queue.length < 2) return;
  const fadeLen = Math.min(CROSSFADE_SEC, audio.duration / 2);
  if (audio.duration - audio.currentTime <= fadeLen) startCrossfade(fadeLen);
}

function startCrossfade(fadeLen) {
  const nextIndex = (trackIdx + 1) % queue.length;
  const t = queue[nextIndex];
  if (!t) return;
  isFading = true;
  const outgoing = audio;
  const incoming = idleDeck;
  incoming.crossOrigin = t.file.startsWith('http') ? null : 'anonymous';
  incoming.src = t.file;
  incoming.load();
  incoming.volume = 0;
  try { incoming.currentTime = 0; } catch (_) {}
  incoming.play().catch(() => {});
  // the incoming deck is now the active one
  audio = incoming;
  idleDeck = outgoing;
  trackIdx = nextIndex;
  renderTrackMeta(nextIndex);
  const startedAt = performance.now();
  (function step(now) {
    if (!isFading) return;               // cancelled by a manual action
    const p = Math.min(1, (now - startedAt) / (fadeLen * 1000));
    incoming.volume = p;
    outgoing.volume = 1 - p;
    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      outgoing.pause();
      outgoing.volume = 1;
      try { outgoing.currentTime = 0; } catch (_) {}
      isFading = false;
    }
  })(performance.now());
}

function onDeckTimeUpdate(e) {
  if (e.target !== audio) return;        // ignore the fading-out deck
  if (audio.duration && !isNaN(audio.duration)) {
    const pct = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('tEl').textContent = fmt(audio.currentTime);
    document.getElementById('tDur').textContent = fmt(audio.duration);
  }
  maybeStartCrossfade();
}

function onDeckEnded(e) {
  if (e.target !== audio) return;        // the outgoing deck ending is expected during a fade
  if (isFading) return;
  nextTrack();                           // hard cut when crossfade is off / didn't trigger
}

function onDeckError(e) {
  if (e.target !== audio) return;
  document.getElementById('tDur').textContent = '—';
}

[audio, idleDeck].forEach((d) => {
  d.addEventListener('timeupdate', onDeckTimeUpdate);
  d.addEventListener('ended', onDeckEnded);
  d.addEventListener('error', onDeckError);
});
```

### 3C. Update `togglePlay`, `nextTrack`, `prevTrack`, and the seek handler

Replace the **entire** `togglePlay` function with:

```js
function togglePlay() {
  isPlaying = !isPlaying;
  const pb = document.getElementById('playBtn');
  setPlayButtonVisual(isPlaying);
  pb.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  pb.setAttribute('title', isPlaying ? 'Pause' : 'Play');
  if (isPlaying) {
    audio.play().catch((e) => {
      if (e && e.name === 'NotAllowedError') {
        isPlaying = false;
        setPlayButtonVisual(false);
        pb.setAttribute('aria-label', 'Play');
        pb.setAttribute('title', 'Play');
      }
    });
  } else {
    if (isFading) cancelFade();
    audio.pause();
    idleDeck.pause();
  }
}
```

Replace the **entire** `nextTrack` and `prevTrack` functions with:

```js
function nextTrack() {
  if (!queue.length) return;
  if (isFading) { cancelFade(); return; }   // fade is already moving to the next track — settle there
  loadTrack((trackIdx + 1) % queue.length);
}

function prevTrack() {
  if (!queue.length) return;
  if (isFading) cancelFade();
  loadTrack((trackIdx - 1 + queue.length) % queue.length);
}
```

Find the progress-bar seek handler:

```js
document.getElementById('progBar').addEventListener('click', (e) => {
  if (!audio.duration || isNaN(audio.duration)) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});
```

Replace with (cancels a fade if you scrub during one):

```js
document.getElementById('progBar').addEventListener('click', (e) => {
  if (!audio.duration || isNaN(audio.duration)) return;
  if (isFading) cancelFade();
  const rect = e.currentTarget.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});
```

That's the whole engine. `audio` is now a `let` that always points at the active deck; every existing reference to `audio` keeps working because they read the current binding at call time.

---

## Test checklist

- **Star:** open Up Next → tap ☆ on a few rows (they turn ★ + glow, badge count rises) → refresh → reopen Up Next → still starred.
- **Set view:** the "Set" button opens Your DJ Set → your starred tracks are listed → drag to reorder → Remove drops one → the star updates in Up Next too → name field persists after refresh.
- **Play set:** "▶ Play set" starts from the top; clicking a row starts from that track; Up Next now shows the set as the queue.
- **Crossfade:** let a track run to its end → the next track fades in over the last ~6s with no gap or click. Set `djCrossfade = false` to confirm it hard-cuts as before.
- **Manual controls during a fade:** Next settles on the incoming track; Prev goes back; Pause freezes cleanly; scrubbing cancels the fade. No track ever plays twice or sticks at low volume.
- **Short tracks:** anything under ~12s fades over half its length instead of 6s (no overlap longer than the track).

## Not included (separate pieces, when you want them)

- Mobile layout polish and the quote restyle — deliberately out of scope here so this stays a clean DJ-set drop-in.
- Making the visualizer react to *real* audio (the only thing that needs R2 CORS headers).
- Multiple saved sets — this build keeps one working set, which matches "a set for the night." Easy to extend to named slots later.
