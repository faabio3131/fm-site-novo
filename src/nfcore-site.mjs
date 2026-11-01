// Site próprio do NFCore. Reaproveita o CSS, os ícones, a marca FM e o conteúdo já aprovado do produto (products.mjs) e da
// reforma tributária (reforma.mjs). Saída: sites/nfcore (ou OUT). Sem cliente, número ou certificação inventados.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { SITE, wa } from './config.mjs';
import { PRODUCTS } from './products.mjs';
import { ic } from './icons.mjs';
import { REFORMA_UPDATED, ESSENCIAL, CALENDARIO, NOTA_PEDE, PASSOS, FAQ, FONTES } from './reforma.mjs';

const OUT = process.env.OUT ?? 'sites/nfcore';
const EXT = process.env.LINKEXT ?? '.html';
const FMSITE = 'https://fmtecnologiaia.com.br';
const P = PRODUCTS.find((x) => x.slug === 'nfcore');
const sec = (id) => P.sections.find((s) => s.id === id);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const CSSV = crypto.createHash('md5').update(fs.readFileSync('assets/site.css')).digest('hex').slice(0, 8);
const href = (r) => (r === '' ? (EXT ? 'index.html' : './') : r + EXT);
const login = P.external.url;
const msg = (t) => wa(t);

