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

export function nfLogo(alt) {
  // cubo isométrico: centro (150,0) local
  const cube = `<g transform="translate(160 232)">
<path d="M0 -92 80 -46 0 0 -80 -46Z" fill="url(#ntop)" stroke="#B9A0FA" stroke-width="2"/>
<path d="M-80 -46 0 0 0 100 -80 54Z" fill="url(#nleft)" stroke="#9D7BFF" stroke-width="2"/>
<path d="M80 -46 0 0 0 100 80 54Z" fill="url(#nright)" stroke="#9D7BFF" stroke-width="2"/>
<path d="M0 0V100" stroke="#C9B5FF" stroke-width="2.5" filter="url(#nglow)"/>
<path d="M0 -92 80 -46 0 0 -80 -46Z" fill="none" stroke="#fff" stroke-opacity=".35"/>
<g transform="matrix(.866 .5 0 1 -59 37)"><text x="0" y="0" font-family="Sora,sans-serif" font-weight="800" font-size="56" fill="url(#nmetal)">N</text></g>
<g transform="matrix(.866 -.5 0 1 21 59)"><text x="0" y="0" font-family="Sora,sans-serif" font-weight="800" font-size="56" fill="url(#nmetal)">F</text></g>
<path d="M-26 -46 0 -60 26 -46 0 -32Z" fill="#0A0414" stroke="#C9B5FF" stroke-width="1.6"/></g>`;
  const trunk = `<g fill="none" stroke="#A98BFF" stroke-linecap="round" filter="url(#nglow)"><path d="M160 172V150" stroke-width="3"/><path d="M160 190C140 170 128 160 118 150M160 190C180 170 192 160 202 150M160 200C130 186 110 178 98 160M160 200C190 186 210 178 222 160" stroke-width="1.6" stroke-opacity=".8"/></g>`;
  return `<figure class="dg nfl" role="img" aria-label="${alt}"><svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
<defs>
<filter id="nglow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<linearGradient id="ntop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A1C7A"/><stop offset="1" stop-color="#150A30"/></linearGradient>
<linearGradient id="nleft" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1D0F3E"/><stop offset="1" stop-color="#0B0518"/></linearGradient>
<linearGradient id="nright" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A1559"/><stop offset="1" stop-color="#0B0518"/></linearGradient>
<linearGradient id="nmetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#C9C5D6"/><stop offset="1" stop-color="#7C7A8C"/></linearGradient>
<linearGradient id="ncore" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9D6BFF"/><stop offset="1" stop-color="#5B7CFF"/></linearGradient>
<radialGradient id="nhalo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#7C3AED" stop-opacity=".35"/><stop offset="1" stop-color="#7C3AED" stop-opacity="0"/></radialGradient>
</defs>
<ellipse cx="170" cy="190" rx="190" ry="170" fill="url(#nhalo)"/>
<g transform="translate(46 14) scale(.98)">${brain()}</g>
${trunk}${cube}
<text x="336" y="250" font-family="Sora,sans-serif" font-weight="800" font-size="98" textLength="520" lengthAdjust="spacingAndGlyphs"><tspan fill="url(#nmetal)">NF</tspan><tspan fill="url(#ncore)" dx="8">CORE</tspan></text>
<text x="338" y="300" font-family="'Plus Jakarta Sans',sans-serif" font-weight="600" font-size="19" textLength="516" lengthAdjust="spacing" fill="#9A93B5">INFRASTRUCTURE MISSION CONTROL</text>
</svg></figure>`;
}
