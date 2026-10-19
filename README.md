# fm-site-novo

Nova versão do site institucional da FM Tecnologia (em paralelo ao site atual).
Mesma estrutura: site da empresa, vitrine de produtos e uma landing page por produto.

## Como funciona
- `src/config.mjs`: dados da empresa (e-mail, WhatsApp). **Trocar o e-mail corporativo aqui.**
- `src/products.mjs`: todos os produtos. Para colocar um SaaS no ar, mude `status` para `available` e preencha `signupUrl`. Os botões da landing e da página "Entrar" se ajustam sozinhos.
- `assets/`: CSS e JS (tema claro/escuro).
- `npm run build` gera o site estático em `docs/` (URLs sem extensão, para hospedagem). `npm run build:preview` gera `preview/` com `.html` nos links, para abrir localmente.

## Regras de conteúdo
Sem clientes, números, resultados ou certificações inventados. Textos e preços vêm do site atual. O que ainda não existe aparece como "em desenvolvimento".

## Hub da reforma tributária
- `src/reforma.mjs`: guia, FAQ, **radar** (`RADAR`, uma entrada por mudança, com data e fonte) e materiais. Ao mudar a norma, atualize os textos e as datas `*_UPDATED`.
- Os PDFs de `assets/materiais/` saem de `python3 scripts/pdfs.py` (usa `src/materiais-pdf.mjs` e Chromium). Regere sempre que o conteúdo de `reforma.mjs` mudar.

## NFCore — autoridade e integração Web

- Este é o **site institucional canônico novo** (`faabio3131/fm-site-novo`), publicado estaticamente. Não possui Next.js, API server-side nem ambiente seguro para chaves de assinatura do trial.
- O NFCore SaaS usa o repositório separado `faabio3131/nf-core-v001`. O login existente é `https://nfcore-portal-production.up.railway.app/` (nome Railway "production", runtime NFCore configurado como **staging**).
- A landing e a página **Entrar** podem apontar para esse login; isto **não** significa inscrição de trial, oferta comercial aprovada, checkout ativo ou produção fiscal homologada.
- Integração real de trial precisa terminar em endpoint público seguro **na API canônica do NFCore**, ou serviço S2S já autorizado, nunca em HMAC/JWT/token colocado neste site estático. Ativação deve depender do catálogo e autorização comercial reais, proteção antiabuso e credenciais restritas ao servidor.
- A PR #33 de `faabio3131/fm-tecnologia-web-platform` contém um formulário Next.js do site **antigo** e não deve ser mergeada ou copiada diretamente para esta aplicação estática.
