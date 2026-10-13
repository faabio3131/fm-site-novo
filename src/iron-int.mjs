// Infográfico "Inteligência para apoiar decisões" do Iron Fit — feito em HTML/CSS/SVG
// (texto real, nítido em qualquer tela) no lugar da imagem raster.
import { ic } from './icons.mjs';

const pt = (r, a) => { const t = (a * Math.PI) / 180; return [100 + r * Math.cos(t), 100 + r * Math.sin(t)]; };
const arc = (r, a0, a1) => { const [x0, y0] = pt(r, a0); const [x1, y1] = pt(r, a1); return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };

const EMBLEM = `<svg class="ii-em" viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="iig" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="200"><stop offset="0" stop-color="#9BFFC4"/><stop offset="1" stop-color="#1FD468"/></linearGradient></defs>
<g fill="none" stroke="url(#iig)" stroke-linecap="round">
<path d="${arc(84, -58, 58)}" stroke-width="14"/><path d="${arc(84, 122, 238)}" stroke-width="14"/>
<path d="${arc(57, -62, 62)}" stroke-width="8"/><path d="${arc(57, 118, 242)}" stroke-width="8"/>
<circle cx="100" cy="100" r="19" stroke-width="6"/>
<path d="M100 119V186" stroke-width="7"/><path d="M100 10V81" stroke-width="3.5"/></g>
<circle cx="100" cy="100" r="6.5" fill="#B8FFD5"/></svg>`;

const CARDS = [
  ['01', 'layers', 'Contexto', 'Dados da operação organizados pelo Core Vertical para preservar o contexto correto.'],
  ['02', 'chart', 'Insights', 'Arquitetura preparada para interpretar sinais e padrões sem tornar a IA uma dependência dos fluxos essenciais.'],
  ['03', 'cog', 'Evolução', 'Recursos inteligentes podem evoluir sobre a mesma base de acompanhamento e desempenho.'],
  ['04', 'shield', 'Governança', 'Inteligência como apoio à decisão, com supervisão e regras definidas pela operação.'],
];
const CHIPS = [['01', 'Elegibilidade'], ['02', 'Agenda'], ['03', 'Check-in'], ['04', 'Acesso'], ['05', 'Reconciliação'], ['06', 'Providers']];

const card = ([n, i, t, d], side) => `<div class="ii-card ${side}"><span class="ii-ic">${ic(i)}</span><b class="ii-n">${n}</b><h4>${t}</h4><p>${d}</p></div>`;

export function ironInt(alt) {
  return `<figure class="ii" role="group" aria-label="${alt}">
<div class="ii-top">
<div class="ii-txt"><span class="ii-k"><i></i>IRON FIT CORE</span><h3>Inteligência para apoiar decisões. <em>Controle sempre humano.</em></h3><p>A Iron Intelligence foi desenhada para incorporar recursos inteligentes ao acompanhamento e à gestão sem tornar a IA uma dependência dos fluxos essenciais.</p><div class="ii-q"><b>O profissional continua no controle.</b><p>Treinos, avaliações, aprovações e decisões continuam sujeitos às regras e à supervisão profissional definidas pela operação.</p></div></div>
${card(CARDS[0], 'l1')}${card(CARDS[2], 'l2')}
<div class="ii-disc"><i class="ii-cn a"></i><i class="ii-cn b"></i><i class="ii-cn c"></i><i class="ii-cn d"></i><div class="ii-ring"><div class="ii-in">${EMBLEM}<b class="ii-wm">IRON FIT <span>CORE</span></b><span class="ii-tg">INTELIGÊNCIA NO CENTRO.<br>EVOLUÇÃO EM MOVIMENTO.</span><span class="ii-by"><i></i>by FM Tecnologia</span></div></div></div>
${card(CARDS[1], 'r1')}${card(CARDS[3], 'r2')}
</div>
<div class="ii-chips">${CHIPS.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
<div class="ii-ban"><b>Conectar sem criar ilhas.</b><p>Acesso, agenda, check-in, elegibilidade e reconciliação retornam ao mesmo contexto operacional. A arquitetura também está preparada para evoluir em conteúdo, creators e experiências digitais fitness com governança de direitos.</p></div>
</figure>`;
}
