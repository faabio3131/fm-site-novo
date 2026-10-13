import fs from 'node:fs';
import path from 'node:path';
import { SITE, STATUS, wa } from './config.mjs';
import { PRODUCTS, bySlug } from './products.mjs';
import { ic } from './icons.mjs';
import { ironInt } from './iron-int.mjs';
import { IMAGES } from './images.mjs';
import { VIDEOS } from './videos.mjs';
const wm = (up) => `<span class="wm"><img src="${up}assets/brand/fm/logo-fm.webp" width="626" height="114" alt="FM Tecnologia"><small>IA para melhorar hoje e evoluir o amanhã.</small></span>`;
const CREDITS = fs.existsSync('src/credits.json') ? JSON.parse(fs.readFileSync('src/credits.json', 'utf8')) : {};

const EXT = process.env.LINKEXT ?? '';         // '' em produção, '.html' no preview local
const OUT = process.env.OUT ?? 'docs';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const PC = { kordena: ['#4F7BF2', '79,123,242'], 'iron-fit': ['#2BF47A', '43,244,122'], nfcore: ['#8B5CF6', '139,92,246'], command: ['#FF9F1C', '255,159,28'], atendevendeia: ['#19D3C5', '25,211,197'], campaia: ['#F0509B', '240,80,155'], 'erp-core': ['#FF8A3D', '255,138,61'], 'super-core-extreme': ['#E5484D', '229,72,77'] };
const pcs = (slug) => `--pc:${PC[slug][0]};--pcrgb:${PC[slug][1]}`;
const main = PRODUCTS.filter((p) => p.group === 'main');
const dev = PRODUCTS.filter((p) => p.group === 'dev');
const rnd = PRODUCTS.filter((p) => p.group === 'rnd');

function ctx(route) {
  const depth = route.split('/').length - 1;
  const up = depth ? '../'.repeat(depth) : './';
  const href = (r) => (r === '' ? up + (EXT ? 'index.html' : '') : up + r + EXT);
  return { up, href };
}

function nav(c, active) {
  const items = [['produtos', 'Produtos'], ['solucoes', 'Soluções'], ['precos', 'Preços'], ['recursos', 'Recursos'], ['empresa', 'Empresa']];
  return `<header class="nav"><div class="wrap"><a class="brand" href="${c.href('')}">${wm(c.up)}</a>
<nav class="menu" id="menu" aria-label="Principal">${items.map(([r, t]) => `<a href="${c.href(r)}" class="${active === r ? 'on' : ''}">${t}</a>`).join('')}</nav>
<div class="nr"><a class="btn sm" href="${c.href('entrar')}">Entrar</a><a class="btn sm k" href="${c.href('contato')}">Falar com especialista</a><button class="burger" id="burger" aria-label="Menu">☰</button></div></div></header>`;
}

function footer(c) {
  const li = (arr) => arr.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('');
  return `<footer class="foot"><div class="wrap"><div class="g">
<div><a class="brand" href="${c.href('')}">${wm(c.up)}</a><p>${SITE.signature} Software e inteligência artificial aplicados a negócios.</p></div>
<div><h6>Produtos</h6><ul>${li(main.map((p) => [p.name, c.href('produtos/' + p.slug)]))}</ul></div>
<div><h6>Em desenvolvimento</h6><ul>${li([...dev, ...rnd].map((p) => [p.name, c.href('produtos/' + p.slug)]))}</ul></div>
<div><h6>Empresa</h6><ul>${li([['Sobre a FM', c.href('empresa')], ['Soluções', c.href('solucoes')], ['Preços', c.href('precos')], ['Recursos', c.href('recursos')], ['Contato', c.href('contato')]])}<li><a href="mailto:${SITE.email}">${SITE.email}</a></li><li><a href="${wa('Olá! Quero conversar sobre os produtos da FM Tecnologia.')}">WhatsApp ${SITE.whatsappLabel}</a></li></ul></div>
</div><div class="fb"><span>© ${new Date().getFullYear()} ${SITE.legalName}. Todos os direitos reservados. CNPJ ${SITE.cnpj}</span><span>${SITE.domain}</span></div></div></footer>`;
}

