// Gera o HTML dos materiais para baixar. O PDF sai de scripts/pdfs.py (Chromium, impressão).
// Uso: node src/materiais-pdf.mjs <pasta-de-saida>
// O texto vem de src/reforma.mjs, o mesmo do guia, para os materiais não destoarem do site.
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from './config.mjs';
import { REFORMA_UPDATED, CALENDARIO, PASSOS, PERGUNTAS_FORNECEDOR } from './reforma.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const logo = path.resolve('assets/brand/fm/logo-fm.png');

const base = (title, sub, body) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${esc(title)}</title><style>
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0}
body{font:13.5px/1.55 "Liberation Sans",Arial,Helvetica,sans-serif;color:#1b1e26}
.top{background:#000;color:#fff;padding:22px 40px;display:flex;align-items:center;justify-content:space-between}
.top img{height:30px}.top span{font-size:11px;color:#9aa2af;letter-spacing:.08em;text-transform:uppercase}
.pg{padding:26px 40px 70px;position:relative;height:calc(297mm - 74px);overflow:hidden}
.k{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:#6b7280;font-weight:700}
h1{font-size:25px;line-height:1.2;margin:8px 0 10px;letter-spacing:-.01em}
.sub{color:#4b5260;font-size:14px;max-width:640px}
h2{font-size:14px;margin:22px 0 8px}
.row{display:flex;gap:14px;border-top:1px solid #dfe2e8;padding:10px 0;break-inside:avoid}
.row:last-child{border-bottom:1px solid #dfe2e8}
.box{flex:none;width:17px;height:17px;border:1.6px solid #1b1e26;border-radius:4px;margin-top:2px}
.n{flex:none;width:22px;height:22px;border-radius:50%;background:#1b1e26;color:#fff;font-size:11.5px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px}
.row b{display:block;font-size:14px}.row p{color:#4b5260;margin-top:2px}
.note{margin-top:5px;border-bottom:1px dotted #aeb4c0;height:14px;color:#9aa2af;font-size:10.5px}
.d{flex:none;width:170px;font-weight:700}
.box2{border:1px solid #dfe2e8;border-radius:10px;padding:13px 16px;margin-top:20px;color:#4b5260;font-size:12.5px}
.ft{position:absolute;left:40px;right:40px;bottom:26px;font-size:10.5px;color:#6b7280;border-top:1px solid #dfe2e8;padding-top:10px;display:flex;justify-content:space-between;gap:20px}.ft span:last-child{white-space:nowrap}
</style></head><body>
<div class="top"><img src="file://${logo}" alt="FM Tecnologia IA"><span>${esc(SITE.domain)}/reforma-tributaria</span></div>
<div class="pg"><div class="k">${esc(sub)}</div><h1>${esc(title)}</h1>${body}
<div class="ft"><span>Conteúdo informativo, baseado nos atos oficiais e nas fontes do guia. Não substitui a orientação de um contador ou advogado. Atualizado em ${esc(REFORMA_UPDATED)}.</span><span>${esc(SITE.name)}</span></div></div></body></html>`;

const out = {
  'checklist-reforma-tributaria': base('Como se preparar para a reforma tributária nas notas fiscais', 'Checklist', `
<p class="sub">Seis passos para a sua empresa não ser pega de surpresa. Marque conforme avançar e anote quem ficou responsável.</p>
<div style="margin-top:18px">${PASSOS.map(([n, t, d]) => `<div class="row"><div class="box"></div><div style="flex:1"><b>${n}. ${esc(t)}</b><p>${esc(d)}</p><div class="note">Responsável / resposta:</div></div></div>`).join('')}</div>
<div class="box2"><b style="color:#1b1e26">Dica:</b> o guia completo, com o calendário oficial e as fontes, está em ${esc(SITE.domain)}/reforma-tributaria.</div>`),
  'calendario-documentos-fiscais-2026-2027': base('Calendário de IBS e CBS nos documentos fiscais', '2026 e 2027', `
<p class="sub">A regra segue o tipo de documento: uma mesma empresa pode ter datas diferentes para documentos diferentes. Fonte: Ato Conjunto RFB/CGIBS nº 4/2026.</p>
<h2>A partir de quando cada documento precisa trazer IBS e CBS</h2>
<div>${CALENDARIO.map(([d, t]) => `<div class="row"><div class="d">${esc(d)}</div><div style="flex:1">${esc(t)}</div></div>`).join('')}</div>
<h2>Simples Nacional: opção pelo regime regular de IBS e CBS</h2>
<div>${[['Até 30/10/2026', 'Opção pelo regime regular, no Portal de Serviços da Receita Federal. Vale de janeiro a junho de 2027.'], ['3/11 a 20/12/2026', 'Janela para cancelar a opção feita.'], ['1º/01/2027', 'Passa a valer a escolha. Todos os documentos do Simples exigem IBS e CBS.'], ['Março e setembro', 'Novas janelas de escolha, a cada ano a partir de 2027.']].map(([d, t]) => `<div class="row"><div class="d">${d}</div><div style="flex:1">${esc(t)}</div></div>`).join('')}</div>
<div class="box2"><b style="color:#1b1e26">Fase educativa de 2026.</b> A rejeição técnica automática de NF-e e NFC-e sem IBS e CBS está suspensa, e a NFS-e nacional não rejeita a falta desses dados até 31 de dezembro de 2026. Isso não torna os campos opcionais: depois da data de cada documento, a nota sem eles fica em desconformidade.</div>`),
  'perguntas-ao-fornecedor-do-sistema': base('Oito perguntas para fazer ao fornecedor do seu sistema', 'Roteiro', `
<p class="sub">Envie por e-mail ou mensagem e peça as respostas por escrito. Peça datas e nomes de documentos: "estamos nos preparando" não responde à pergunta.</p>
<div style="margin-top:18px">${PERGUNTAS_FORNECEDOR.map(([t, q], i) => `<div class="row"><div class="n">${i + 1}</div><div style="flex:1"><b>${esc(t)}</b><p>${esc(q)}</p><div class="note"></div></div></div>`).join('')}</div>`),
};

const dir = process.argv[2];
if (!dir) { console.error('Informe a pasta de saída.'); process.exit(1); }
fs.mkdirSync(dir, { recursive: true });
for (const [name, html] of Object.entries(out)) fs.writeFileSync(path.join(dir, name + '.html'), html);
console.log('ok', Object.keys(out).length);
