// Vídeos por produto. Arquivos em assets/video/<slug>/. Se o arquivo não existir,
// o site mostra um espaço reservado "Vídeo em preparação".
export const VIDEOS = {
  kordena: {
    kicker: 'Demonstração do produto',
    title: 'Veja o Kordena na cozinha, em tempo real.',
    lead: 'Do pedido à cozinha, da entrega ao financeiro, passando por estoque, várias unidades e o Gerente IA. Cenas ilustrativas, em um filme demonstrativo provisório.',
    main: { file: 'demo', label: 'Filme demonstrativo do Kordena: do pedido à gestão com o Gerente IA' },
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
