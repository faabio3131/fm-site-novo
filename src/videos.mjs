// Vídeos por produto. Arquivos em assets/video/<slug>/. Se o arquivo não existir,
// o site mostra um espaço reservado "Vídeo em preparação".
export const VIDEOS = {
  kordena: {
    kicker: 'Demonstração do produto',
    title: 'Veja o Kordena conectando a operação de ponta a ponta.',
    lead: 'Filme demonstrativo com pedidos, produção, entrega e gestão financeira trabalhando conectados, com inteligência aplicada ao contexto do restaurante. Cenas ilustrativas.',
    main: { file: 'demo', label: 'Filme demonstrativo do Kordena' },
    clips: [
      { file: 'pedidos', title: 'Pedidos e atendimento', text: 'Central de pedidos no salão, balcão e delivery.' },
      { file: 'cozinha', title: 'Produção e cozinha', text: 'Fila de preparo e KDS para a equipe.' },
      { file: 'entregas', title: 'Entrega e expedição', text: 'Do pedido pronto à entrega ao cliente.' },
      { file: 'pagamentos', title: 'Pagamentos e gestão', text: 'Recebimento e visão do proprietário.' },
    ],
  },
  'iron-fit': {
    kicker: 'Demonstração do produto',
    title: 'Veja o Iron Fit Core funcionando como uma única plataforma.',
    lead: 'Uma visão prática de como gestão, operação e experiência do aluno se conectam no dia a dia.',
    main: { file: 'demo', label: 'Demonstração oficial do Iron Fit Core' },
    clips: [],
  },
};
