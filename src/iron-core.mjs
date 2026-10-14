// Infográfico "Iron Fit Core no centro" — HTML/CSS/SVG nativo (texto real, nítido e interativo)
// no lugar da imagem raster. Cards e globo acendem ao passar o mouse.
import { ic } from './icons.mjs';
import { EMBLEM } from './iron-int.mjs';

const L = [['01', 'Aluno', 'users'], ['03', 'Avaliação', 'check'], ['05', 'Agenda', 'calendar'], ['07', 'Financeiro', 'wallet']];
const R = [['02', 'Treino', 'flame'], ['04', 'Equipamentos', 'cog'], ['06', 'Acesso', 'lock'], ['08', 'Inteligência', 'bot']];
const STEPS = ['Core vertical', 'Módulos conectados', 'Dados contextualizados', 'Gestão e evolução'];

const pill = ([n, t, i], side, k) => `<div class="cg-pill ${side} p${k}"><span class="cg-ico">${ic(i)}</span><span class="cg-tx"><b>${n}</b><span>${t}</span></span></div>`;

// conectores (px reais; área = 60px de cada lado + disco de 330px; altura 410)
const Y = [46, 152, 258, 364];
function lines() {
  const out = []; const dots = [];
  const mk = (pts) => { out.push(`<polyline points="${pts.map((q) => q.join(',')).join(' ')}"/>`); const a = pts[0], z = pts[pts.length - 1]; dots.push(`<circle cx="${a[0]}" cy="${a[1]}" r="4"/><circle cx="${z[0]}" cy="${z[1]}" r="4"/>`); };
  const ring = [[122, 82], [74, 152], [74, 258], [122, 328]];
  const first = [[0, 46], [0, 152], [0, 258], [0, 364]];
  for (let k = 0; k < 4; k++) {
    const outer = k === 0 || k === 3;
    const pl = outer ? [first[k], [34, Y[k]], ring[k]] : [first[k], ring[k]];
    mk(pl);
    mk(pl.map(([x, y]) => [450 - x, y]));
  }
  return `<svg class="cg-svg" viewBox="0 0 450 410" aria-hidden="true"><g class="cg-ln">${out.join('')}</g><g class="cg-dt">${dots.join('')}</g></svg>`;
}

export function ironCore(alt) {
  return `<figure class="cg" role="group" aria-label="${alt}">
<div class="cg-top">
${L.map((x, k) => pill(x, 'l', k + 1)).join('')}${R.map((x, k) => pill(x, 'r', k + 1)).join('')}
<div class="cg-disc">${lines()}<div class="cg-ring"><div class="cg-in">${EMBLEM.replace('class="ii-em"', 'class="cg-em"').replace(/iig/g, 'icg')}<b class="cg-wm">IRON FIT <span>CORE</span></b><span class="cg-tg">INTELIGÊNCIA NO CENTRO.<br>EVOLUÇÃO EM MOVIMENTO.</span><span class="cg-by"><i></i>by FM Tecnologia</span></div></div></div>
</div>
<div class="cg-steps">${STEPS.map((t) => `<div>${t}</div>`).join('<i aria-hidden="true">→</i>')}</div>
</figure>`;
}
