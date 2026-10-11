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

## Fiscal (NFCore)
Declaração do diretor (11/10/2026): NFC-e, NF-e e NFS-e emitem de verdade; a emissão automática a cada venda depende da configuração do cliente (no ramo de alimentação é comum emitir só quando o cliente pede). O site descreve assim, com a ressalva de que cada estabelecimento usa o próprio certificado e credenciais e de que a disponibilidade depende de UF e município.
ATENÇÃO, divergência documentada: o repositório `kordena-fiscal-engine-v2` (leitura de 11/10/2026) ainda registra PRODUCTION_APPROVED=NO, COMMERCIAL_LIVE=NO, sem provider real nem transporte SEFAZ/prefeitura, e a integração com o Kordena como parcial (PR #118 de `fm-ai-platform` em rascunho). Se a emissão real foi feita em outro repositório ou ambiente, atualizar esses registros. Antes da publicação no domínio, manter em arquivo a evidência de pelo menos uma autorização real de cada modelo (NFC-e, NF-e, NFS-e) e de em quais UFs/municípios.
Comprovado no repo em testes internos: emissão idempotente; numeração contígua; chave de 44 posições com CNPJ alfanumérico; XSD; assinatura A1 com cofre; reconciliação; regras versionadas; classificador de restaurante para IBS/CBS (só classifica); consulta/cancelamento/inutilização; DANFE NFC-e com QR; fila de reenvio; alertas; portal com RBAC.
Não anunciar sem confirmação: contingência offline (V2.0 no roadmap), CC-e/EPEC, reimpressão, cálculo de IBS/CBS, cobertura de todas as UFs, IA fiscal (não existe), "a FM não acessa o certificado".
