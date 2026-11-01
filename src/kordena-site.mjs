// Site próprio do Kordena. Reaproveita CSS, ícones, marca FM, fotos, vídeos e o conteúdo aprovado de products.mjs.
// Saída: sites/kordena (ou OUT). Nada de cliente, número ou certificação inventados.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { SITE, wa } from './config.mjs';
import { PRODUCTS } from './products.mjs';
import { ic } from './icons.mjs';
import { BRANDS } from './brands.mjs';
import { IMAGES } from './images.mjs';
import { VIDEOS } from './videos.mjs';

const OUT = process.env.OUT ?? 'sites/kordena';
const FMSITE = 'https://fmtecnologiaia.com.br';
const P = PRODUCTS.find((x) => x.slug === 'kordena');
const I = IMAGES.kordena;
const V = VIDEOS.kordena;
const sec = (id) => P.sections.find((s) => s.id === id);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const CSSV = crypto.createHash('md5').update(fs.readFileSync('assets/site.css')).digest('hex').slice(0, 8);
const href = (r) => (r === '' ? 'index.html' : r + '.html');
const login = 'https://app.kordenaia.com.br';
const msg = (t) => wa(t);

const head = (k, t, l, center = true) => `<div class="sh ${center ? 'center' : ''}"><span class="kick">${k}</span><h2>${t}</h2>${l ? `<p class="sub">${l}</p>` : ''}</div>`;
const S = (id, inner, cls = '') => `<section class="sec ${cls}" id="${id}"><div class="wrap">${inner}</div></section>`;
const cards = (items) => `<div class="grid ${items.length % 3 === 0 ? 'g3' : 'g4'}">${items.map(([i, t, d]) => `<div class="card"><div class="ic">${ic(i)}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>`;
const flow = (items) => `<div class="flow">${items.map(([a, b]) => `<div><b>${esc(a).toUpperCase()}</b><span>${esc(b)}</span></div>`).join('')}</div>`;
const groups = (s) => s.groups.map((g) => `<h3 class="gh">${esc(g.name)}</h3><div class="grid g3" style="margin-top:18px">${g.items.map(([i, t, d]) => `<div class="card sm"><div class="ic">${ic(i)}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>`).join('');
const fig = (f, cls = '') => `<figure class="dg ${cls}"><img src="assets/img/kordena/${f.file}" alt="${esc(f.alt)}" loading="lazy"${f.pos ? ` style="object-position:${f.pos}"` : ''}></figure>`;
const split = (s) => `<div class="split ${s.flip ? 'flip' : ''}"><div><span class="kick">${s.kicker}</span><h2 style="margin:14px 0 16px">${s.title}</h2><p class="sub">${s.lead}</p><ul>${s.bullets.map((b) => `<li>${ic('check')}<span>${esc(b)}</span></li>`).join('')}</ul>${s.note ? `<p style="margin-top:18px;font-size:14px;color:var(--t3)">${esc(s.note)}</p>` : ''}</div>${s.side ? `<div class="panel"><h4>${esc(s.side.title)}</h4><div class="steps">${s.side.steps.map((x, i) => `<div><i>${i + 1}</i>${esc(x)}</div>`).join('')}</div></div>` : fig(s, 'tall')}</div>`;
const brandRow = (logos) => `<div class="brands">${logos.map((b) => { const br = BRANDS[b]; return br ? `<span class="brand" style="--b:${br.hex}"><svg viewBox="0 0 24 24" role="img" aria-label="${esc(br.name)}"><path d="${br.path}"/></svg><span>${esc(br.name)}</span></span>` : `<span class="brand txt"><span>${esc(b)}</span></span>`; }).join('')}</div>`;
const integ = () => { const s = sec('integracoes'); return head(s.kicker, s.title, s.lead) + `<div class="grid g3">${s.items.map(([i, t, d, tag, logos]) => `<div class="card">${logos ? brandRow(logos) : `<div class="ic">${ic(i)}</div>`}${tag ? `<span class="pill am" style="margin-top:14px">${esc(tag)}</span>` : ''}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div><p class="fnote">${esc(s.footnote)}</p>`; };
const video = () => { const has = (f) => fs.existsSync(path.join('assets/video/kordena', f + '.mp4')); const pl = (f, label, cls = '') => has(f) ? `<figure class="vid ${cls}"><video controls preload="none" playsinline poster="assets/video/kordena/${f}.jpg" aria-label="${esc(label)}"><source src="assets/video/kordena/${f}.mp4" type="video/mp4"></video></figure>` : ''; return head(V.kicker, V.title, V.lead) + `<div style="margin-top:44px">${pl(V.main.file, V.main.label, 'main')}</div><div class="grid g4" style="margin-top:24px">${V.clips.map((k) => `<div class="clip">${pl(k.file, k.title)}<h3>${esc(k.title)}</h3><p>${esc(k.text)}</p></div>`).join('')}</div>`; };
const pricing = () => { const pr = P.pricing; return head('Planos e condições', 'Kordena', pr.note) + `<div class="price"><div class="card"><h3>Mensal</h3><div class="v">${pr.monthly}</div></div><div class="card"><h3>Anual</h3><div class="v">${pr.yearly}</div></div><div class="card"><h3>Enterprise</h3><div class="v">${pr.enterprise}</div></div></div><div class="center" style="margin-top:32px"><a class="btn p l" href="${msg(P.trialMsg)}" target="_blank" rel="noopener">Quero ser avisado do teste grátis</a></div>`; };

function nav(active) {
  const items = [['recursos', 'Recursos'], ['index#core', 'Gerente IA Core'], ['index#fiscal', 'Fiscal'], ['planos', 'Planos e dúvidas'], ['contato', 'Contato']];
  return `<header class="nav"><div class="wrap"><a class="brand" href="${href('')}"><span class="wm"><img src="assets/brand/fm/logo-fm.webp" width="626" height="114" alt="FM Tecnologia IA"><small>Kordena · Setor alimentício</small></span></a>
<nav class="menu" id="menu" aria-label="Principal">${items.map(([r, t]) => `<a href="${r.includes('#') ? r.replace('index', href('')) : href(r)}" class="${active === r ? 'on' : ''}">${t}</a>`).join('')}</nav>
<div class="nr"><a class="btn sm" href="${login}">Entrar</a><a class="btn sm k" href="${href('planos')}">Teste grátis</a><button class="burger" id="burger" aria-label="Menu">☰</button></div></div></header>`;
}
const footer = () => `<footer class="foot"><div class="wrap"><div class="g">
<div><a class="brand" href="${href('')}"><span class="wm"><img src="assets/brand/fm/logo-fm.webp" width="626" height="114" alt="FM Tecnologia IA"><small>${SITE.signature}</small></span></a><p>Kordena é um produto da ${SITE.name}.</p></div>
<div><h6>Kordena</h6><ul><li><a href="${href('recursos')}">Recursos</a></li><li><a href="${href('planos')}">Planos e dúvidas</a></li><li><a href="${href('contato')}">Contato</a></li><li><a href="${login}">Entrar no Kordena</a></li></ul></div>
<div><h6>FM Tecnologia IA</h6><ul><li><a href="${FMSITE}">Site da FM</a></li><li><a href="${FMSITE}/produtos/kordena">Kordena no site da FM</a></li><li><a href="${FMSITE}/produtos/nfcore">NFCore, o fiscal do Kordena</a></li></ul></div>
<div><h6>Legal</h6><ul><li><a href="${FMSITE}/seguranca">Segurança e privacidade</a></li><li><a href="${FMSITE}/privacidade">Política de privacidade</a></li><li><a href="${FMSITE}/termos">Termos de uso</a></li></ul></div>
</div><div class="fb"><span>© ${new Date().getFullYear()} ${SITE.legalName}. Todos os direitos reservados. CNPJ ${SITE.cnpj}</span><span>${SITE.email}</span></div></div></footer>`;

function page(route, { title, desc, active, body }) {
  const html = `<!doctype html><html lang="pt-BR" data-p="kordena"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/png" href="assets/brand/fm/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/site.css?v=${CSSV}"></head><body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>${nav(active)}<main id="conteudo">${body}</main>${footer()}<a class="fab" href="${msg('Olá! Vim pelo site do Kordena e quero tirar uma dúvida.')}" target="_blank" rel="noopener" aria-label="Falar com a FM pelo WhatsApp">${ic('chat')}</a><script src="assets/site.js" defer></script></body></html>`;
  const file = path.join(OUT, route === '' ? 'index.html' : route + '.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html.replace(/(<\/(?:div|p|li|ul|ol|h[1-6]|section|header|footer|nav|main|figure|details|summary)>)(?=<)/g, '$1\n'));
}

const hero = ({ kick, title, lead, ctas, note, img, alt }) => `<section class="phero"><div class="wrap"><div class="pg"><div><span class="eb"><i></i>${esc(kick)}</span><h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p><div class="b">${ctas}</div>${note ? `<p class="note">${esc(note)}</p>` : ''}</div>${img ? `<div class="vis"><figure class="dg"><img src="assets/img/kordena/${img}" alt="${esc(alt)}"></figure></div>` : ''}</div></div></section>`;
const cta = `<a class="btn p l" href="${href('planos')}">Quero o teste grátis de 15 dias</a><a class="btn l" href="${login}">Já tem conta? Entrar →</a>`;
const photo = (s, fl) => S(s.id, split({ ...s, flip: fl }), fl ? 'soft' : '');
const owner = { kicker: I.owner_text.kicker, title: I.owner_text.title, lead: I.owner_text.lead, bullets: I.owner_text.bullets, ...I.owner };

// Home
page('', {
  title: 'Kordena — gestão inteligente de ponta a ponta para o setor alimentício',
  desc: 'Kordena conecta pedidos, cozinha, estoque, delivery, marketing, fiscal e financeiro em uma plataforma coordenada pelo Gerente IA Core, para restaurantes, pizzarias, padarias e outros negócios de alimentação.',
  active: '',
  body: hero({ kick: P.eyebrow, title: P.title, lead: P.lead, ctas: cta, note: P.trial.note, img: 'restaurante.jpg', alt: 'Salão de restaurante com atendimento de mesa' })
    + S('core', head(sec('core').kicker, sec('core').title, sec('core').lead) + flow(sec('core').items), 'soft')
    + S('visao', split({ ...owner, flip: true }))
    + photo(I.splits[0], true)
    + photo(I.splits[1], false)
    + S('atendente', head('Atendente IA', 'Mais que um chatbot: um gerente de atendimento.', I.splits[2].lead.replace(/\s+$/, '')) + `<ul class="chips" style="margin:24px auto 0;max-width:760px">${I.splits[2].bullets.map((b) => `<li style="list-style:none;display:flex;gap:10px;margin:8px 0">${ic('check')}<span>${esc(b)}</span></li>`).join('')}</ul>` + flow(I.splits[2].flow), 'soft')
    + S('estoque', split(sec('estoque')))
    + S('financeiro', split(sec('financeiro')), 'soft')
    + S('delivery', split(sec('delivery')))
    + S('demo', video(), 'dark')
    + S('core-acao', head(sec('core-acao').kicker, sec('core-acao').title, sec('core-acao').lead) + `<div class="qs">${sec('core-acao').items.map((q) => `<div>“${esc(q)}”</div>`).join('')}</div>`, 'soft')
    + S('fiscal', split(sec('fiscal')))
    + S('integracoes', integ(), 'soft')
    + S('ambiente', head('Ambiente', I.ambient_title, '') + `<div class="grid g3">${I.ambient.map((a) => fig(a)).join('')}</div>`)
    + S('seguranca', head(sec('seguranca').kicker, sec('seguranca').title, '') + cards(sec('seguranca').items), 'dark')
    + S('cta', `<p class="center"><a class="btn p l" href="${href('planos')}">Ver planos e começar o teste grátis</a></p>`),
});

// Recursos
page('recursos', {
  title: 'Recursos do Kordena — atendimento, salão, cozinha, delivery, estoque, marketing e fiscal',
  desc: 'Tudo o que o Kordena faz: atendente IA, central de pedidos, PDV, mesas e comandas, KDS, delivery com Google Maps, estoque automático, marketing e fiscal com NFCore.',
  active: 'recursos',
  body: hero({ kick: 'Recursos', title: 'Tudo conectado ao centro da gestão.', lead: sec('recursos').lead, ctas: cta })
    + S('recursos', groups(sec('recursos')), 'soft'),
});

// Planos e dúvidas
page('planos', {
  title: 'Planos e dúvidas — Kordena',
  desc: 'Preços do Kordena, como funciona o teste grátis de 15 dias e as respostas para as dúvidas mais comuns.',
  active: 'planos',
  body: hero({ kick: 'Planos e dúvidas', title: 'Comece com 15 dias grátis, sem cartão.', lead: P.trial.note, ctas: `<a class="btn p l" href="${msg(P.trialMsg)}" target="_blank" rel="noopener">Quero ser avisado da ativação</a>` })
    + S('planos', pricing(), 'soft')
    + S('duvidas', head('Antes de começar', 'Perguntas frequentes', '') + `<div class="faq">${sec('duvidas').items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`),
});

// Contato
page('contato', {
  title: 'Contato — Kordena',
  desc: 'Fale com a equipe da FM Tecnologia IA sobre o Kordena, disponibilidade e implantação.',
  active: 'contato',
  body: hero({ kick: 'Contato', title: 'Fale com a equipe do Kordena.', lead: 'Tire dúvidas sobre disponibilidade e implantação ou registre o interesse no teste grátis. Respondemos pelo WhatsApp e por e-mail.', ctas: `<a class="btn p l" href="${msg(P.talkMsg)}" target="_blank" rel="noopener">Falar pelo WhatsApp</a><a class="btn l" href="mailto:${SITE.email}">${SITE.email}</a>`, note: P.trial.note })
    + S('acesso', head('Já é cliente?', 'Acesse o Kordena.', 'Entre com a sua conta.') + `<p class="center"><a class="btn p l" href="${login}">Entrar no Kordena</a></p>`, 'soft'),
});

for (const [from, to] of [['assets/site.css', 'assets/site.css'], ['assets/site.js', 'assets/site.js'], ['assets/brand/fm', 'assets/brand/fm'], ['assets/img/kordena', 'assets/img/kordena'], ['assets/video/kordena', 'assets/video/kordena']]) fs.cpSync(from, path.join(OUT, to), { recursive: true });
console.log('Kordena site em', OUT);