const head = (k, t, l, center = true) => `<div class="sh ${center ? 'center' : ''}"><span class="kick">${k}</span><h2>${t}</h2>${l ? `<p class="sub">${l}</p>` : ''}</div>`;
const S = (id, inner, cls = '') => `<section class="sec ${cls}" id="${id}"><div class="wrap">${inner}</div></section>`;
const cards = (items) => `<div class="grid ${items.length % 3 === 0 ? 'g3' : 'g4'}">${items.map(([i, t, d]) => `<div class="card"><div class="ic">${ic(i)}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>`;
const flow = (items) => `<div class="flow">${items.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div>`;
const cal = () => `<div class="spot-cal" role="group" aria-label="Datas da reforma nos documentos fiscais"><h3>Quando cada nota passa a exigir IBS e CBS</h3><ol>${CALENDARIO.map(([d, t, r]) => `<li><b>${esc(d)}</b><span>${esc(r || t)}</span></li>`).join('')}</ol><small>Fonte: atos oficiais citados no guia. Atualizado em ${REFORMA_UPDATED}.</small></div>`;

function nav(active) {
  const items = [['core-cognitivo', 'Core Cognitivo'], ['reforma-tributaria', 'Reforma tributária'], ['index#documentos', 'Documentos'], ['index#seguranca', 'Segurança'], ['contato', 'Contato']];
  return `<header class="nav"><div class="wrap"><a class="brand" href="${href('')}"><span class="wm"><img src="assets/brand/fm/logo-fm.webp" width="626" height="114" alt="FM Tecnologia IA"><small>NFCore · Infraestrutura fiscal</small></span></a>
<nav class="menu" id="menu" aria-label="Principal">${items.map(([r, t]) => `<a href="${r.includes('#') ? r.replace('index', href('')) : href(r)}" class="${active === r ? 'on' : ''}">${t}</a>`).join('')}</nav>
<div class="nr"><a class="btn sm" href="${esc(login)}">Entrar</a><a class="btn sm k" href="${href('contato')}">Quero ser avisado</a><button class="burger" id="burger" aria-label="Menu">☰</button></div></div></header>`;
}
const footer = () => `<footer class="foot"><div class="wrap"><div class="g">
<div><a class="brand" href="${href('')}"><span class="wm"><img src="assets/brand/fm/logo-fm.webp" width="626" height="114" alt="FM Tecnologia IA"><small>${SITE.signature}</small></span></a><p>NFCore é um produto da ${SITE.name}.</p></div>
<div><h6>NFCore</h6><ul><li><a href="${href('core-cognitivo')}">Core Cognitivo</a></li><li><a href="${href('reforma-tributaria')}">Reforma tributária</a></li><li><a href="${href('')}#documentos">Documentos fiscais</a></li><li><a href="${esc(login)}">Entrar no NFCore Web</a></li></ul></div>
<div><h6>FM Tecnologia IA</h6><ul><li><a href="${FMSITE}">Site da FM</a></li><li><a href="${FMSITE}/produtos/nfcore">NFCore no site da FM</a></li><li><a href="${FMSITE}/reforma-tributaria/materiais">Materiais para baixar</a></li><li><a href="${href('contato')}">Contato</a></li></ul></div>
<div><h6>Legal</h6><ul><li><a href="${FMSITE}/seguranca">Segurança e privacidade</a></li><li><a href="${FMSITE}/privacidade">Política de privacidade</a></li><li><a href="${FMSITE}/termos">Termos de uso</a></li></ul></div>
</div><div class="fb"><span>© ${new Date().getFullYear()} ${SITE.legalName}. Todos os direitos reservados. CNPJ ${SITE.cnpj}</span><span>${SITE.email}</span></div></div></footer>`;

function page(route, { title, desc, active, body }) {
  const html = `<!doctype html><html lang="pt-BR" data-p="nfcore"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/png" href="assets/brand/fm/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/site.css?v=${CSSV}"></head><body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>${nav(active)}<main id="conteudo">${body}</main>${footer()}<a class="fab" href="${msg('Olá! Vim pelo site do NFCore e quero tirar uma dúvida.')}" target="_blank" rel="noopener" aria-label="Falar com a FM pelo WhatsApp">${ic('chat')}</a><script src="assets/site.js" defer></script></body></html>`;
  const file = path.join(OUT, route === '' ? 'index.html' : route + '.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html.replace(/(<\/(?:div|p|li|ul|ol|h[1-6]|section|header|footer|nav|main|figure|details|summary)>)(?=<)/g, '$1\n'));
}

const hero = ({ kick, title, lead, ctas, note, img, alt }) => `<section class="phero"><div class="wrap"><div class="pg"><div><span class="eb"><i></i>${esc(kick)}</span><h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p><div class="b">${ctas}</div>${note ? `<p class="note">${esc(note)}</p>` : ''}</div>${img ? `<div class="vis"><figure class="dg"><img src="assets/img/nfcore/${img}" alt="${esc(alt)}"></figure></div>` : ''}</div></div></section>`;
const cta = `<a class="btn p l" href="${href('contato')}">Quero ser avisado do lançamento</a><a class="btn l" href="${esc(login)}">Já tem conta? Acessar NFCore Web →</a>`;

// Funções da reforma tributária, separadas por estado. "Construído" = existe no código do NFCore (módulo de conformidade RTC,
// motor fiscal e Portal). "Em construção" = ainda não entregue; nada daqui afirma homologação nem produção fiscal.
const REFORMA_CONSTRUIDO = [
  ['store', 'Enquadramento fiscal da unidade', 'Cadastro do regime da unidade emitente (Simples Nacional, Lucro Presumido ou Lucro Real) no Portal, gravado como registro imutável e auditado.'],
  ['eye', 'Estado de adequação e bloqueios', 'O Portal mostra a situação de adequação à reforma e o motivo de cada bloqueio, lidos da fonte fiscal, sem número inventado.'],
  ['layers', 'Regras com data de vigência', 'Obrigação legal e rejeição técnica tratadas separadamente, por regime, por estado e por município, cada uma a partir da sua data.'],
  ['check', 'Classificação CST e cClassTrib', 'A classificação de IBS e CBS é conferida contra o catálogo oficial registrado com assinatura de integridade (SHA-256). Sem classificação válida, o NFCore bloqueia em vez de presumir.'],
  ['file', 'IBS, CBS e IS em separado', 'Os três tributos ficam como componentes distintos no registro fiscal, cada um com a sua classificação e a versão da norma usada.'],
  ['bot', 'Monitor regulatório', 'Registra as mudanças normativas, organiza as evidências e encaminha propostas de atualização para revisão e aprovação humana.'],
];
const REFORMA_CONSTRUCAO = [
  ['chart', 'Cálculo de IBS, CBS e IS', 'Cálculo por item com as fórmulas e o arredondamento oficiais, créditos e reduções. Só entra com a norma verificada.'],
  ['file', 'Campos novos na NF-e e na NFC-e', 'IBS, CBS e IS por item nos arquivos das notas, conforme o leiaute vigente da Receita, com validação do arquivo.'],
  ['layers', 'NFS-e nacional e municipal', 'Campos de IBS e CBS na nota de serviço, respeitando o leiaute nacional e o de cada município atendido.'],
  ['flow', 'Notas de débito e de crédito e novos eventos', 'Ajustes de IBS e CBS depois da emissão e os novos eventos da nota.'],
  ['calendar', 'Transição 2026 a 2033', 'Convivência de ICMS, ISS, PIS e Cofins com IBS e CBS, ano a ano, preservando o histórico de cada nota.'],
  ['shield', 'Homologação com os autorizadores', 'Testes oficiais com a Receita e as prefeituras. Depende de ambiente e credenciais reais e só será declarada com evidência.'],
];
const funcs = (items, pill, cls) => `<div class="grid g3">${items.map(([i, t, d]) => `<div class="card"><span class="pill ${cls}" style="margin-bottom:12px">${pill}</span><div class="ic">${ic(i)}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>`;
const reformaFuncoes = () => `<h3 class="center" style="margin:40px 0 18px">Já construído no NFCore</h3>${funcs(REFORMA_CONSTRUIDO, 'Construído', 'ok')}<h3 class="center" style="margin:40px 0 18px">Em construção</h3>${funcs(REFORMA_CONSTRUCAO, 'Em construção', '')}<div class="notice" style="margin-top:28px">As funções "em construção" ainda não estão disponíveis e não significam homologação nem produção fiscal. O estado de cada uma só muda quando houver evidência.</div>`;

// Home
page('', {
  title: 'NFCore — Infraestrutura fiscal com Core Cognitivo e preparada para a reforma tributária',
  desc: 'NFCore reúne regras, emissão de NFC-e, NF-e e NFS-e, reconciliação e auditoria, com Core Cognitivo que acompanha a evolução fiscal e a reforma tributária, sempre com revisão humana.',
  active: '',
  body: hero({ kick: 'NFCore · Reforma tributária', title: 'Preparado para a reforma tributária.', lead: 'IBS e CBS chegam às notas fiscais em etapas, de 2026 a 2033. O NFCore já traz o enquadramento fiscal, as regras com data de vigência e a classificação conferida contra o catálogo oficial, e segue construindo o cálculo e as notas. A IA recomenda; a decisão fiscal fica com serviços determinísticos e com a sua equipe.', ctas: `<a class="btn p l" href="${href('reforma-tributaria')}">Ver o guia da reforma →</a><a class="btn l" href="${href('contato')}">Quero ser avisado do lançamento</a>`, note: P.trial.note, img: 'chip.webp', alt: 'Chip com brilho roxo no centro de uma placa de circuitos, representando a infraestrutura fiscal do NFCore' })
    + S('reforma-funcoes', head('Reforma tributária', 'As funções do NFCore para a reforma.', 'O que já está construído e o que ainda está em construção, sem promessa além do que existe.') + reformaFuncoes() + `<div class="spot" style="margin-top:40px">${cal()}</div>`, 'soft')
    + S('destaques', head('Em destaque', 'Duas frentes que o NFCore leva a sério.', 'A inteligência que acompanha a evolução fiscal e a preparação para a reforma tributária.') + `<div class="grid g2"><a class="card pcard" href="${href('core-cognitivo')}"><span class="pill ok">Core Cognitivo</span><div class="ic">${ic('bot')}</div><h3>A IA recomenda, a equipe aprova.</h3><p>Monitor regulatório que registra as mudanças normativas, organiza as evidências e encaminha propostas de atualização para revisão e aprovação humana.</p><span class="go">Conhecer o Core Cognitivo →</span></a><a class="card pcard" href="${href('reforma-tributaria')}"><span class="pill ok">Reforma tributária</span><div class="ic">${ic('calendar')}</div><h3>Preparado para IBS e CBS.</h3><p>Calendário oficial por tipo de nota, regras com data de vigência e o guia para a sua empresa se preparar. Atualizado em ${REFORMA_UPDATED}.</p><span class="go">Ver o guia da reforma →</span></a></div>`, 'soft')
    + S('autoridade', head('Fluxo de autoridade', sec('autoridade').title, sec('autoridade').lead) + flow(sec('autoridade').items))
    + S('documentos', head('Documentos fiscais', sec('documentos').title, sec('documentos').lead) + cards(sec('documentos').items), 'soft')
    + S('vantagens', head('Vantagens', sec('vantagens').title, sec('vantagens').lead) + cards(sec('vantagens').items))
    + S('capacidades', head('Capacidades', sec('capacidades').title, sec('capacidades').lead) + cards(sec('capacidades').items), 'soft')
    + S('plataforma', head('Plataforma', sec('plataforma').title, sec('plataforma').lead) + cards(sec('plataforma').items))
    + S('seguranca', head('Segurança e governança', sec('seguranca').title, '') + cards(sec('seguranca').items), 'dark')
    + S('disponibilidade', head('Disponibilidade', sec('disponibilidade').title, '') + `<div class="notice">${esc(sec('disponibilidade').text)}</div><p class="center" style="margin-top:28px"><a class="btn p l" href="${href('contato')}">Quero ser avisado do lançamento</a></p>`),
});

// Core Cognitivo
page('core-cognitivo', {
  title: 'Core Cognitivo do NFCore — a IA recomenda, a equipe aprova',
  desc: 'O Core Cognitivo apoia o NFCore no acompanhamento das mudanças fiscais e da reforma tributária, reduz erro humano e deixa a decisão crítica com serviços determinísticos e com a sua equipe.',
  active: 'core-cognitivo',
  body: hero({ kick: 'Core Cognitivo transversal', title: 'A inteligência que acompanha a evolução fiscal.', lead: 'O core cognitivo da FM apoia o NFCore no acompanhamento das mudanças normativas e reduz o erro humano. A IA recomenda; validar, assinar e executar o que é crítico fica com serviços determinísticos e com a sua equipe.', ctas: cta, img: 'foto.webp', alt: 'Profissional revisando documentos fiscais eletrônicos em um ambiente de trabalho moderno' })
    + S('o-que-faz', head('O que ele faz', 'Acompanha, organiza e propõe. Nunca decide sozinho.', 'O que o código do NFCore comprova, em poucas palavras.') + cards([
      ['eye', 'Monitor regulatório', 'O Regulatory Watcher registra as mudanças normativas, como as da reforma tributária, e organiza as evidências de cada mudança.'],
      ['file', 'Propostas de atualização', 'As mudanças viram propostas de atualização de regra, encaminhadas para revisão e aprovação. Nada muda sozinho.'],
      ['check', 'Revisão e aprovação humana', 'Uma pessoa revisa e aprova antes de a regra valer. A IA recomenda, a equipe aprova.'],
      ['layers', 'Regras versionadas', 'Cada regra tem data de vigência e versão, e cada norma usada fica registrada com a origem.'],
      ['chart', 'Evidência e rastreabilidade', 'Cada decisão deixa rastro: qual regra foi aplicada, quando e com qual resultado.'],
      ['bot', 'Menos erro humano', 'O Core organiza e recomenda para reduzir falhas de acompanhamento e de digitação na rotina fiscal.'],
    ]), 'soft')
    + S('autoridade', head('Autoridade separada', sec('autoridade').title, sec('autoridade').lead) + flow(sec('autoridade').items))
    + S('limites', head('Limites claros', 'O que a IA não faz no NFCore.', '') + cards([['lock', 'Não substitui a validação', 'Recomendação de IA não substitui validação, política, assinatura, autorização, homologação ou execução fiscal.'], ['shield', 'Não decide o que é crítico', 'Serviços determinísticos validam e executam as operações críticas, com isolamento por empresa e por unidade.'], ['users', 'Não substitui o contador', 'A decisão fiscal continua com as pessoas. O conteúdo do site é informativo e não substitui a orientação do seu contador.']]), 'dark')
    + S('cta', `<p class="center"><a class="btn p l" href="${href('reforma-tributaria')}">Ver o guia da reforma →</a></p>`),
});

// Reforma tributária
const passos = PASSOS.map((x) => (x[0] === '5' ? ['5', 'Optante do Simples? Confirme a opção', 'A opção pelo regime regular de IBS e CBS tem prazo. Confirme a data e a decisão com o seu contador.'] : x));
page('reforma-tributaria', {
  title: 'Reforma tributária e o NFCore: o que muda nas notas fiscais (IBS e CBS)',
  desc: 'Calendário oficial de CBS e IBS nas notas fiscais, o que a nota passa a pedir, como se preparar e como o NFCore acompanha a reforma. Atualizado em ' + REFORMA_UPDATED + '.',
  active: 'reforma-tributaria',
  body: hero({ kick: 'Reforma tributária · IBS e CBS', title: 'Estrutura pronta para acompanhar a reforma.', lead: 'A reforma muda as notas fiscais em etapas, e as normas ainda estão sendo ajustadas. O NFCore foi desenhado para absorver essa mudança com regra versionada, evidência e revisão humana.', ctas: `<a class="btn p l" href="#calendario">Ver o calendário</a><a class="btn l" href="${href('contato')}">Quero ser avisado do lançamento</a>`, note: `Conteúdo informativo, atualizado em ${REFORMA_UPDATED}. Não substitui a orientação do seu contador.` })
    + S('essencial', head('O essencial', 'A reforma em quatro etapas.', '') + cards(ESSENCIAL), 'soft')
    + S('calendario', head('Calendário', 'Quando cada nota passa a exigir IBS e CBS.', '') + `<div class="spot">${cal()}</div>`)
    + S('nota-pede', head('O que a nota passa a pedir', 'Novos campos, notas e eventos.', '') + cards(NOTA_PEDE), 'soft')
    + S('passos', head('Como se preparar', 'Seis passos para a sua empresa.', '') + `<div class="grid g3">${passos.map(([n, t, d]) => `<div class="card"><div class="ic"><b>${esc(n)}</b></div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>`)
    + S('nfcore', head('No NFCore', 'As funções do NFCore para a reforma.', 'O que já está construído e o que ainda está em construção.') + reformaFuncoes(), 'soft')
    + S('duvidas', head('Antes de começar', 'Perguntas frequentes', '') + `<div class="faq">${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`)
    + S('fontes', head('Fontes', 'De onde vem cada informação.', '') + `<ul class="srcs">${FONTES.map((f) => `<li>${Array.isArray(f) ? (f[1] ? `<a href="${esc(f[1])}" rel="noopener">${esc(f[0])}</a>` : esc(f[0])) : esc(f.titulo ?? f.title ?? JSON.stringify(f))}</li>`).join('')}</ul>`, 'soft'),
});

