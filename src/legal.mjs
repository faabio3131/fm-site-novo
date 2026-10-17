// Textos dos documentos legais do site (política de privacidade e termos de uso).
// Redigidos pela FM para o site institucional. Regra do projeto: nada de certificação,
// número ou prática que a FM não possa comprovar. Antes de tratar como definitivo,
// o texto deve passar por revisão jurídica.
export const LEGAL_UPDATED = '16 de outubro de 2026';

// Cada documento é uma função de (SITE, href) para que e-mail, CNPJ e links venham da configuração central.
export const privacidade = (S, href) => ({
  kicker: 'Política de privacidade',
  title: 'Política de privacidade do site',
  desc: `Como a ${S.name} trata dados pessoais no site ${S.domain}, conforme a LGPD, e como você exerce os seus direitos.`,
  lead: `Esta política explica quais dados pessoais a ${S.legalName} trata quando você visita o site ${S.domain} ou fala com a gente, para quê, com quem compartilhamos e como você exerce os seus direitos.`,
  sections: [
    { id: 'quem-somos', t: 'Quem somos e a quem esta política se aplica', p: [
      `O controlador dos dados tratados neste site é a <b>${S.legalName}</b>, inscrita no CNPJ sob o nº ${S.cnpj}, que atua com a marca ${S.name}.`,
      `Esta política vale para o <b>site institucional</b> (${S.domain}): navegação, contato e pedidos de informação. Os produtos da FM (como Kordena, Iron Fit Core e NFCore) têm ambiente próprio, e o tratamento de dados dentro deles é explicado na seção 9.`,
    ] },
    { id: 'dados', t: 'Quais dados tratamos', p: ['O site é simples de propósito: não tem cadastro, área de login nem formulário. Tratamos apenas o que segue.'], l: [
      '<b>Dados que você envia ao falar com a gente:</b> nome, telefone, e-mail, o conteúdo da mensagem e qualquer outra informação que você decidir incluir. O contato acontece pelo WhatsApp ou pelo seu aplicativo de e-mail, e não por um formulário do site.',
      '<b>Dados técnicos de acesso:</b> endereço IP, data e hora, páginas acessadas e tipo de navegador ou dispositivo. Eles são registrados pela infraestrutura que hospeda o site (Cloudflare) para entregar as páginas e proteger o serviço.',
      '<b>Fontes do Google:</b> as páginas carregam fontes tipográficas do Google Fonts, o que faz o seu navegador se conectar a servidores do Google ao abrir o site.',
    ] },
    { id: 'cookies', t: 'Cookies e rastreamento', p: [
      'O site não usa cookies de publicidade, de análise de audiência nem de rastreamento, e não grava informações no seu navegador.',
      'Se isso mudar (por exemplo, ao incluir uma ferramenta de análise), vamos atualizar esta política e pedir o seu consentimento quando a lei exigir.',
    ] },
    { id: 'finalidades', t: 'Para que usamos os dados e em que base legal', p: ['Usamos os dados apenas para as finalidades abaixo, sempre apoiadas em uma base legal da Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).'], l: [
      '<b>Responder ao seu contato</b>, esclarecer dúvidas e enviar propostas que você pediu. Base: procedimentos preliminares a um contrato, a pedido do titular (art. 7º, V).',
      '<b>Manter o site disponível e seguro</b>, prevenir abusos e entender falhas de funcionamento. Base: legítimo interesse (art. 7º, IX).',
      '<b>Cumprir obrigações legais ou regulatórias</b>, quando aplicável (art. 7º, II).',
      '<b>Enviar comunicações além da sua resposta</b>, somente se você concordar. Base: consentimento (art. 7º, I), que você pode retirar a qualquer momento.',
    ] },
    { id: 'compartilhamento', t: 'Com quem compartilhamos', p: [
      'Não vendemos dados pessoais. Os dados passam apenas por quem é necessário para o serviço funcionar:',
    ], l: [
      '<b>WhatsApp (Meta):</b> quando você escolhe falar conosco pelo WhatsApp, a conversa é tratada também pela Meta, segundo a política dela.',
      '<b>Provedores de e-mail:</b> o seu e o nosso, quando você escreve por e-mail.',
      '<b>Cloudflare:</b> hospedagem e entrega do site.',
      '<b>Google:</b> fornecimento das fontes tipográficas.',
      '<b>Autoridades públicas</b>, quando houver obrigação legal ou ordem judicial.',
    ], p2: ['Alguns desses provedores podem tratar dados fora do Brasil. Nesses casos, buscamos provedores que adotem salvaguardas compatíveis com a LGPD.'] },
    { id: 'retencao', t: 'Por quanto tempo guardamos', p: [
      'Guardamos as mensagens de contato pelo tempo necessário para atender você e para um eventual relacionamento comercial. Depois disso, mantemos os dados apenas pelo prazo exigido em lei ou para o exercício regular de direitos.',
      'Você pode pedir a eliminação dos seus dados a qualquer momento, e atenderemos o pedido, ressalvadas as hipóteses em que a lei obriga a guarda.',
    ] },
    { id: 'direitos', t: 'Seus direitos', p: ['A LGPD (art. 18) garante a você, a qualquer momento e mediante pedido:'], l: [
      'confirmação de que tratamos dados seus e acesso a eles;',
      'correção de dados incompletos, inexatos ou desatualizados;',
      'anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desacordo com a lei;',
      'portabilidade dos dados, nos termos da regulamentação;',
      'informação sobre com quem compartilhamos os dados;',
      'informação sobre a possibilidade de não consentir e sobre as consequências disso;',
      'revogação do consentimento e oposição a tratamentos feitos sem consentimento, quando houver descumprimento da lei.',
    ], p2: [
      `Para exercer qualquer um desses direitos, escreva para <a href="mailto:${S.email}">${S.email}</a>. Podemos pedir informações para confirmar quem você é antes de atender o pedido, para proteger os seus dados. Responderemos dentro dos prazos previstos na LGPD.`,
      'Se entender que o tratamento não está de acordo com a lei, você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',
    ] },
    { id: 'seguranca', t: 'Como protegemos os dados do site', p: [
      'O site é estático: não tem banco de dados de visitantes nem área de login. Isso reduz muito a quantidade de dados que existe para ser protegida. Os dados que você nos envia por WhatsApp ou e-mail ficam nas contas da empresa, com acesso restrito a quem precisa atender o contato.',
      `Nenhum ambiente é livre de incidentes. Se algo que afete os seus dados acontecer, vamos tomar as providências previstas na LGPD, incluindo a comunicação a você e à ANPD quando for exigida. Para saber mais sobre como pensamos segurança, veja a página <a href="${href('seguranca')}">Segurança e privacidade</a>.`,
    ] },
    { id: 'produtos', t: 'Dados dentro dos produtos da FM', p: [
      'Quando uma empresa usa um produto da FM, os dados que ela cadastra (clientes, pedidos, notas, alunos e outros) pertencem à empresa. Nesse uso, a FM trata os dados em nome da empresa contratante e conforme as instruções dela.',
      'Cada produto terá política de privacidade e termos de uso próprios, publicados quando ele estiver disponível comercialmente. Eles complementam esta política no que for específico do produto.',
    ] },
    { id: 'menores', t: 'Crianças e adolescentes', p: [
      'Os nossos produtos e este site são voltados a empresas e profissionais. Não coletamos dados de crianças e adolescentes de forma intencional. Se você acredita que um menor nos enviou dados, avise-nos para que possamos eliminá-los.',
    ] },
    { id: 'links', t: 'Links para outros sites', p: [
      'O site pode ter links para serviços de terceiros, como o WhatsApp. Esses serviços têm suas próprias políticas, e a FM não responde pelo tratamento de dados que eles fazem.',
    ] },
    { id: 'alteracoes', t: 'Alterações nesta política', p: [
      `Podemos atualizar esta política para refletir mudanças no site, nos produtos ou na lei. A data da última atualização aparece no topo da página. Mudanças relevantes serão destacadas no site.`,
    ] },
    { id: 'contato', t: 'Fale com a gente sobre privacidade', p: [
      `Para dúvidas, pedidos ou reclamações sobre o tratamento de dados pessoais, o canal é o e-mail <a href="mailto:${S.email}">${S.email}</a>. Se preferir, fale pelo WhatsApp ${S.whatsappLabel}.`,
      `${S.legalName} · CNPJ ${S.cnpj}`,
    ] },
  ],
});

