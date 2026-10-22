// Regenerates brand rasters from the navy/cyan/gold theme:
//   public/images/og-image.png (1200x630), src/app/apple-icon.png (180), src/app/favicon.ico (16/32/48 PNG-in-ICO)
// Usage: node scripts/generate-brand-images.mjs   (needs network for Orbitron TTF; falls back to default font)
// On Windows, next/og's bundled default-font lookup is broken (path.join on a file: URL), so
// point OG_IMPL at a patched copy of node_modules/next/dist/compiled/@vercel/og/index.node.js
// (line with readFileSync(fileURLToPath(join(import.meta.url, ...))) -> new URL('./noto-sans...', import.meta.url)).
const { ImageResponse } = await import(process.env.OG_IMPL ? 'file:///' + process.env.OG_IMPL : 'next/og.js');
import { writeFileSync, readFileSync } from 'node:fs';

const h = (type, style, children) => ({ type, props: { style, children } });

async function loadFont(fam, weight) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${fam}:wght@${weight}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:2.0) Gecko/20100101 Firefox/4.0' },
    })).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|woff)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch { return null; }
}

const [orb, inter, mono] = await Promise.all([loadFont('Orbitron', 700), loadFont('Inter', 400), loadFont('JetBrains+Mono', 700)]);
if (!orb || !inter || !mono) throw new Error('font download failed');
// Always pass fonts explicitly: next/og's bundled default font path breaks on Windows.
const fonts = [
  { name: 'Orbitron', data: orb, weight: 700, style: 'normal' },
  { name: 'Inter', data: inter, weight: 400, style: 'normal' },
  { name: 'JetBrains Mono', data: mono, weight: 700, style: 'normal' },
];
const family = 'Orbitron';

const og = h('div', {
  width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
  padding: '0 80px', background: '#0a0e17', fontFamily: family,
  backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,255,0.28), rgba(10,14,23,0) 70%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(255,184,0,0.14), rgba(10,14,23,0) 70%)',
}, [
  h('div', { display: 'flex', color: '#00d4ff', fontSize: 26, letterSpacing: 6, fontWeight: 700 }, 'FREE FLY EVENT TRACKER'),
  h('div', { display: 'flex', color: '#e8eef7', fontSize: 84, fontWeight: 700, lineHeight: 1.1, marginTop: 24 }, 'Star Citizen Free Fly'),
  h('div', { display: 'flex', color: '#94a3b8', fontSize: 34, marginTop: 20, fontFamily: 'Inter' }, 'Play free, no purchase. Claim your 50,000 UEC bonus.'),
  h('div', { display: 'flex', alignItems: 'center', marginTop: 56 }, [
    h('div', { display: 'flex', color: '#ffb800', fontSize: 44, fontWeight: 700, fontFamily: 'JetBrains Mono', border: '2px solid #ffb800', borderRadius: 12, padding: '10px 26px' }, 'STAR-GCQJ-N6NC'),
  ]),
  h('div', { display: 'flex', position: 'absolute', right: 80, bottom: 48, color: '#94a3b8', fontSize: 26, fontFamily: 'Inter' }, 'freeflyevent.com'),
]);

async function render(el, w, hgt, out) {
  const res = new ImageResponse(el, { width: w, height: hgt, fonts });
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log('wrote', out);
}

await render(og, 1200, 630, 'public/images/og-image.png');

const svg = readFileSync('src/app/icon.svg', 'utf8');
const dataUri = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
const icon = (s) => h('div', { width: '100%', height: '100%', display: 'flex' }, [
  { type: 'img', props: { src: dataUri, width: s, height: s } },
]);
await render(icon(180), 180, 180, 'src/app/apple-icon.png');

// favicon.ico: PNG-in-ICO at 16/32/48
const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) {
  const r = new ImageResponse(icon(s), { width: s, height: s });
  pngs.push(Buffer.from(await r.arrayBuffer()));
}
const header = Buffer.alloc(6); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e[0] = s; e[1] = s; e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12); offset += pngs[i].length;
  return e;
});
writeFileSync('src/app/favicon.ico', Buffer.concat([header, ...dir, ...pngs]));
console.log('wrote src/app/favicon.ico');
