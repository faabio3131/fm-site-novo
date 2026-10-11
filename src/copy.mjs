// Camada de texto de marketing por produto. Só afirma o que consta nas fontes oficiais do site e do guia de marca:
// sem clientes, números, percentuais ou resultados inventados. Verbos de capacidade ("reúne", "acompanha"), não de promessa.
export const COPY = {
  kordena: {
    title: 'Do pedido ao lucro, tudo no mesmo lugar.',
    lead: 'Vendas, atendimento, cozinha, estoque, clientes, marketing e financeiro conectados em uma única plataforma, com delivery próprio e arquitetura preparada para plataformas de delivery. No centro, o Gerente IA Core: ele observa, relaciona e recomenda. Quem decide é você.',
    before: [
      { kind: 'contrast', id: 'desafio', kicker: 'O desafio de quem administra', title: 'Um restaurante tem muitas frentes. O Kordena junta todas.',
        lead: 'Pedidos vindo de vários canais, estoque que acaba na hora errada, faturamento que não vira lucro, controles paralelos. O Kordena foi pensado para tirar o proprietário do escuro.',
        items: [
          ['Pedidos chegando por vários canais', 'Salão, balcão, delivery próprio e WhatsApp na mesma Central de Pedidos, com arquitetura preparada para plataformas externas de delivery.'],
          ['Estoque que só se descobre vazio na hora do aperto', 'Cada pedido dá baixa automática nos insumos, a validade é acompanhada e o sistema avisa antes de faltar ou vencer.'],
          ['Faturamento bom, lucro que ninguém enxerga', 'Faturamento, custos, valor em estoque e margem de lucro lado a lado, com a margem sob controle.'],
          ['Planilhas e conferências paralelas', 'Conferências, relatórios e monitoramento operacional centralizados em um só sistema.'],
          ['Decisões tomadas no escuro', 'O Gerente IA Core relaciona os sinais da operação e recomenda. A decisão final continua sendo sua.'],
        ] },
    ],
    overrides: {
      core: { title: 'Uma venda não termina no caixa. O Kordena acompanha o caminho inteiro.', lead: 'Cada pedido movimenta produção, consome insumos, altera o estoque, gera receita e custo e muda a margem. O Gerente IA Core conecta essas consequências para que o proprietário enxergue o negócio de ponta a ponta.' },
      recursos: { title: 'Tudo o que a operação precisa, falando a mesma língua.', lead: 'Cada recurso conversa com os outros. O que acontece no salão chega à cozinha, ao estoque e ao financeiro, sem retrabalho e sem controle paralelo.' },
      estoque: { title: 'O estoque se atualiza sozinho, a cada pedido.', lead: 'Cada produto usado em um pedido já dá baixa automática no estoque, e o sistema mantém a quantidade sempre atualizada. Ele acompanha a data de validade de cada item, avisa quando algum produto está perto de vencer e sugere uma campanha para dar saída a esse produto. A campanha só é criada se você autorizar.',
        bullets: ['Baixa automática no estoque a cada produto usado no pedido', 'Quantidade sempre atualizada, com previsão de falta e reposição', 'Data de validade acompanhada, item por item', 'Aviso quando um produto está perto de vencer', 'Sugestão de campanha para usar o que está perto do vencimento, e o sistema pede a sua permissão para criá-la', 'Margem de lucro sob controle, com custo e estoque na conta'],
        side: { title: 'Do pedido à campanha, sem perda de controle', steps: ['Pedido registrado', 'Estoque dá baixa automática', 'Validade acompanhada', 'Aviso de produto perto de vencer', 'Campanha sugerida', 'Você autoriza ou recusa'] } },
      financeiro: { title: 'Faturamento não é lucro. O Kordena mostra a diferença.', lead: 'O Kordena oferece indicadores financeiros para acompanhar faturamento, custo dos produtos, lucro bruto e margens, auxiliando o gestor a compreender o desempenho econômico da operação. Como o estoque baixa a cada pedido, o custo entra na conta sem lançamento manual.',
        bullets: ['Acompanhamento do faturamento e do ticket médio', 'Custo das mercadorias vendidas (CMV)', 'Cálculo do lucro bruto', 'Indicadores de margem de lucro'],
        side: { title: 'Visão do proprietário', steps: ['Faturamento', 'Custo dos produtos (CMV)', 'Lucro bruto', 'Margem de lucro'] } },
      'core-acao': { title: 'Pergunte ao seu negócio. Receba uma resposta com contexto.', lead: 'Em vez de caçar números em relatórios, você consulta o Core. Estes são exemplos de perguntas que ele responde com base nos dados da sua operação, sempre com a decisão sob controle humano.' },
      seguranca: { title: 'Inteligência com controle. Automação com responsabilidade.', lead: 'O Kordena apoia a operação sem tirar das pessoas as decisões importantes. Cada usuário trabalha conforme seus acessos e responsabilidades.' },
    },
    after: [
      { kind: 'who', id: 'para-quem', kicker: 'Para quem é', title: 'Para qualquer negócio de alimentação que quer enxergar a própria operação.',
        lead: 'O Kordena foi desenvolvido para negócios do setor alimentício que precisam integrar operação, vendas e gestão, em qualquer tamanho de rotina.',
        chips: ['Restaurantes', 'Pizzarias', 'Hamburguerias', 'Bares', 'Padarias', 'Pastelarias', 'Casas de espetinhos', 'Outros negócios de alimentação'] },
      { kind: 'flow', id: 'como-comecar', kicker: 'Como começar', title: 'Da conversa ao seu restaurante funcionando.',
        lead: 'A implantação acompanha o contexto de cada negócio: estrutura, canais, equipe e integrações.',
        items: [['01', 'Fale com a FM e conte como é a sua operação'], ['02', 'Configuração da operação, integrações e canais'], ['03', 'Usuários e acessos definidos para a sua equipe'], ['04', 'Teste grátis por 30 dias, sem cartão (ativação online em preparação)']] },
    ],
  },
  'iron-fit': {
    title: 'A academia inteira conectada. Do treino ao financeiro.',
    lead: 'Gestão, operação e jornada do aluno em uma única plataforma. A equipe acompanha a academia em um só ambiente, e o aluno leva treinos, agenda, check-in, evolução e financeiro no aplicativo. A inteligência apoia; o profissional continua no controle.',
    before: [
      { kind: 'contrast', id: 'desafio', kicker: 'O desafio de quem administra', title: 'Uma academia vive de rotina. O Iron Fit Core põe a rotina em ordem.',
        lead: 'Cadastro em um lugar, treino em outro, cobrança em uma planilha. O Iron Fit Core reúne tudo sobre a mesma base, para a equipe trabalhar com clareza e o aluno ser acompanhado de verdade.',
        items: [
          ['Controles isolados', 'Alunos, treinos, agenda, acessos, equipamentos e financeiro sobre o mesmo contexto.'],
          ['Treino que ignora a estrutura real', 'Catálogo mestre e inventário por unidade conectam equipamentos, exercícios e treinos.'],
          ['Aluno que se sente sozinho', 'Aplicativo próprio com treinos, agenda, check-in, avaliações, evolução e financeiro.'],
          ['Cobrança que depende de conferência manual', 'Mensalidades, cobranças, recebimentos, pendências e visão de receita no mesmo fluxo.'],
          ['Receio de entregar o treino à IA', 'A Iron Intelligence apoia o acompanhamento, e aprovações e decisões ficam com o profissional.'],
        ] },
    ],
    overrides: {
      core: { title: 'Um Core para conectar toda a operação da academia.', lead: 'O Iron Fit Core organiza gestão, operação e experiência do aluno sobre o mesmo contexto, conectando módulos e dados para reduzir controles isolados.' },
      gestao: { title: 'Da recepção à gestão, tudo no mesmo fluxo.' },
      aluno: { title: 'A academia acompanha. O aluno evolui.' },
      inteligencia: { title: 'Inteligência para apoiar decisões. Controle sempre humano.' },
      seguranca: { title: 'Acesso controlado. Operação rastreável. Dados no contexto certo.' },
    },
    after: [
      { kind: 'who', id: 'para-quem', kicker: 'Para quem é', title: 'Para academias e operações fitness que querem crescer com organização.',
        lead: 'Do estúdio à academia com várias unidades. A arquitetura suporta academias e unidades com contexto e isolamento próprios, preservando permissões e separação operacional.',
        chips: ['Academias', 'Estúdios', 'Operações fitness', 'Redes e múltiplas unidades (Enterprise)'] },
      { kind: 'flow', id: 'como-comecar', kicker: 'Como começar', title: 'Da conversa à academia funcionando.',
        lead: 'A liberação comercial está em preparação. Registre seu interesse e a equipe da FM avisa quando o teste estiver disponível.',
        items: [['01', 'Fale com a FM e conte como é a sua academia'], ['02', 'Configuração da academia e das unidades'], ['03', 'Equipe e profissionais com acessos definidos'], ['04', 'Alunos no aplicativo, com treino, agenda e check-in']] },
    ],
  },
  nfcore: {
    title: 'Infraestrutura fiscal. Sob controle.',
    lead: 'Menos erro humano, menos retrabalho e a gestão fiscal centralizada em uma infraestrutura coordenada pelo Core. O NFCore organiza regras, documentos, emissão, eventos, reconciliação e auditoria, e deixa a autoridade crítica nas mãos de serviços determinísticos, nunca da IA.',
    before: [
      { kind: 'contrast', id: 'desafio', kicker: 'O desafio fiscal', title: 'Fiscal não perdoa improviso. Pede regra, evidência e rastro.',
        lead: 'O NFCore foi desenhado para quem precisa reduzir fragmentação e trabalho manual sem abrir mão do controle.',
        items: [
          ['Erros humanos e retrabalho', 'Regras, documentos, emissão e eventos organizados em uma infraestrutura única.'],
          ['Regras que mudam e se espalham', 'Motor de regras versionadas, separando contexto fiscal, regra tributária e decisão de execução.'],
          ['Divergência que ninguém sabe explicar', 'Reconciliação, arquivo, eventos e auditoria para investigar o que aconteceu.'],
          ['Medo de colocar IA no fiscal', 'A IA coordena e recomenda. Validar e executar o que é crítico fica com serviços determinísticos.'],
        ] },
    ],
    overrides: {},
    after: [
      { kind: 'who', id: 'para-quem', kicker: 'Para quem é', title: 'Para operações que precisam de gestão fiscal com governança.',
        lead: 'O NFCore é tratado como infraestrutura fiscal horizontal da FM Tecnologia, preparada para evoluir por capacidades, documentos e UFs.',
        chips: ['Operações com emissão de documentos fiscais', 'Produtos do ecossistema FM', 'Equipes que precisam de auditoria e rastreabilidade'] },
    ],
  },
  command: {
    title: 'Comande a empresa com dados governados e inteligência no centro.',
    lead: 'Produtos, métricas, financeiro, crescimento, clientes, operações e alertas em uma única visão executiva. Cada número chega com período, qualidade e origem. Quando a fonte não existe, o Command diz que o dado está indisponível, em vez de inventar uma resposta.',
    before: [
      { kind: 'contrast', id: 'desafio', kicker: 'O desafio executivo', title: 'Quando a empresa cresce, os números se espalham. O Command os reúne com origem.',
        lead: 'Vários produtos, várias fontes, várias versões da verdade. O Command conecta, governa e mostra o que é fato, o que falta e o que é recomendação.',
        items: [
          ['Dados espalhados em vários sistemas', 'Uma visão executiva única, com cada produto como escopo próprio.'],
          ['Números sem origem', 'Cada indicador com período, qualidade, atualidade e proveniência.'],
          ['Dado ausente que vira zero', 'Indisponível, nunca zero inventado.'],
          ['Decisões sem rastro', 'Alertas e ações com permissão, prévia e trilha de auditoria.'],
        ] },
    ],
    overrides: {},
    after: [
      { kind: 'who', id: 'para-quem', kicker: 'Para quem é', title: 'Para quem precisa decidir com evidência.',
        lead: 'Gestores e diretoria de empresas que acompanham mais de um produto ou operação e querem uma leitura executiva rastreável.',
        chips: ['Diretoria e gestão executiva', 'Empresas com mais de um produto', 'Times comerciais e de operações'] },
    ],
  },
  atendevendeia: {
    title: 'Sua IA que atende, vende e recupera.',
    lead: 'O AtendeVendeIA responde seus clientes no WhatsApp, leva até o link de pagamento e retoma conversas e vendas paradas. Preço e link vêm sempre do seu cadastro, e a sua equipe fica no comando.',
    before: [
      { kind: 'contrast', id: 'desafio', kicker: 'O desafio de quem vende pelo WhatsApp', title: 'Cliente pergunta, venda esfria, conversa se perde.',
        lead: 'O AtendeVendeIA cuida do atendimento e da recuperação, com limites claros para a IA.',
        items: [
          ['Cliente que pergunta e espera', 'Resposta na hora em que o cliente escreve, em português e de forma cordial.'],
          ['Venda que esfria no meio do caminho', 'Retoma carrinho abandonado, Pix ou boleto sem pagamento e assinatura em atraso.'],
          ['IA que inventa preço', 'Nome da oferta, preço e link de pagamento vêm só da lista que você cadastra.'],
          ['Receio de incomodar o cliente', 'Quem responde SAIR deixa de receber, e a recuperação só fala com quem autorizou.'],
        ] },
    ],
    overrides: {},
    after: [
      { kind: 'who', id: 'para-quem', kicker: 'Para quem é', title: 'Para quem vende pelo WhatsApp e quer atender sem perder o controle.',
        lead: 'Funciona com a API oficial do WhatsApp Business, da Meta. Lançamento em preparação.',
        chips: ['Lojas e negócios que vendem pelo WhatsApp', 'Quem tem ofertas com link de pagamento', 'Equipes que querem passar o que é delicado para uma pessoa'] },
    ],
  },
};