export const termos = (S, href) => ({
  kicker: 'Termos de uso',
  title: 'Termos de uso do site',
  desc: `Regras de uso do site ${S.domain}, da ${S.name}: finalidade das informações, propriedade intelectual, responsabilidades e lei aplicável.`,
  lead: `Ao acessar o site ${S.domain}, você concorda com estas regras de uso. Elas valem para o site institucional. A contratação de um produto da FM tem contrato e termos próprios.`,
  sections: [
    { id: 'aceite', t: 'Quem somos e aceite dos termos', p: [
      `O site ${S.domain} é mantido pela <b>${S.legalName}</b>, CNPJ ${S.cnpj}, que atua com a marca ${S.name}.`,
      'Se você não concorda com estes termos, pedimos que não use o site. Usar o site significa que você leu e aceitou o que está aqui.',
    ] },
    { id: 'finalidade', t: 'Para que serve o site', p: [
      'O site apresenta a empresa, os produtos e as formas de contato. O conteúdo é informativo e não é uma oferta vinculante.',
      'Os produtos têm estágios diferentes: alguns estão disponíveis, outros estão em preparação ou em desenvolvimento. O estágio de cada um aparece na própria página do produto. Descrições, valores e condições podem mudar, e valem para a contratação somente quando confirmados por escrito.',
      'Imagens e telas marcadas como exemplo ilustrativo servem para explicar a ideia do produto e não representam dados de clientes reais.',
    ] },
    { id: 'contratacao', t: 'Contratação de produtos', p: [
      'A contratação de qualquer produto da FM é regida pelo contrato e pelos termos específicos daquele produto, apresentados no momento da contratação. Em caso de diferença, vale o documento do produto.',
    ] },
    { id: 'propriedade', t: 'Propriedade intelectual', p: [
      'Marcas, logotipos, textos, desenhos, telas, vídeos, código e demais conteúdos do site pertencem à FM Tecnologia ou a quem nos licenciou o uso, e são protegidos pela legislação de propriedade intelectual.',
      'Algumas fotografias são de terceiros e trazem o crédito do autor, conforme a licença da origem.',
      'Você pode ver e compartilhar os links do site. Não é permitido copiar, modificar, distribuir ou usar o conteúdo, as marcas ou os logotipos para fins comerciais sem autorização prévia e por escrito.',
    ] },
    { id: 'uso', t: 'Uso adequado', p: ['Ao usar o site, você se compromete a não:'], l: [
      'tentar acessar áreas, sistemas ou dados que não sejam públicos;',
      'interferir no funcionamento do site, sobrecarregá-lo ou tentar burlar medidas de segurança;',
      'usar robôs, rastreadores ou coletas automáticas de forma abusiva;',
      'usar o site para fins ilícitos, ou para enviar conteúdo ofensivo, falso ou que viole direitos de terceiros.',
    ] },
    { id: 'terceiros', t: 'Links e serviços de terceiros', p: [
      'O site pode apontar para serviços de terceiros, como o WhatsApp. Esses serviços têm seus próprios termos e políticas, e a FM não responde pelo conteúdo ou pelo funcionamento deles.',
    ] },
    { id: 'responsabilidade', t: 'Limites de responsabilidade', p: [
      'Fazemos o possível para manter o site correto, atualizado e disponível, mas não garantimos que ele esteja sempre livre de erros ou funcionando sem interrupções.',
      'O conteúdo do site, inclusive o que trata de legislação e de reforma tributária, tem caráter informativo e <b>não substitui a orientação de um contador, advogado ou outro profissional</b> para a sua situação.',
      'A FM não se responsabiliza por decisões tomadas apenas com base no conteúdo do site, nem por danos decorrentes de indisponibilidade, de falhas de terceiros ou de uso indevido do site, na medida permitida pela lei.',
    ] },
    { id: 'privacidade', t: 'Privacidade', p: [
      `O tratamento de dados pessoais feito no site está descrito na <a href="${href('privacidade')}">Política de privacidade</a>, que faz parte destes termos.`,
    ] },
    { id: 'alteracoes', t: 'Alterações dos termos', p: [
      'Podemos atualizar estes termos a qualquer momento. A versão vigente é a publicada nesta página, com a data da última atualização no topo. Continuar usando o site depois de uma mudança significa que você concorda com a nova versão.',
    ] },
    { id: 'lei', t: 'Lei aplicável e foro', p: [
      'Estes termos são regidos pelas leis do Brasil. Quando a relação for de consumo, fica garantido ao consumidor o foro do seu domicílio. Nos demais casos, as partes elegem o foro da comarca da sede da FM Tecnologia LTDA.',
    ] },
    { id: 'contato', t: 'Contato', p: [
      `Dúvidas sobre estes termos: <a href="mailto:${S.email}">${S.email}</a> ou WhatsApp ${S.whatsappLabel}.`,
      `${S.legalName} · CNPJ ${S.cnpj}`,
    ] },
  ],
});