// Contato
page('contato', {
  title: 'Contato — NFCore',
  desc: 'Fale com a equipe da FM Tecnologia IA sobre o NFCore e seja avisado do lançamento.',
  active: 'contato',
  body: hero({ kick: 'Contato', title: 'Fale com a equipe do NFCore.', lead: 'Tire dúvidas, peça uma demonstração ou peça para ser avisado do lançamento. Respondemos pelo WhatsApp e por e-mail.', ctas: `<a class="btn p l" href="${msg(P.trialMsg)}" target="_blank" rel="noopener">Falar pelo WhatsApp</a><a class="btn l" href="mailto:${SITE.email}">${SITE.email}</a>`, note: P.trial.note })
    + S('acesso', head('Já é cliente?', 'Acesse o NFCore Web.', 'Cada empresa entra com as suas credenciais.') + `<p class="center"><a class="btn p l" href="${esc(login)}">Entrar no NFCore Web</a></p>`, 'soft'),
});

// Ativos
for (const [from, to] of [['assets/site.css', 'assets/site.css'], ['assets/site.js', 'assets/site.js'], ['assets/brand/fm', 'assets/brand/fm'], ['assets/img/nfcore', 'assets/img/nfcore']]) fs.cpSync(from, path.join(OUT, to), { recursive: true });
console.log('NFCore site em', OUT);