function page(route, { title, desc, active, body, prod }) {
  const c = ctx(route);
  const html = `<!doctype html><html lang="pt-BR"${prod ? ` data-p="${prod}"` : ''}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website"><meta property="og:image" content="https://${SITE.domain}/assets/brand/fm/compartilhar-1200x630.png"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/png" href="${c.up}assets/brand/fm/favicon.png"><link rel="apple-touch-icon" href="${c.up}assets/brand/fm/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="${c.up}assets/site.css"></head><body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>${nav(c, active)}<main id="conteudo">${typeof body === 'function' ? body(c) : body}</main>${footer(c)}<script src="${c.up}assets/site.js"></script></body></html>`;
  const file = path.join(OUT, route === '' ? 'index.html' : route + '.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const SHORT = { cobranca: 'Cobrança', documentos: 'Documentos', plataforma: 'Plataforma', fiscal: 'Fiscal', delivery: 'Delivery', desafio: 'Desafio', 'para-quem': 'Para quem', 'como-comecar': 'Como começar', salao: 'Salão', atendente: 'Atendente IA', cozinha: 'Cozinha', demo: 'Demonstração', visao: 'Visão', ambiente: 'Ambiente', core: 'Core', recursos: 'Recursos', estoque: 'Estoque', financeiro: 'Financeiro', 'core-acao': 'Core em ação', integracoes: 'Integrações', seguranca: 'Segurança', planos: 'Planos', duvidas: 'Dúvidas', gestao: 'Gestão', aluno: 'Aluno', equipamentos: 'Equipamentos', inteligencia: 'Inteligência', hub: 'Hub', autoridade: 'Autoridade', capacidades: 'Capacidades', disponibilidade: 'Disponibilidade', arquitetura: 'Arquitetura', governanca: 'Governança', kordena: 'Kordena', rotina: 'Rotina' };
const pill = (p) => { const s = STATUS[p.status]; return `<span class="pill ${s.tone}">${s.label}</span>`; };
const head = (kick, title, lead, center) => `<div class="sh ${center ? 'center' : ''}"><span class="kick">${kick}</span><h2>${title}</h2>${lead ? `<p class="sub">${lead}</p>` : ''}</div>`;

function ctas(p, c) {
  if (p.noCta) return { primary: '', secondary: '' };
  const available = p.status === 'available' && p.signupUrl;
  const label = available ? 'Testar grátis' : p.ctaLabel || (p.trial?.days ? `Quero testar grátis por ${p.trial.days} dias` : p.group === 'dev' ? 'Quero ser avisado' : 'Falar com a FM');
  const url = available ? p.signupUrl : wa(p.trialMsg);
  return { label, url,
    primary: `<a class="btn p l" href="${url}">${label}</a>`,
    secondary: `<a class="btn l" href="${wa(p.talkMsg)}">Falar com a FM</a>` };
}

function windowOf(p) {
  const w = p.window;
  return `<div class="win"><div class="wb"><b></b><b></b><b></b><span>${esc(w.title)}</span></div><div class="wbody"><div class="side">${w.side.map((s) => `<div>${esc(s)}</div>`).join('')}</div><div class="wmain">${w.cards.map((x) => `<div class="wc ${x.ai ? 'ai' : ''}"><h5>${x.ai ? ic('bot') : ''}${esc(x.h)}</h5><p>${esc(x.p)}</p></div>`).join('')}</div></div></div>`;
}

function floatOf(p) {
  const a = p.window.cards.find((x) => x.ai) || p.window.cards[0];
  return `<div class="float f1"><span class="ic">${ic('bot')}</span><div><b>${esc(a.h)}</b><small>${esc(a.p.length > 52 ? a.p.slice(0, 50).replace(/[ ,.;]+\S*$/, '') + '…' : a.p)}</small></div></div>`;
}

function section(s, p, c) {
  const html = sectionBase(s, p, c);
  if (!s.figure || (!s.figure.native && !fs.existsSync(path.join('assets/img', p.slug, s.figure.file)))) return html;
  const f = s.figure;
  if (f.native === 'iron-int') return html.replace(/<\/div><\/section>$/, `${ironInt(esc(f.alt))}</div></section>`);
  return html.replace(/<\/div><\/section>$/, `<figure class="dg"><img src="${c.up}assets/img/${p.slug}/${f.file}" alt="${esc(f.alt)}" loading="lazy"></figure></div></section>`);
}

function sectionBase(s, p, c) {
  const wrap = (inner, cls = '') => `<section class="sec ${s.dark ? 'dark' : cls}" id="${s.id}"><div class="wrap">${inner}</div></section>`;
  switch (s.kind) {
    case 'flow': return wrap(head(s.kicker, s.title, s.lead, true) + `<div class="flow">${s.items.map(([a, b]) => `<div>${/^\d+$/.test(a) ? `<b>${a}</b>` : `<b>${esc(a).toUpperCase()}</b>`}<span>${esc(b)}</span></div>`).join('')}</div>`, 'soft');
    case 'cards': return wrap(head(s.kicker, s.title, s.lead, true) + `<div class="grid ${s.items.length % 3 === 0 ? 'g3' : 'g4'}">${s.items.map(([i, t, d, tag]) => `<div class="card"><div class="ic">${ic(i)}</div>${tag ? `<span class="pill am" style="margin-top:14px">${esc(tag)}</span>` : ''}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>`);
    case 'split': return wrap(`<div class="split ${s.flip ? 'flip' : ''}"><div><span class="kick">${s.kicker}</span><h2 style="margin:14px 0 16px">${s.title}</h2><p class="sub">${s.lead}</p><ul>${s.bullets.map((b) => `<li>${ic('check')}<span>${esc(b)}</span></li>`).join('')}</ul>${s.note ? `<p style="margin-top:18px;font-size:14px;color:var(--t3)">${esc(s.note)}</p>` : ''}${s.ctaSlug ? `<p style="margin-top:26px"><a class="btn" href="${c.href('produtos/' + s.ctaSlug)}">${esc(s.ctaLabel)} →</a></p>` : ''}</div><div class="panel"><h4>${esc(s.side.title)}</h4><div class="steps">${s.side.steps.map((x, i) => `<div><i>${i + 1}</i>${esc(x)}</div>`).join('')}</div></div></div>`, s.flip ? 'soft' : '');
    case 'questions': return wrap(head(s.kicker, s.title, s.lead, true) + `<div class="qs">${s.items.map((q) => `<div>“${esc(q)}”</div>`).join('')}</div>`, 'soft');
    case 'faq': return wrap(head('Antes de começar', 'Perguntas frequentes', '', true) + `<div class="faq">${s.items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`);
    case 'groups': return wrap(head(s.kicker, s.title, s.lead, true) + s.groups.map((g) => `<h3 class="gh">${esc(g.name)}</h3><div class="grid g3" style="margin-top:18px">${g.items.map(([i, t, d]) => `<div class="card sm"><div class="ic">${ic(i)}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>`).join(''), 'soft');
    case 'contrast': return wrap(head(s.kicker, s.title, s.lead, true) + `<div class="grid ${s.items.length === 4 ? 'g2' : s.items.length === 5 ? 'c5' : 'g3'} cgrid">${s.items.map(([pr, an]) => `<div class="card cc"><span class="cl">O desafio</span><h3>${esc(pr)}</h3><span class="cl ok">A resposta</span><p>${esc(an)}</p></div>`).join('')}</div>`);
    case 'who': return wrap(head(s.kicker, s.title, s.lead, true) + `<div class="chips">${s.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>`, 'soft');
    case 'notice': return wrap(head(s.kicker, s.title, '', true) + `<div class="notice">${esc(s.text)}</div>`);
    case 'pricing': {
      if (!p.pricing) return '';
      const pr = p.pricing; const k = ctas(p, c);
      return wrap(head('Planos e condições', p.name, pr.note, true) + `<div class="price"><div class="card"><h3>Mensal</h3><div class="v">${pr.monthly}</div></div><div class="card"><h3>Anual</h3><div class="v">${pr.yearly}</div></div><div class="card"><h3>Enterprise</h3><div class="v">${pr.enterprise}</div></div></div><div class="center" style="margin-top:32px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${k.primary}${k.secondary}</div>`, 'soft');
    }
  }
  return '';
}


const fig = (slug, im, cls = '') => {
  const has = fs.existsSync(path.join('assets/img', slug, im.file));
  return has
    ? `<figure class="ph ${cls}"><img src="@UP@assets/img/${slug}/${im.file}" alt="${esc(im.alt)}" loading="lazy"${im.pos ? ` style="object-position:${im.pos}"` : ''}>${CREDITS[slug + '/' + im.file]?.note ? `<figcaption class="credit">${esc(CREDITS[slug + '/' + im.file].note)}</figcaption>` : CREDITS[slug + '/' + im.file] ? `<figcaption class="credit">Foto: <a href="${CREDITS[slug + '/' + im.file].by_url}" target="_blank" rel="noopener">${esc(CREDITS[slug + '/' + im.file].by)}</a> · <a href="https://unsplash.com/?utm_source=fm_tecnologia&utm_medium=referral" target="_blank" rel="noopener">Unsplash</a></figcaption>` : ''}</figure>`
    : `<figure class="ph empty ${cls}"><figcaption><b>Imagem em preparação</b><span>${esc(im.brief)}</span></figcaption></figure>`;
};

function chatMock() {
  const bars = [6, 12, 18, 10, 22, 14, 8, 20, 16, 9, 13, 18, 7].map((h) => `<i style="height:${h}px"></i>`).join('');
  return `<figure class="chatmock" aria-label="Exemplo ilustrativo do Atendente IA"><div class="phone"><div class="ph-head"><span class="av">${ic('bot')}</span><div><b>Atendente IA</b><small>Kordena · online</small></div></div>
<div class="msgs"><div class="m c">Oi! Quero fazer um pedido.</div><div class="m a">Olá! Posso te mostrar o cardápio ou você já sabe o que quer?</div><div class="m c aud"><span class="play">▶</span><span class="wave">${bars}</span><small>0:08</small></div><div class="m a">Entendi o seu áudio e anotei o pedido. Quer incluir uma bebida ou sobremesa?<div class="ord"><span>${ic('check')} Itens do pedido</span><span>${ic('check')} Complementos sugeridos</span><span>${ic('check')} Endereço de entrega</span><em>Confirmar pedido</em></div></div></div></div>
<div class="core-side"><div class="chip-core">${ic('bot')}<span>Gerente IA Core</span></div><div class="arrow">↓</div><div class="chip-s">PDV e cozinha (KDS)</div><div class="chip-s">Estoque</div><div class="chip-s">Financeiro</div><small>Exemplo ilustrativo</small></div></figure>`;
}

function photoSections(p, c) {
  const I = IMAGES[p.slug]; if (!I) return '';
  const t = I.owner_text;
  const own = `<section class="sec soft" id="visao"><div class="wrap"><div class="split flip"><div><span class="kick">${t.kicker}</span><h2 style="margin:14px 0 16px">${t.title}</h2><p class="sub">${t.lead}</p><ul>${t.bullets.map((b) => `<li>${ic('check')}<span>${esc(b)}</span></li>`).join('')}</ul></div>${fig(p.slug, I.owner, 'tall')}</div></div></section>`;
  const amb = `<section class="sec" id="ambiente"><div class="wrap">${head('Ambiente', I.ambient_title, '', true)}<div class="grid ${I.ambient.length === 3 ? 'g3' : 'g2'}">${I.ambient.map((a) => fig(p.slug, a)).join('')}</div></div></section>`;
  const kit = (I.splits || []).map((k) => `<section class="sec${k.flip ? ' soft' : ''}" id="${k.id}"><div class="wrap"><div class="split ${k.flip ? 'flip' : ''}"><div><span class="kick">${k.kicker}</span><h2 style="margin:14px 0 16px">${k.title}</h2><p class="sub">${k.lead}</p><ul>${k.bullets.map((x) => `<li>${ic('check')}<span>${esc(x)}</span></li>`).join('')}</ul></div>${k.ui === 'chat' ? chatMock() : fig(p.slug, k, 'tall')}</div>${k.flow ? `<div class="flow">${k.flow.map(([a, t]) => `<div><b>${esc(a).toUpperCase()}</b><span>${esc(t)}</span></div>`).join('')}</div>` : ''}</div></section>`).join('');
  return (own + kit + amb).replaceAll('@UP@', c.up);
}

function videoSection(p, c) {
  const V = VIDEOS[p.slug]; if (!V) return '';
  const has = (f) => fs.existsSync(path.join('assets/video', p.slug, f + '.mp4'));
  const base = `${c.up}assets/video/${p.slug}/`;
  const player = (f, label, cls = '') => has(f)
    ? `<figure class="vid ${cls}"><video controls preload="none" playsinline poster="${base}${f}.jpg" aria-label="${esc(label)}"><source src="${base}${f}.mp4" type="video/mp4"></video></figure>`
    : `<figure class="vid empty ${cls}"><figcaption><b>Vídeo em preparação</b><span>${esc(label)}</span></figcaption></figure>`;
  return `<section class="sec dark" id="demo"><div class="wrap">${head(V.kicker, V.title, V.lead, true)}<div style="margin-top:44px">${player(V.main.file, V.main.label, 'main')}</div>${V.clips.length ? `<div class="grid ${V.clips.length % 3 === 0 ? 'g3' : 'g4'}" style="margin-top:24px">${V.clips.map((k) => `<div class="clip">${player(k.file, k.title)}<h3>${esc(k.title)}</h3><p>${esc(k.text)}</p></div>`).join('')}</div>` : ''}</div></section>`;
}

function productPage(p) {
  const route = 'produtos/' + p.slug;
  const k = ctas(p);
  page(route, {
    title: `${p.name} — ${SITE.name}`, desc: p.short, active: 'produtos', prod: p.slug,
    body: (c) => {
      const subnav = p.sections.length ? `<div class="sn"><div class="wrap"><b>${p.name}</b><ul>${p.sections.map((s) => `<li><a href="#${s.id}">${esc(SHORT[s.id] || s.kicker)}</a></li>`).join('')}</ul>${k.primary ? `<a class="btn sm p" href="${k.url}">${k.label.length > 24 ? 'Testar grátis' : k.label}</a>` : ''}</div></div>` : '';
      const hero = `<section class="phero"><div class="wrap"><a class="crumb" href="${c.href('produtos')}">← Todos os produtos</a><div class="${p.window ? 'pg' : ''}"><div><span class="eb"><i></i>${esc(p.eyebrow)}</span> ${pill(p)}<h1>${p.minimal ? esc(p.name) : esc(p.title)}</h1><p class="lead">${esc(p.lead)}</p>${k.primary ? `<div class="b">${k.primary}${k.secondary}</div>` : ''}<p class="note">${esc(p.trial.note)}</p></div>${p.window ? `<div class="vis">${windowOf(p)}${floatOf(p)}</div>` : ''}</div></div></section>`;
      const parts = p.sections.map((s) => section(s, p, c));
      const flowAt = p.sections.findIndex((x) => x.kind === 'flow');
      const at = flowAt >= 0 ? flowAt + 1 : 1;
      parts.splice(at, 0, (VIDEOS[p.slug] ? videoSection(p, c) : '') + (IMAGES[p.slug] ? photoSections(p, c) : ''));
      
      const body = parts.join('');
      const final = (p.minimal || p.noCta) ? '' : `<section class="sec"><div class="wrap"><div class="cta"><div><h2>${esc(p.name)}</h2><p>${esc(p.short)}</p></div><div class="b"><a class="btn w l" href="${k.url}">${esc(k.label)}</a><a class="btn gh l" href="mailto:${SITE.email}">Falar por e-mail</a></div></div></div></section>`;
      return subnav + hero + body + final;
    },
  });
}

// ---------- páginas ----------
const MISSION = 'Criar tecnologias inteligentes, acessíveis, seguras e úteis, que gerem valor prático. Tecnologia não é feita só pela tecnologia.';
const VISION = 'Um ecossistema tecnológico em que a IA é uma camada natural da operação empresarial.';
const VALUES = [['Utilidade real', 'Tecnologia que resolve problemas de verdade.'], ['Inovação com propósito', 'Inovar para gerar valor, não para enfeitar.'], ['Evolução contínua', 'Produtos que melhoram a cada etapa.'], ['Qualidade', 'Testado, auditado, validado.'], ['Segurança e governança', 'Controle, acesso e rastreabilidade desde a arquitetura.'], ['Simplicidade', 'Complexidade tratada por dentro, clareza por fora.'], ['Transparência', 'Não prometer o que não existe.'], ['Responsabilidade', 'A IA apoia pessoas, não elimina responsabilidade.'], ['Foco no cliente', 'O negócio do cliente no centro da decisão.'], ['Visão de longo prazo', 'Construir hoje o que sustenta o amanhã.']];

const ICON = { kordena: 'store', 'iron-fit': 'flame', nfcore: 'file', command: 'chart', atendevendeia: 'chat', campaia: 'mega', 'erp-core': 'layers', 'super-core-extreme': 'cog' };
function productCard(p, c, big) {
  return `<a class="card pcard${big ? ' big' : ''}" style="${pcs(p.slug)}" href="${c.href('produtos/' + p.slug)}">${pill(p)}<div class="ic">${ic(ICON[p.slug])}</div><h3>${p.name}</h3><p>${esc(p.short)}</p><span class="go">${p.group === 'rnd' ? 'Explorar pesquisa' : 'Conhecer produto'} →</span></a>`;
}
page('', { title: `${SITE.name} — ${SITE.signature}`, desc: 'Tecnologia que conecta operação, dados e inteligência. Produtos inteligentes para transformar processos, acelerar decisões e preparar operações para crescer.', active: '', body: (c) => `
<section class="hero"><div class="wrap"><div class="hgrid"><div class="t"><span class="eb"><i></i>${SITE.name} · IA · Automação · Software</span>
<h1>Tecnologia que conecta <span class="grad">operação, dados e inteligência.</span></h1>
<p class="lead">Desenvolvemos produtos inteligentes para transformar processos, acelerar decisões e preparar operações para crescer. A IA recomenda; você decide.</p>
<div class="b"><a class="btn p l" href="${c.href('produtos')}">Conhecer produtos</a><a class="btn l" href="${c.href('contato')}">Falar com a FM</a></div>
<div class="checks"><span>${ic('check')}A IA recomenda</span><span>${ic('check')}Você decide</span><span>${ic('check')}Governança e auditoria</span></div></div>
<div class="vis"><div class="win"><div class="wb"><b></b><b></b><b></b><span>Ecossistema FM Tecnologia</span></div><div class="wbody"><div class="side">${[...main, ...dev, ...rnd].map((p, i) => `<div>${p.name}</div>`).join('')}</div><div class="eco"><div class="core"><span>Core cognitivo transversal<br><small>Conecta · Entende · Recomenda · Você decide</small></span>${ic('bot')}</div>${['Atendimento', 'Vendas', 'Estoque', 'Produção', 'Financeiro', 'Clientes'].map((a) => `<div class="wc"><h5>${a}</h5><p>Conectado ao mesmo contexto.</p></div>`).join('')}</div></div></div>
<div class="float f1"><span class="ic">${ic('check')}</span><div><b>Você decide</b><small>A IA recomenda, a equipe aprova</small></div></div>
<div class="float f2"><small>Core cognitivo</small><b>Conecta → Entende → Recomenda</b></div></div></div></div></section>
<div class="wrap"><div class="band"><em>Produtos do ecossistema</em>${PRODUCTS.map((p) => `<a href="${c.href('produtos/' + p.slug)}" style="${pcs(p.slug)}"><b></b>${p.name}</a>`).join('')}</div></div>
<section class="sec"><div class="wrap">${head('Como pensamos', 'Não somos só chatbots com IA.', 'Nossos produtos são construídos sobre um núcleo cognitivo compartilhado, que conecta dados, regras, integrações e decisões em toda a operação. Sem exagero e sem prometer o que não existe.', true)}<div class="grid g3">${[['bot', 'IA como camada', 'A IA gera valor quando está integrada corretamente ao negócio, junto de software, dados, regras, integrações, segurança e governança.'], ['shield', 'Controle humano', 'A IA recomenda; a decisão é de quem gere o negócio.'], ['check', 'Qualidade verificável', 'Testado, auditado, validado — sem apresentar certificações externas não comprovadas.']].map(([i, t, d]) => `<div class="card"><div class="ic">${ic(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
<section class="sec soft"><div class="wrap">${head('Produtos principais', 'Soluções inteligentes para cada frente da operação.', 'Produtos especializados que conectam gestão, desempenho e fiscal dentro do ecossistema FM.', true)}<div class="bento">${main.map((p, i) => productCard(p, c, i < 2)).join('')}</div></div></section>
<section class="sec"><div class="wrap">${head('Core cognitivo transversal', 'Uma inteligência compartilhada por todos os produtos.', 'Mais que chatbots: uma camada que conecta dados, entende o contexto e apoia a decisão — sem tirar das pessoas a responsabilidade.', true)}<div class="flow">${[['01', 'Conecta'], ['02', 'Entende'], ['03', 'Recomenda'], ['04', 'Você decide']].map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div></div></section>
<section class="numband"><div class="wrap"><div class="nb"><div><b>${main.length}</b><span>produtos principais</span></div><div><b>${dev.length + rnd.length}</b><span>em desenvolvimento ou pesquisa</span></div><div><b>1</b><span>Core cognitivo compartilhado</span></div></div></div></section>
<section class="sec"><div class="wrap">${head('O que estamos construindo', 'Produtos em desenvolvimento.', 'Clareza entre soluções principais, iniciativas em desenvolvimento e pesquisa.', true)}<div class="grid g3">${[...dev, ...rnd].map((p) => productCard(p, c)).join('')}</div></div></section>
<section class="sec soft"><div class="wrap">${head('Por que existimos', 'Tecnologia com utilidade real.', MISSION, true)}<div class="chips">${['Utilidade real', 'Qualidade: testado, auditado, validado', 'Segurança e governança', 'Transparência', 'Responsabilidade'].map((v) => `<span>${v}</span>`).join('')}</div><div class="center" style="margin-top:36px"><a class="btn" href="${c.href('empresa')}">Conhecer a FM Tecnologia</a></div></div></section>
<section class="sec"><div class="wrap"><div class="cta"><div><h2>Vamos conversar sobre a sua operação?</h2><p>Fale com a nossa equipe por WhatsApp ou e-mail.</p></div><div class="b"><a class="btn w l" href="${wa('Olá! Quero conversar sobre os produtos da FM Tecnologia.')}">WhatsApp</a><a class="btn gh l" href="${c.href('contato')}">Contato</a></div></div></div></section>` });

page('produtos', { title: `Produtos — ${SITE.name}`, desc: 'Conheça o portfólio e o estágio de cada iniciativa da FM Tecnologia.', active: 'produtos', body: (c) => `
<section class="phero"><div class="wrap"><span class="kick">Ecossistema FM</span><h1>Produtos com uma visão em comum.</h1><p class="lead" style="max-width:700px">Conheça o portfólio e o estágio de cada iniciativa da FM Tecnologia.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="wrap">${head('Produtos principais', '', '')}<div class="grid g2" style="margin-top:20px">${main.map((p) => productCard(p, c)).join('')}</div></div></section>
<section class="sec soft"><div class="wrap">${head('Em desenvolvimento', 'O que vem por aí.', '')}<div class="grid g3">${[...dev, ...rnd].map((p) => productCard(p, c)).join('')}</div></div></section>` });

PRODUCTS.forEach(productPage);

page('solucoes', { title: `Soluções — ${SITE.name}`, desc: 'Tecnologia conectada ao movimento do negócio.', active: 'solucoes', body: (c) => `
<section class="phero"><div class="wrap"><span class="kick">Soluções</span><h1>Tecnologia conectada ao movimento do negócio.</h1><p class="lead" style="max-width:700px">Estruturamos produtos para apoiar organização, inteligência e evolução operacional.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="wrap"><div class="grid g3" style="margin-top:0">${[['layers', 'Organizar', 'Bases digitais que ajudam a dar clareza às operações.'], ['flow', 'Evoluir', 'Produtos preparados para acompanhar novos contextos.'], ['plug', 'Conectar', 'Um ecossistema com visão tecnológica compartilhada.']].map(([i, t, d], n) => `<div class="card"><div class="ic">${ic(i)}</div><h3>0${n + 1} · ${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
<section class="sec soft"><div class="wrap">${head('Por tipo de negócio', 'Qual solução combina com a sua operação?', '', true)}<div class="grid g2">${[['kordena', 'Restaurantes, hamburguerias, pizzarias, padarias e outros negócios do setor alimentício'], ['iron-fit', 'Academias e operações fitness'], ['nfcore', 'Gestão fiscal com governança'], ['command', 'Gestão executiva de produtos e operações'], ['atendevendeia', 'Quem vende pelo WhatsApp']].map(([s, t]) => { const p = bySlug(s); return `<a class="card pcard" href="${c.href('produtos/' + s)}">${pill(p)}<h3 style="margin-top:0;padding-right:150px">${esc(t)}</h3><p>${p.name}: ${esc(p.short)}</p><span class="go">Conhecer ${p.name} →</span></a>`; }).join('')}</div></div></section>` });

page('precos', { title: `Preços — ${SITE.name}`, desc: 'Planos e condições comerciais.', active: 'precos', body: (c) => `
<section class="phero"><div class="wrap"><span class="kick">Preços transparentes</span><h1>Planos e condições comerciais.</h1><p class="lead" style="max-width:700px">Conheça os valores de Kordena e Iron Fit Core e consulte as condições disponíveis para cada produto.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="wrap"><div class="grid g2" style="margin-top:0">${['kordena', 'iron-fit'].map((s) => { const p = bySlug(s); const k = ctas(p); return `<div class="card"><span class="pill">Produto principal</span><h3 style="font-size:28px;margin:16px 0 4px">${p.name}</h3><div style="font-size:40px;font-weight:800;letter-spacing:-.03em">${p.pricing.monthly}</div><p style="color:var(--t3);margin-bottom:14px">ou ${p.pricing.yearly}</p><p style="color:var(--t2);font-size:15px">${esc(p.pricing.note)}</p><p style="color:var(--t2);font-size:15px;margin:8px 0 22px"><b>Enterprise:</b> ${p.pricing.enterprise}</p><div style="display:flex;gap:10px;flex-wrap:wrap">${k.primary.replace('btn p l', 'btn p')}<a class="btn" href="${c.href('produtos/' + s)}">Ver produto</a></div></div>`; }).join('')}</div><p class="note center" style="margin-top:28px;color:var(--t3);font-size:14px">A ativação do teste depende da liberação comercial de cada produto.</p></div></section>` });

page('recursos', { title: `Recursos — ${SITE.name}`, desc: 'Conhecimento para decisões melhores.', active: 'recursos', body: () => `
<section class="phero"><div class="wrap"><span class="kick">Recursos</span><h1>Conhecimento para decisões melhores.</h1><p class="lead" style="max-width:700px">Esta é a fundação da central de recursos da FM Tecnologia.</p><div class="notice" style="max-width:700px">Em construção — conteúdos serão publicados com validação, à medida que forem aprovados.</div></div></section>` });

page('empresa', { title: `Empresa — ${SITE.name}`, desc: SITE.signature, active: 'empresa', body: (c) => `
<section class="phero"><div class="wrap"><span class="kick">Empresa</span><h1>${SITE.signature}</h1><p class="lead" style="max-width:760px">Tecnologia inteligente para transformar operações, decisões e resultados. Um portfólio, uma visão tecnológica.</p></div></section>
<section class="sec" id="quem-somos"><div class="wrap"><div class="split"><div><span class="kick">Quem somos</span><h2 style="margin:14px 0 16px">Tecnologia e inteligência artificial a serviço de quem faz o negócio acontecer.</h2><p class="sub">A FM Tecnologia desenvolve software e soluções de inteligência artificial para melhorar a operação, as decisões e o crescimento das empresas. Partimos de uma ideia simples: tecnologia só vale a pena quando resolve um problema real do dia a dia.</p><p class="sub" style="margin-top:14px">Por isso construímos produtos para frentes concretas do negócio, como a gestão de restaurantes, a de academias, a área fiscal e a visão executiva da empresa. Todos compartilham a mesma base tecnológica e a mesma forma de pensar: informação organizada, controle nas mãos de quem decide e IA como apoio, não como substituta.</p></div><div class="panel"><h4>Em uma frase</h4><div class="steps"><div><i>1</i>Software que organiza a operação</div><div><i>2</i>Inteligência artificial que apoia a decisão</div><div><i>3</i>Automação que poupa tempo e reduz erros</div><div><i>4</i>Governança que mantém o controle com as pessoas</div></div></div></div></div></section>
<section class="sec soft" id="o-que-buscamos"><div class="wrap">${head('O que buscamos', 'Tecnologia que vira resultado prático.', 'Nosso objetivo é que a tecnologia seja uma aliada do dia a dia das empresas: simples de usar, segura e com utilidade real.', true)}<div class="grid g4">${[['layers', 'Operação organizada', 'Menos controle espalhado e menos retrabalho, com a informação reunida em um só lugar.'], ['eye', 'Decisões com informação', 'Dados com contexto e origem, para decidir com mais segurança e menos achismo.'], ['chart', 'Crescimento com controle', 'Ferramentas que acompanham o negócio à medida que ele cresce, sem perder a governança.'], ['users', 'Tecnologia acessível', 'Soluções claras de usar, pensadas também para quem não é da área de tecnologia.']].map(([i, t, d]) => `<div class="card"><div class="ic">${ic(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
<section class="sec dark" id="como-pensamos"><div class="wrap">${head('Como pensamos', 'Não somos só chatbots com IA.', 'Nossos produtos são construídos sobre um núcleo cognitivo compartilhado, que conecta dados, regras, integrações e decisões em toda a operação. Sem exagero e sem prometer o que não existe.', true)}<div class="flow"><div><b>01</b><span>Conecta</span></div><div><b>02</b><span>Entende</span></div><div><b>03</b><span>Recomenda</span></div><div><b>04</b><span>Você decide</span></div></div><p class="sub center" style="margin:28px auto 0;max-width:720px;text-align:center">A IA recomenda; a decisão é de quem gere o negócio. Por isso segurança, governança e rastreabilidade fazem parte do desenho de cada produto desde o começo.</p></div></section>
<section class="sec" id="ecossistema"><div class="wrap">${head('Nosso ecossistema', 'Cada produto, uma frente do negócio. Uma só base tecnológica.', 'Conheça os produtos principais da FM Tecnologia e o estágio de cada um.', true)}<div class="grid g3">${main.map((p) => productCard(p, c)).join('')}</div></div></section>
<section class="sec soft" style="padding-top:20px"><div class="wrap"><div class="grid g2" style="margin-top:0"><div class="card"><div class="ic">${ic('flow')}</div><h3>Missão</h3><p>${MISSION}</p></div><div class="card"><div class="ic">${ic('eye')}</div><h3>Visão</h3><p>${VISION}</p></div></div></div></section>
<section class="sec soft"><div class="wrap">${head('Valores', 'O que guia cada decisão.', '', true)}<div class="val">${VALUES.map(([t, d], i) => `<div><b>${String(i + 1).padStart(2, '0')}</b><span>${t}</span><p style="font-size:13.5px;color:var(--t2);margin-top:6px">${d}</p></div>`).join('')}</div></div></section>
<section class="sec">${'<div class="wrap">'}${head('Nossa direção', 'Um portfólio. Uma visão tecnológica.', 'Desenvolvemos produtos e tecnologias com arquitetura preparada para crescer, mantendo clareza entre soluções principais, iniciativas em desenvolvimento e pesquisa.', true)}<div class="grid g3">${[['bot', 'IA como camada', 'A IA gera valor quando está integrada corretamente ao negócio, junto de software, dados, regras, integrações, segurança e governança.'], ['shield', 'Controle humano', 'A IA recomenda; a decisão é de quem gere o negócio.'], ['check', 'Qualidade verificável', 'Testado, auditado, validado — sem apresentar certificações externas não comprovadas.']].map(([i, t, d]) => `<div class="card"><div class="ic">${ic(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>` });

page('contato', { title: `Contato — ${SITE.name}`, desc: 'Vamos conversar.', active: '', body: () => `
<section class="phero"><div class="wrap"><span class="kick">Contato</span><h1>Vamos conversar.</h1><p class="lead" style="max-width:700px">Entre em contato por e-mail ou WhatsApp para conversar sobre os produtos da FM Tecnologia.</p><div class="b" style="display:flex;gap:12px;margin-top:30px;flex-wrap:wrap"><a class="btn p l" href="${wa('Olá! Quero conversar sobre os produtos da FM Tecnologia.')}">Conversar pelo WhatsApp</a><a class="btn l" href="mailto:${SITE.email}">Escrever e-mail</a></div><p class="note" style="margin-top:18px;color:var(--t3)">Contato comercial: ${SITE.email} · WhatsApp ${SITE.whatsappLabel}. O botão de e-mail abre o seu aplicativo; a mensagem só é enviada quando você confirmar.</p></div></section>` });

page('entrar', { title: `Entrar — ${SITE.name}`, desc: 'Acesse o seu produto.', active: '', body: (c) => `
<section class="phero"><div class="wrap"><span class="kick">Entrar</span><h1>Acesse o seu produto.</h1><p class="lead" style="max-width:700px">Cada produto tem o seu próprio ambiente de acesso. Escolha abaixo.</p><div class="grid g2">${main.map((p) => { const url = p.external?.url || p.signupUrl; return `<div class="card"><h3 style="margin-top:0">${p.name}</h3><p>${url ? 'Acesse o ambiente do produto.' : 'Ambiente de acesso em preparação.'}</p><div style="margin-top:18px">${url ? `<a class="btn p" href="${url}">Entrar no ${p.name}</a>` : `<a class="btn" href="${wa(p.trialMsg)}">Quero ser avisado</a>`}</div></div>`; }).join('')}</div></div></section>` });

fs.mkdirSync('assets/img', { recursive: true });
fs.cpSync('assets', path.join(OUT, 'assets'), { recursive: true });
console.log('ok', OUT);
