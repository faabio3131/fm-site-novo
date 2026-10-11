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
