#!/usr/bin/env node
/**
 * Build playlist.json from music folders with historical figure reflections.
 * Run: node build-playlist.js
 */
const fs = require('fs');
const path = require('path');

const BASE = path.dirname(__filename);
const MUSIC_BASE = process.env.MUSIC_PATH || (process.platform === 'darwin'
  ? path.join(process.env.HOME, 'Desktop', 'MRMELO VIBES', 'music')
  : path.join(BASE, 'music'));

// Historical figures (public domain, pre-1950) and reflection templates per vibe
const FIGURES = [
  { name: 'Oscar Wilde', templates: [
    'I would have worn this to a dinner party. Perhaps as the main course.',
    'The future sounds exactly as decadent as I had hoped.',
    'A melody that knows it is beautiful. I approve.',
    'If life imitates art, this is the art I would imitate.',
    'One must have a heart of stone to listen to this without smiling.'
  ]},
  { name: 'Emily Dickinson', templates: [
    'A kind of quiet I recognize. The soul has its own frequencies.',
    'Hope is the thing with bass. I had not considered that.',
    'I could not stop for this song—it stopped for me.',
    'The brain is wider than the sky. This proves it.',
    'A certain slant of sound. I have heard it before.'
  ]},
  { name: 'Mark Twain', templates: [
    'I have heard worse. Much worse. This one I might actually enjoy.',
    'Reports of good music\'s death have been greatly exaggerated.',
    'The human race has one really effective weapon, and that is this.',
    'Whenever you find yourself on the side of the beat, pause.',
    'Truth is stranger than fiction, but this is stranger than both.'
  ]},
  { name: 'Friedrich Nietzsche', templates: [
    'That which does not kill the dance makes it stronger.',
    'One must still have chaos within to give birth to this.',
    'What does not destroy the groove, makes it groove harder.',
    'Without music, life would be a mistake. With this, it is a triumph.',
    'He who has a why to dance can bear almost any how.'
  ]},
  { name: 'Michel de Montaigne', templates: [
    'The body remembers what the mind forgets. This song proves it.',
    'What do I know? I know I would listen again.',
    'We are all patchworks of influence. This one fits.',
    'To dance well is to converse well. I hear the conversation.',
    'I speak the truth, not so much as I would, but as much as I dare.'
  ]},
  { name: 'Voltaire', templates: [
    'I disapprove of what you sing, but I will defend to the death your right to sing it.',
    'The best is the enemy of the good. This is both.',
    'Doubt is an uncomfortable position, but certainty is absurd. This is neither.',
    'Common sense is not so common. Nor is this melody.',
    'Judge a man by his questions rather than his answers. Or by his playlist.'
  ]},
  { name: 'William Shakespeare', templates: [
    'If music be the food of love, play on. I am full.',
    'The course of true love never did run smooth. Nor did this bass line.',
    'We know what we are, but not what we may be. Until we hear this.',
    'What light through yonder speaker breaks? It is the east.',
    'All the world\'s a stage, and this is the soundtrack.'
  ]},
  { name: 'Jane Austen', templates: [
    'It is a truth universally acknowledged that a person in possession of headphones must be in want of this.',
    'My good opinion once lost is lost forever. I have not lost it here.',
    'I declare after all there is no enjoyment like listening.',
    'One half of the world cannot understand the pleasures of the other. I understand this.',
    'To be fond of dancing was a certain step towards falling in love with this.'
  ]},
  { name: 'Ralph Waldo Emerson', templates: [
    'Music takes us out of the actual and whispers to us dim secrets.',
    'The creation of a thousand forests is in one acorn. The creation of a thousand moods is in this.',
    'Adopt the pace of nature. Or adopt the pace of this. Both work.',
    'Nothing great was ever achieved without enthusiasm. Or without a good beat.',
    'Write it on your heart that every day is the best day for this song.'
  ]},
  { name: 'Henry David Thoreau', templates: [
    'I went to the woods because I wished to live deliberately. I stayed for this.',
    'The mass of men lead lives of quiet desperation. This is the antidote.',
    'Simplify, simplify. But not the playlist. Keep this.',
    'In wildness is the preservation of the world. And in this melody.',
    'If a man does not keep pace with his companions, perhaps he hears a different drummer. This one.'
  ]},
  { name: 'Blaise Pascal', templates: [
    'The heart has its reasons which reason knows nothing of. This song knows.',
    'All of humanity\'s problems stem from man\'s inability to sit quietly. Or to sit through this.',
    'I would have written a shorter reflection, but I did not have the time. I was listening.',
    'We know the truth not only by the reason but by the heart. And by the bass.',
    'Kind words do not cost much. Neither do kind melodies. This is priceless.'
  ]},
  { name: 'Walt Whitman', templates: [
    'I hear America singing, and this is one of the songs.',
    'I am large, I contain multitudes. This song is one of them.',
    'Do I contradict myself? Very well, I contradict myself. I contain this melody.',
    'The powerful play goes on, and you may contribute a verse. Or a chorus.',
    'Resist much, obey little. But obey this rhythm.'
  ]}
];

function parseFilename(filename) {
  const base = filename.replace(/\.(mp3|m4a|webm)$/i, '').trim();
  const sep = base.includes(' - ') ? ' - ' : ' – ';
  const idx = base.indexOf(sep);
  if (idx === -1) return { artist: 'Unknown', title: base };
  const artist = base.slice(0, idx).replace(/^NA\s*[-–]\s*/i, '').trim();
  const title = base.slice(idx + sep.length).trim();
  return { artist: artist || 'Unknown', title: title || base };
}

function getReflection(artist, title, catalogue, index) {
  const combined = `${artist} ${title} ${catalogue}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) hash = ((hash << 5) - hash) + combined.charCodeAt(i) | 0;
  const fi = Math.abs(hash) % FIGURES.length;
  const ti = Math.abs(hash >> 8) % FIGURES[fi].templates.length;
  const fig = FIGURES[fi];
  return { figure: fig.name, reflection: fig.templates[ti] };
}

function scanDir(dir, catalogue) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => /\.(mp3|m4a|webm)$/i.test(f));
  return files.map((f, i) => {
    const { artist, title } = parseFilename(f);
    const { figure, reflection } = getReflection(artist, title, catalogue, i);
    return {
      file: `music/${catalogue}/${f}`,
      artist,
      title,
      catalogue,
      figure,
      reflection
    };
  });
}

const catalogues = ['80s', '90s', '2000', 'folk', 'MrMelo Mix'];
let all = [];
for (const cat of catalogues) {
  const dir = path.join(MUSIC_BASE, cat);
  const tracks = scanDir(dir, cat);
  all = all.concat(tracks);
}

const outPath = path.join(BASE, 'playlist.json');
const outDir = path.dirname(outPath);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(all, null, 2), 'utf8');
console.log(`Wrote ${all.length} tracks to ${outPath}`);
