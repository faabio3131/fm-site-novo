# 2026-10-18 — NFCore / Reforma Tributária: calendário compacto da landing

**Repositório e base CURRENT:** `faabio3131/fm-site-novo` · `main d6210ca43f58e4b7134a5af21f8573dddbb1a35c`.

## Diagnóstico

A página pública `https://fmtecnologiaia.com.br/produtos/nfcore` serve HTML estático equivalente a `docs/produtos/nfcore.html`, gerado por `src/build.mjs`, com CSS em `assets/site.css`. A estrutura Next.js do repositório `fm-tecnologia-web-platform` é outra implementação e **não é a autoridade desta página**.

## Alteração aprovada

- Resumir apenas os quatro itens visíveis do calendário na seção "Reforma tributária" da landing NFCore, usando a primeira redação aprovada, com datas preservadas.
- Datas e descrições completas permanecem na mesma fonte `src/reforma.mjs` e na página do guia; o terceiro campo de cada entrada é exclusivamente apresentação resumida na landing. PDFs e guia continuam consumindo o segundo campo integral.
- Layout do destaque em duas colunas no desktop e uma no mobile; descrições 14 px no desktop, 13 px no mobile; data destacada, fonte da informação preservada.
- Links de **Ver o guia completo**, **Radar de mudanças** e **Checklist e materiais para baixar** mantidos exatamente como estavam; não alterar os seus destinos.
- CSS canônico `assets/site.css`, HTML e folha gerados em `docs/`; o hash de cache CSS atualizado aparece nas páginas estáticas geradas. Nenhum texto não relacionado foi intencionalmente reescrito.

## Testes e gates

`npm run build` regenera `docs/`; `npm test` verifica calendário curto, guia longo e integridade dos links; CI automatizado de PR deve validar build/test/ausência de divergência entre fonte e HTML gerado. Verificação visual com Chrome automatizado em 1366×768 e 390×844 conferiu grid responsivo, tamanhos 14/13 px, quatro itens, ausência de rolagem horizontal e link do guia.

**Limites:** nenhum deploy Cloudflare, alteração DNS, backend fiscal, billing, checkout, certificado ou conteúdo do guia. Merge/publicação requer decisão específica após CI verde; não declarar site público atualizado apenas por alterações na branch.
