// Logo/infográfico NFCore em SVG vetorial (nítido em qualquer resolução)
function rng(seed) { let s = seed; return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296); }

const BRAIN = 'M30 100C10 80 18 45 50 35C60 15 95 5 120 18C145 5 185 12 195 40C225 50 235 85 210 105C215 130 190 150 165 142C150 160 115 160 105 145C85 158 50 150 50 128C35 128 28 115 30 100Z';

function brain() {
  const r = rng(7); const pts = [];
  while (pts.length < 64) { const x = 20 + r() * 210, y = 8 + r() * 150; const dx = (x - 125) / 108, dy = (y - 82) / 76; if (dx * dx + dy * dy < 0.92) pts.push([x, y]); }
  let lines = '';
  pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i) { const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (d < 34) lines += `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke-opacity="${(0.75 - d / 60).toFixed(2)}"/>`; } }));
  const dots = pts.map(([x, y], i) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i % 5 === 0 ? 3 : 1.8}" fill="${i % 5 === 0 ? '#E4D8FF' : '#B9A0FA'}"/>`).join('');
  return `<g><clipPath id="nb"><path d="${BRAIN}"/></clipPath>
<path d="${BRAIN}" fill="#14092B" fill-opacity=".9" stroke="#9D7BFF" stroke-width="2.2" filter="url(#nglow)"/>
<g clip-path="url(#nb)"><g stroke="#A98BFF" stroke-width=".9" fill="none">${lines}</g>${dots}
<path d="M125 16C118 50 132 70 122 100C114 124 124 140 118 158" fill="none" stroke="#C9B5FF" stroke-width="1.4" stroke-opacity=".7"/></g></g>`;
}

export function nfLogo(alt, up = '') {
  return `<figure class="nfl" role="img" aria-label="${alt}"><img src="${up}assets/img/nfcore/cubo.webp" alt="" width="1000" height="1000" loading="lazy"><b class="nfw"><span>NF</span><em>CORE</em></b><span class="nft">Inteligência fiscal</span></figure>`;
}
