# Kordena: classificação das funções para o site

Base: relatório do responsável pelo produto + leitura do repositório `fm-ai-platform` (somente leitura) + Ficha do Produto (Drive).
Classes: 1 Operacional · 2 Implementado, depende de ativação/homologação · 3 Planejado · 4 Não comprovado (confirmar antes de prometer).
Esta tabela é uma proposta do redator e precisa de confirmação do diretor. Não é certificação independente.

## Esclarecimento do diretor (11/10/2026)
No repositório, "pendente de homologação" em WhatsApp/Meta, PagBank, Mercado Pago, Google e similares **não significa função incompleta**. Essas integrações foram feitas configuráveis de propósito: cada cliente novo informa as próprias credenciais (chaves, tokens, contas), sem que a FM tenha acesso e sem mexer no código. O diretor testou e aprovou cada uma com as suas credenciais. Por isso o site as descreve como funcionais, "com as credenciais do seu negócio".
Em 11/10/2026 o diretor também confirmou iFood e 99Food como funcionais. O Keeta depende de homologação da plataforma e segue como "em homologação".

| Função | Classe | Como o site descreve |
|---|---|---|
| Central de Pedidos, mesas e comandas, app do garçom | 1 | Descrita como função do produto |
| KDS por setor, etapas, prioridade definida pela equipe, alerta de atraso | 1 | "Organiza a produção por setor, acompanha etapas, permite definir prioridades e alerta atrasos". Sem "prioridade automática" |
| Estoque com baixa por receita, validade e alerta ao gerente | 1/2 | Descrita; baixa automática é do novo livro de estoque, parte do app ainda usa o legado |
| Leitura de nota fiscal pela câmera para o estoque | 1 | "Leitura de nota, não emissão fiscal" |
| Indicadores financeiros: faturamento, CMV, lucro bruto, margem | 1 | Sem "lucro líquido", previsões ou relatórios exportáveis |
| Delivery próprio (área, taxa, cupom, cashback, status) | 1 | Descrito |
| Google Maps no delivery: distância, prazo e taxa automática (chave do cliente) | 1 | Destacado; sem rastreamento GPS nem otimização de rotas |
| Atendente IA no WhatsApp (texto e áudio, confirmação do cliente; conta Meta do cliente) | 1 | Descrito como funcional |
| Upsell/cross-sell no Atendente de WhatsApp | 4 | "Sugere complementos" (ficha do produto); código só mostra upsell no PDV |
| Campanha sugerida a partir de produto perto do vencimento, com permissão do dono | 4 | Peças existem (aviso, rascunho, aprovação); cadeia ponta a ponta não comprovada |
| Campanhas e rascunhos para aprovação | 1/2 | Sem promessa de publicação automática em Instagram/Facebook |
| Pix: PagBank e Mercado Pago (credenciais do cliente) | 1 | Descrito como funcional, com as credenciais do negócio |
| iFood e 99Food | 1 | Descritos como integrados (confirmado pelo diretor) |
| Keeta | 2 | "Em andamento, dependente de homologação da plataforma" |
| Gerente IA (consulta, sugestão, confirmação humana, auditoria) | 1/2 | Descrito; sem poder de decisão sozinho |
| Emissão fiscal (NFC-e/NF-e) | não existe | Nunca prometer |
| Lucro líquido, previsões financeiras, relatórios exportáveis | 4 | Não anunciar |
| Rastreamento de entregador em tempo real | 3/4 | Não anunciar |
