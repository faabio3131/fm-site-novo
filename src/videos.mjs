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
    main: {
      file: 'demo',
      label: 'Apresentação em vídeo do IRON FIT CORE',
      src: 'https://gcdn.picsart.com/picsart-mcp/21969df7-c943-496a-a359-b209b01b101d.mp4',
      poster: 'https://gcdn.picsart.com/cloud-storage/f213ce31-de2d-4d93-9139-0ee5db643452.jpg',
    },
    clips: [],
  },
};
