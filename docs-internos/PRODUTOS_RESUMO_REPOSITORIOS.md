# Resumo da leitura dos repositórios (11/10/2026)

Fonte de verdade: GitHub. Leitura somente. O que o código comprova x o que o site afirma.

## Iron Fit Core (iron-fit-backend, iron-fit-app)
Comprovado: cadastro de alunos, equipe e perfis (RBAC), prescrição de treino com aprovação profissional, avaliação física, agenda/reservas, check-in no agendamento, controle de acesso por QR (decisão no servidor, anti-reuso), catálogo mestre de ~165 equipamentos e inventário por unidade, financeiro da academia (planos, cobranças, baixa sem duplicidade, pendências), trial de 30 dias sem cartão, isolamento entre academias, MFA, auditoria, consentimentos (saúde, comunicação, biometria registrada).
Não afirmar: pagamento online do aluno (nenhum gateway implementado), Wellhub/TotalPass (conector do parceiro ausente; ClassPass só pesquisa), IA real (só governança; sem provedor), biometria/reconhecimento facial, gráficos de evolução, modo offline, push, relatórios exportáveis, painel de rede multiunidade, Creator Network (fora do V1). Produção: não há evidência.
## FM Command (FM-CONTROL-CENTER)
Comprovado: central executiva multi-cliente, métricas determinísticas com proveniência, dado ausente nunca vira zero, escopo por produto e tenant, alertas governados (só no painel), Central de Fontes (conector real só do Kordena; dataset hoje vazio), Core Executivo (depende de provedor de modelo), RBAC, auditoria. Estado: Preview/homologação, produção pública não autorizada. 8 métricas ainda "semântica pendente" (MRR, ARR, churn, margem etc.). IRON, CampaIA e NFCore só cadastrados. Billing Asaas/Pix: NO-GO para dinheiro real.
## AtendeVendeIA (fm-vendedor-recuperacao-vendas)
Comprovado em testes: atendimento WhatsApp oficial (Meta), vendedor IA com preço/link só do cadastro, passagem para pessoa, recuperação (carrinho, Pix, boleto, recusada, orçamento, conversa fria), consentimento e opt-out, relatórios e limite por plano, isolamento (RLS), credenciais cifradas, login Google, ferramentas de privacidade. Sem produção; envio real não testado; áudio e Hotmart não provados; "assinatura em atraso do cliente" sem sequência padrão; assistente virtual só por instrução ao modelo.
## ERP Core (fm-next-gen-erp)
Hoje é um protótipo de controle de estoque por lote e validade (FEFO), multi-tenant, sem OCR, sem web e sem deploy. Não é ainda um ERP completo. O site diz apenas "em desenvolvimento" e cita o foco inicial.
## NFCore / fiscal (kordena-fiscal-engine-v2)
Ver KORDENA_FUNCOES.md.
