// Espaços de imagem por produto. Coloque os arquivos em assets/img/<slug>/ com estes nomes
// (.jpg). Enquanto o arquivo não existir, o site mostra um espaço reservado com a descrição.
export const IMAGES = {
  kordena: {
    owner: { file: 'gestor.jpg', alt: 'Proprietário de restaurante acompanhando o negócio em tempo real em uma tela', brief: 'Proprietário/gestor sentado, olhando uma tela com painel de gestão (pedidos, estoque, financeiro), sem números legíveis' },
    owner_text: { kicker: 'Visão do proprietário', title: 'Quem decide precisa ver o negócio inteiro, agora.', lead: 'Faturamento, estoque, pedidos e custos na mesma tela, em tempo real. O proprietário acompanha a operação sem depender de planilhas e de conferências manuais.', bullets: ['Resultado do dia sem esperar o fechamento', 'Riscos de falta e perda antes de virarem prejuízo', 'Decisões com a informação à frente'] },
    kitchen: { file: 'cozinha.jpg', alt: 'Responsável acompanhando a produção no sistema, no balcão da cozinha', brief: 'Equipe na cozinha usando o sistema de produção (KDS)',
      kicker: 'Cozinha conectada', title: 'A cozinha sabe o que fazer, e quando.', lead: 'Mesas, comandas, pedidos, KDS e expedição organizados para dar clareza à equipe em cada etapa, do preparo à saída do pedido.',
      bullets: ['Pedidos de salão, balcão e delivery na mesma fila', 'Acompanhamento do preparo e da expedição', 'Informação compartilhada entre as áreas'] },
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
    owner: { file: 'gestor.jpg', alt: 'Responsável fiscal acompanhando documentos em uma tela', brief: 'Profissional fiscal/contábil diante de tela com documentos e status, sem dados legíveis' },
    owner_text: { kicker: 'Visão fiscal', title: 'Quem responde pelo fiscal precisa de evidência.', lead: 'Documentos, eventos, reconciliação e auditoria em uma visão única, com a autoridade crítica sob controle.', bullets: ['Estado de cada documento acompanhado', 'Rastreabilidade para investigar divergências', 'Menos retrabalho operacional'] },
    ambient: [
      { file: 'escritorio.jpg', alt: 'Escritório de gestão fiscal', brief: 'Escritório moderno de gestão fiscal' },
      { file: 'equipe.jpg', alt: 'Equipe analisando documentos', brief: 'Equipe analisando documentos na tela' },
    ],
    ambient_title: 'Ambiente de trabalho',
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
    ambient: [
      { file: 'loja.jpg', alt: 'Loja que vende pelo WhatsApp', brief: 'Pequeno comércio atendendo pelo celular' },
      { file: 'atendimento.jpg', alt: 'Atendimento no WhatsApp', brief: 'Pessoa atendendo cliente no celular' },
    ],
    ambient_title: 'Para quem vende pelo WhatsApp',
  },
};
