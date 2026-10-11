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
| Cardápio com IA: sobe arquivo, monta o cardápio e escreve as descrições | 1 | Descrito (código mostra importação por foto/PDF/texto com IA) |
| Campanhas orgânicas no Facebook e Instagram (conta Meta do cliente, com aprovação) | 1 | Descrito como funcional por declaração do diretor em 11/10/2026; o código lido não mostra a publicação ponta a ponta, confirmar |
| Disparos por WhatsApp para a base de clientes, com consentimento | 1 | Descrito; consentimento e opt-out comprovados no código |
| Pix: PagBank e Mercado Pago (credenciais do cliente) | 1 | Descrito como funcional, com as credenciais do negócio |
| iFood e 99Food | 1 | Descritos como integrados (confirmado pelo diretor) |
| Keeta | 2 | "Em andamento, dependente de homologação da plataforma" |
| Gerente IA (consulta, sugestão, confirmação humana, auditoria) | 1/2 | Descrito; sem poder de decisão sozinho |
| Emissão fiscal (NFC-e/NF-e) | não existe | Nunca prometer |
| Lucro líquido, previsões financeiras, relatórios exportáveis | 4 | Não anunciar |
| Rastreamento de entregador em tempo real | 3/4 | Não anunciar |

## Fiscal (NFCore) — o que o repositório `kordena-fiscal-engine-v2` comprova (leitura de 11/10/2026)
Fonte de verdade: GitHub (o Drive está desatualizado). Estado do repo: PRODUCTION_APPROVED=NO, COMMERCIAL_LIVE=NO. Não há provider fiscal real nem transporte SEFAZ/prefeitura implementado; só gateway fake/sintético. Homologação oficial: não executada. O Kordena é consumidor previsto por contrato (pack "restaurant-pos-sale", NFC-e; "restaurant-invoice-sale", NF-e); a integração com o Kordena consta como parcial/bloqueada (PR #118 do fm-ai-platform em rascunho).
Comprovado em testes internos (dados sintéticos): emissão idempotente; numeração contígua (128 reservas concorrentes); chave de 44 posições com CNPJ alfanumérico; validação XSD; assinatura A1 com cofre (Google Secret Manager); reconciliação nota×pagamento; regras versionadas; classificador de restaurante para IBS/CBS (só classifica); consulta/cancelamento/inutilização no contrato; DANFE NFC-e com QR (contrato); fila de reenvio com backoff; alertas; portal com RBAC.
NÃO comprovado, não anunciar: emissão real na SEFAZ, produção fiscal, contingência offline (planejada V2.0), CC-e/EPEC, reimpressão, cálculo de IBS/CBS, cobertura de UFs além de SP em teste sintético, NFS-e por município, IA fiscal (não existe), "a FM não acessa o certificado" (política IAM real não comprovada).
O site descreve o fiscal como "em fase de testes" e não cita modelos de nota como operacionais. A atualizar quando o diretor confirmar (a) onde foi o teste real com credenciais dele, (b) transporte real (SEFAZ direta ou provider), (c) se a venda fechada no Kordena já gera nota automaticamente.
