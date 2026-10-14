// Espaços de imagem por produto. Coloque os arquivos em assets/img/<slug>/ com estes nomes
// (.jpg). Enquanto o arquivo não existir, o site mostra um espaço reservado com a descrição.
export const IMAGES = {
  kordena: {
    owner: { file: 'gestor.jpg', pos: '72% 50%', alt: 'Proprietário de restaurante acompanhando o negócio em tempo real em uma tela', brief: 'Proprietário/gestor sentado, olhando uma tela com painel de gestão (pedidos, estoque, financeiro), sem números legíveis' },
    owner_text: { kicker: 'Visão do proprietário', title: 'Quem decide precisa ver o negócio inteiro, agora.', lead: 'Faturamento, estoque, pedidos e custos na mesma tela, em tempo real. O proprietário acompanha a operação sem depender de planilhas e de conferências manuais.', bullets: ['Resultado do dia sem esperar o fechamento', 'Riscos de falta e perda antes de virarem prejuízo', 'Decisões com a informação à frente'] },
    splits: [
      { id: 'salao', file: 'garcom.jpg', pos: '62% 50%', alt: 'Garçonete registrando o pedido da mesa em um tablet', brief: 'Garçom com tablet tirando o pedido na mesa',
        kicker: 'Atendimento no salão', title: 'O pedido sai da mesa e vai direto para a produção.', lead: 'O garçom registra o pedido no tablet, sem papel e sem repassar de boca em boca. Mesas, comandas e PDV ficam conectados à produção organizada pelo KDS.',
        bullets: ['Mesas, comandas e PDV na mesma base', 'Pedido encaminhado à produção sem retrabalho', 'Informação compartilhada entre salão, cozinha e caixa'] },
      { id: 'cozinha', flip: true, file: 'cozinha.jpg', alt: 'Responsável acompanhando a produção no sistema, no balcão da cozinha', brief: 'Equipe na cozinha usando o sistema de produção (KDS)',
        kicker: 'Cozinha conectada', title: 'A cozinha sabe o que fazer, e quando.', lead: 'Mesas, comandas, pedidos, KDS e expedição organizados para dar clareza à equipe em cada etapa, do preparo à saída do pedido.',
        bullets: ['Pedidos de salão, balcão e delivery na mesma fila', 'Acompanhamento do preparo e da expedição', 'Informação compartilhada entre as áreas'] },
      { id: 'atendente', ui: 'chat',
        kicker: 'Atendente IA', title: 'Mais que um chatbot: um gerente de atendimento.', lead: 'O Atendente IA do Kordena atende o seu cliente no WhatsApp, entende o pedido e ainda sugere complementos, com upsell e cross-sell na hora certa. O pedido cai direto no PDV e na cozinha, e faz parte do mesmo núcleo de inteligência que conecta a sua operação.',
        bullets: ['Atende no WhatsApp e entende o que o cliente escreve ou fala', 'Consulta o cardápio e organiza o pedido', 'Sugere complementos, como bebida e sobremesa', 'O pedido cai direto no PDV e na cozinha, sem digitar de novo', 'Pode ser personalizado para o jeito do seu estabelecimento', 'A equipe mantém o controle e decide o que for importante'],
        flow: [['Cliente', 'Pede pelo WhatsApp, em texto ou áudio'], ['Atendente IA', 'Entende o pedido e sugere complementos'], ['PDV e cozinha', 'O pedido cai direto, sem redigitar'], ['Core', 'Estoque, financeiro e gestão']] },
    ],
    ambient: [
      { file: 'hamburgueria.jpg', alt: 'Hamburgueria em operação', brief: 'Hamburgueria: chapa, equipe montando pedidos' },
      { file: 'pizzaria.jpg', alt: 'Pizzaria em operação', brief: 'Pizzaria: forno e pizzaiolo' },
      { file: 'restaurante.jpg', alt: 'Salão de restaurante', brief: 'Restaurante: salão com atendimento de mesa' },
    ],
    ambient_title: 'Feito para o seu tipo de negócio',
  },
  'iron-fit': {
    owner: { file: 'gestor.jpg', alt: 'Gestor de academia acompanhando alunos e financeiro em uma tela', brief: 'Gestor de academia sentado, olhando painel com alunos, agenda e financeiro, sem números legíveis' },
    owner_text: { kicker: 'Visão do gestor', title: 'A academia inteira na tela do gestor.', lead: 'Alunos, agenda, acessos e financeiro conectados, para quem administra enxergar a operação em tempo real.', bullets: ['Frequência e agenda no mesmo contexto', 'Cobranças e recebimentos acompanhados', 'Equipe e profissionais com acessos definidos'] },
    ambient: [
      { file: 'musculacao.jpg', alt: 'Sala de musculação', brief: 'Sala de musculação com aparelhos' },
      { file: 'treino.jpg', alt: 'Aluno e profissional em treino', brief: 'Profissional orientando aluno' },
      { file: 'recepcao.jpg', alt: 'Recepção de academia', brief: 'Recepção/check-in de academia' },
    ],
    ambient_title: 'Para academias e estúdios',
  },
  nfcore: {
    owner: { native: 'nf-docs', file: 'gestor.jpg', alt: 'Ilustração de um painel do NFCore com documentos fiscais autorizados, em reconciliação e pendentes', brief: 'Profissional fiscal/contábil diante de tela com documentos e status, sem dados legíveis' },
    owner_text: { kicker: 'Visão fiscal', title: 'Quem responde pelo fiscal precisa de evidência.', lead: 'Documentos, eventos, reconciliação e auditoria em uma visão única, com a autoridade crítica sob controle.', bullets: ['Estado de cada documento acompanhado', 'Rastreabilidade para investigar divergências', 'Menos retrabalho operacional'] },
    ambient: [
      { file: 'equipe.jpg', alt: 'Equipe reunida em volta da mesa analisando relatórios e gráficos', brief: 'Equipe analisando documentos na tela' },
      { file: 'escritorio.jpg', alt: 'Mesa de trabalho fiscal com documentos, caneta, calculadora e painel no tablet', brief: 'Escritório moderno de gestão fiscal' },
    ],
    ambient_title: 'Ambiente de trabalho',
    ambient_note: { title: 'A tecnologia evolui, e o seu fiscal acompanha.', text: 'A IA, junto com o core cognitivo transversal, apoia decisões mais precisas, um melhor enquadramento fiscal e menos margem para erro. A equipe aprova; o NFCore registra.' },
  },
  command: {
    owner: { file: 'gestor.jpg', alt: 'Diretor acompanhando um painel executivo', brief: 'Diretor sentado, olhando painel executivo com vários produtos, sem números legíveis' },
    owner_text: { kicker: 'Visão executiva', title: 'A empresa em uma só tela, com origem em cada dado.', lead: 'Indicadores governados, com período, qualidade e proveniência, para decidir com evidência.', bullets: ['Cada produto como escopo próprio', 'Dado ausente aparece como indisponível', 'Alertas e decisões rastreáveis'] },
    ambient: [
      { file: 'reuniao.jpg', alt: 'Reunião de diretoria', brief: 'Sala de reunião com painel na tela' },
      { file: 'escritorio.jpg', alt: 'Ambiente executivo', brief: 'Ambiente executivo moderno' },
    ],
    ambient_title: 'Para a gestão da empresa',
  },
  atendevendeia: {
    owner: { file: 'gestor.jpg', alt: 'Empreendedor acompanhando conversas e vendas no celular', brief: 'Empreendedor(a) olhando conversas de WhatsApp e relatórios no celular/notebook, sem dados legíveis' },
    owner_text: { kicker: 'Visão do negócio', title: 'Você acompanha as vendas. A IA cuida da conversa.', lead: 'Conversas, vendas recuperadas e uso do plano em relatórios, com a equipe sempre no comando.', bullets: ['Relatórios de conversas e vendas', 'Passagem para uma pessoa quando necessário', 'Preço e link sempre do seu cadastro'] },
    splits: [
      { id: 'venda', ui: 'sales',
        kicker: 'Da conversa ao faturamento', title: 'A conversa vira venda, e a venda vira pedido faturado.', lead: 'O Atendente IA responde no WhatsApp, passa o preço e o link de pagamento direto do seu cadastro e acompanha o pagamento. Quando o cliente paga, o pedido aparece confirmado e faturado para a sua equipe.',
        bullets: ['Preço e link sempre do seu cadastro', 'Pagamento confirmado e pedido faturado', 'Vendas paradas retomadas na conversa'] },
    ],
    ambient: [
      { file: 'loja.jpg', alt: 'Loja que vende pelo WhatsApp', brief: 'Pequeno comércio atendendo pelo celular' },
      { file: 'atendimento.jpg', alt: 'Atendimento no WhatsApp', brief: 'Pessoa atendendo cliente no celular' },
    ],
    ambient_title: 'Para quem vende pelo WhatsApp',
  },
};
