// Conteúdo do guia da reforma tributária (página /reforma-tributaria).
// Regra do projeto: só entra o que tem fonte e o que o NFCore realmente comprova no código.
// Os fatos de calendário vêm de atos oficiais e de fontes citadas na seção "Fontes".
// Este guia tem data: ao mudar a norma, atualizar REFORMA_UPDATED e os textos.
export const REFORMA_UPDATED = '16 de outubro de 2026';

export const ESSENCIAL = [
  ['calendar', '2026 · Ano de teste', 'CBS (0,9%) e IBS (0,1%) aparecem nas notas como alíquotas de teste. Não há cobrança adicional: os valores de teste são informativos e, no caso da CBS, abatidos do PIS e da Cofins.'],
  ['chart', '2027 e 2028 · A CBS começa', 'A CBS substitui o PIS e a Cofins. O IBS segue em 0,1%. O Imposto Seletivo passa a valer para produtos como cigarros, bebidas alcoólicas e açucaradas, veículos e minerais, com alíquotas ainda a definir em lei.'],
  ['layers', '2029 a 2032 · O IBS cresce', 'O IBS assume o lugar do ICMS e do ISS aos poucos: cada ano o IBS aumenta e o ICMS e o ISS diminuem.'],
  ['check', '2033 · Modelo pleno', 'ICMS e ISS deixam de existir e o novo modelo passa a valer por inteiro.'],
];

export const CALENDARIO = [
  ['3 de agosto de 2026', 'NF-e (modelo 55), NFC-e (modelo 65), CT-e, MDF-e, NF3-e (energia elétrica) e outros documentos de transporte.', 'NF-e, NFC-e, CT-e, MDF-e, NF3-e e demais documentos de transporte.'],
  ['1º de outubro de 2026', 'NFS-e de serviços sujeitos ao ISS da lista da LC 116/2003 (regra geral) e NFCom.', 'NFS-e de serviços sujeitos ao ISS pela regra geral da LC 116/2003 e NFCom.'],
  ['1º de dezembro de 2026', 'NFS-e de plataformas digitais, locações, condomínios e demais serviços não enquadrados antes, e NF-e de quem não é contribuinte do ICMS.', 'NFS-e de plataformas digitais, locações, condomínios e outros serviços remanescentes, além da NF-e de não contribuinte do ICMS.'],
  ['1º de janeiro de 2027', 'Todos os documentos para os optantes do Simples Nacional, NF-e de operações com tributação monofásica e importações (Duimp).', 'Documentos de optantes do Simples Nacional, NF-e com tributação monofásica e importações via DUIMP.'],
];

export const NOTA_PEDE = [
  ['file', 'Campos novos por item', 'IBS, CBS e Imposto Seletivo informados em cada item da nota, com a classificação tributária (CST e cClassTrib).'],
  ['flow', 'Notas de débito e de crédito', 'Novas finalidades de nota para ajustar valores de IBS e CBS depois da emissão.'],
  ['mega', 'Novos eventos', 'Eventos como perda, mudança na previsão de entrega e pedido de crédito, registrados junto à nota.'],
  ['box', 'Cadastro em dia', 'Produtos e serviços bem classificados (NCM, NBS e código de serviço) deixam a emissão sem retrabalho.'],
];

export const PASSOS = [
  ['1', 'Confirme o seu regime', 'Simples Nacional, Lucro Presumido ou Lucro Real, e as datas que valem para cada documento que a sua empresa emite.'],
  ['2', 'Pergunte ao seu sistema', 'Ele já preenche IBS e CBS nos documentos que têm data em vigor? Peça a resposta por escrito ao seu fornecedor.'],
  ['3', 'Revise o cadastro', 'Confira a classificação fiscal de produtos e serviços. Cadastro errado vira nota errada.'],
  ['4', 'Indique o contador responsável', 'O programa de conformidade pede um profissional de contabilidade responsável pela conformidade fiscal.'],
  ['5', 'Optante do Simples? Decida até 30/10', 'A opção pelo regime regular de IBS e CBS para 2027 tem prazo curto. Avalie com o seu contador.'],
  ['6', 'Acompanhe as normas', 'O leiaute das notas já mudou mais de uma vez em 2026. Combine com o seu fornecedor como cada mudança chega até você.'],
];

// Só o que o código do NFCore comprova (módulo de conformidade RTC e monitor regulatório).
export const NFCORE_SE_PREPARA = [
  ['layers', 'Regras com data de vigência', 'A obrigação legal e a rejeição técnica de cada tipo de nota são tratadas separadamente, por regime tributário e por data de início.'],
  ['map', 'Por estado e por município', 'Cada UF tem a sua regra explícita e, na NFS-e, a regra do município prevalece. Sem regra vigente, o NFCore não presume: bloqueia.'],
  ['file', 'Normas registradas', 'Cada versão de norma oficial usada fica registrada com a origem, para saber qual regra embasou cada decisão.'],
  ['eye', 'IBS, CBS e IS explícitos', 'Os três tributos da reforma ficam como componentes separados, cada um com a sua classificação.'],
  ['bot', 'Monitor regulatório', 'Registra as mudanças normativas, organiza as evidências e encaminha propostas de atualização para revisão e aprovação humana. Nada muda sozinho.'],
  ['store', 'Módulo para alimentação', 'Classificação opcional de IBS e CBS para restaurantes, bares, padarias e negócios similares.'],
];

export const FAQ = [
  ['A reforma tributária já está valendo?', 'Em parte. 2026 é um ano de teste: CBS e IBS aparecem nas notas como alíquotas de teste, sem cobrança adicional. A CBS começa de verdade em 2027, quando substitui o PIS e a Cofins, e o IBS entra aos poucos de 2029 a 2032.'],
  ['Vou pagar mais imposto em 2026?', 'Não por causa dos valores de teste. Em 2026 eles são informativos, e a CBS de teste é abatida do PIS e da Cofins. Converse com o seu contador sobre o efeito no seu caso.'],
  ['Minha nota será rejeitada se não tiver IBS e CBS?', 'Hoje, não automaticamente: a rejeição técnica de NF-e e NFC-e sem esses campos está suspensa, e a NFS-e nacional não rejeita a falta deles até 31 de dezembro de 2026. Mas a obrigação legal continua, e a nota sem os campos, depois da data do documento, fica em desconformidade.'],
  ['O que o Simples Nacional precisa fazer?', 'Quem está no Simples pode continuar pagando IBS e CBS dentro do DAS ou optar pelo regime regular, que gera crédito para os clientes. A opção para o primeiro semestre de 2027 vai até 30 de outubro de 2026. Todos os documentos do Simples passam a exigir IBS e CBS a partir de 1º de janeiro de 2027.'],
  ['O que é o split payment?', 'É a separação do imposto no momento do pagamento, com repasse direto ao governo. O regulamento prevê o início em 2027, de forma opcional e entre empresas, com Pix, boleto e transferência. As etapas seguintes ainda dependem de novo ato.'],
  ['Quais impostos acabam?', 'A CBS substitui o PIS e a Cofins a partir de 1º de janeiro de 2027. O IBS substitui o ICMS e o ISS aos poucos, de 2029 a 2032, e os dois deixam de existir em 2033. O IPI continua existindo, mas com alíquota zero para a maior parte dos produtos a partir de 2027, com exceções que protegem a Zona Franca de Manaus.'],
  ['O que é o Imposto Seletivo?', 'É um imposto criado para desestimular o consumo de bens prejudiciais à saúde ou ao meio ambiente. Incide sobre veículos, embarcações e aeronaves, produtos fumígenos, bebidas alcoólicas, bebidas açucaradas e bens minerais extraídos. A cobrança começa em 1º de janeiro de 2027, mas as alíquotas ainda serão definidas em lei ordinária.'],
  ['Qual será a alíquota da CBS e do IBS?', 'Ainda não está fixada. O TCU calcula a alíquota de referência da CBS para 2027 e tinha até 30 de outubro de 2026 para enviar o cálculo ao Senado, que deve fixá-la até 15 de dezembro. As alíquotas de referência do IBS serão fixadas para os anos de 2029 a 2033. Por enquanto, só há estimativas privadas, que não valem como valor oficial.'],
  ['O MEI muda alguma coisa?', 'O DAS-MEI continua. A mudança está na emissão de notas: a partir de 4 de janeiro de 2027, o MEI deve informar IBS e CBS nos documentos fiscais. Em 2026 ele está dispensado de preencher esses campos. A opção pelo regime regular de IBS e CBS vale para as demais empresas do Simples, e não para o MEI.'],
  ['O que é o cashback da reforma?', 'É a devolução de parte da CBS e do IBS para famílias inscritas no CadÚnico com renda familiar por pessoa de até meio salário mínimo. Os percentuais são maiores para o gás de cozinha e para serviços essenciais, como energia, água e esgoto. A devolução da CBS começa em 2027 e a do IBS em 2029. Os detalhes operacionais ainda serão divulgados pelo Comitê Gestor do IBS e pela Receita Federal.'],
  ['Preciso trocar de sistema de emissão?', 'Não necessariamente. O que importa é que o seu sistema preencha IBS e CBS nos documentos que já têm data para isso e acompanhe as mudanças de leiaute. Pergunte ao seu fornecedor e peça a resposta por escrito: a lista de perguntas está nos materiais para baixar.'],
  ['O NFCore substitui o meu contador?', 'Não. O NFCore organiza regras, documentos e evidências, e a decisão fiscal continua com as pessoas. O conteúdo desta página é informativo e não substitui a orientação de um contador ou advogado.'],
];

export const FONTES = [
  ['Ato Conjunto RFB/CGIBS nº 4, de 30/07/2026 (cronograma dos documentos fiscais)', 'https://www.cgibs.gov.br/upload/arquivos/202607/31091735-20260730-16h30-ato-conjunto-rfb-cgibs-na-c2-ba-4-260731-090909.pdf', 'Fonte oficial'],
  ['Serpro: prazo para optar pelo regime regular de IBS e CBS no Simples Nacional', 'https://www.serpro.gov.br/menu/noticias/noticias-2026/opcao-simples-hibrido', 'Fonte oficial'],
  ['Comitê Gestor do IBS: opção pelo Simples Nacional ou pelo regime regular para 2027', 'https://www.cgibs.gov.br/embora-os-periodos-sejam-parecidos-tratam-de-escolhas-diferentes-por-isso-e-importante-entender-cada-situacao', 'Fonte oficial'],
  ['Mattos Filho: regulamentos do IBS e da CBS', 'https://www.mattosfilho.com.br/unico/regulamentos-ibs-cbs/', 'Análise jurídica'],
  ['Machado Meyer: cronograma oficial dos documentos fiscais com IBS e CBS', 'https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/tributario-ij/rfb-e-cgibs-definem-cronograma-oficial-de-obrigatoriedade-dos-documentos-fiscais-eletronicos-com-ibs-e-cbs', 'Análise jurídica'],
  ['Finsiders: como o split payment vai funcionar em 2027', 'https://finsidersbrasil.com.br/regulamentacao/split-payment-2027-regulamento-cbs-ibs-reforma-tributaria/', 'Imprensa'],
  ['Poder360: o que muda com a reforma tributária a partir de 2027', 'https://www.poder360.com.br/reforma-tributaria-2027/entenda-o-que-muda-com-a-reforma-tributaria-a-partir-de-2027/', 'Imprensa'],
  ['Poder360: Imposto Seletivo, o que é e quando começa', 'https://www.poder360.com.br/poder-economia/imposto-seletivo-o-que-e-quando-comeca-e-quem-vai-pagar/', 'Imprensa'],
  ['CRC-MS: prazos de IBS e CBS na NFS-e e regra de não rejeição em 2026', 'https://crcms.org.br/?p=37622', 'Entidade contábil'],
  ['Rota da Jurisprudência: Programa Nacional de Conformidade Tributária (Ato Conjunto nº 5/2026)', 'https://rotadajurisprudencia.com.br/2026/08/receita-e-comite-gestor-definem-regras-de-conformidade-para-documentos-fiscais-de-ibs-e-cbs-em-2026/', 'Imprensa jurídica'],
  ['Tecnospeed: Nota Técnica 2025.002 (NF-e e NFC-e com IBS, CBS e IS)', 'https://blog.tecnospeed.com.br/nota-tecnica-reforma-tributaria-nfe-nfce/', 'Fornecedor de software'],
  ['Poder360: o que muda para o MEI', 'https://www.poder360.com.br/poder-economia/reforma-tributaria-saiba-o-que-muda-para-o-mei/', 'Imprensa'],
  ['Jornal Contábil: cashback da reforma tributária', 'https://jornalcontabil.com.br/noticia/cashback-da-reforma-tributaria-entenda-como-funciona-e-quem-pode-receber/amp/', 'Imprensa especializada'],
  ['Reforma Tributária (portal): prazos do TCU e do Senado para a alíquota da CBS', 'https://www.reformatributaria.com/iva/tcu-tem-ate-30-de-outubro-para-enviar-ao-senado-calculos-da-aliquota-da-cbs/', 'Imprensa especializada'],
];

// ---------- Radar da reforma tributária (página /reforma-tributaria/radar) ----------
// Para acrescentar um item: copie um bloco, ajuste a data (AAAA-MM-DD), o texto e a fonte,
// e atualize RADAR_UPDATED. Só entra fato que tenha fonte indicada no próprio item.
export const RADAR_UPDATED = '16 de outubro de 2026';
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
export const fmtData = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d}${d === 1 ? 'º' : ''} de ${MESES[m - 1]} de ${y}`; };

export const RADAR = [
  {
    date: '2026-10-09', tag: 'Dado',
    title: 'Cerca de 86% das notas fiscais já destacam a CBS.',
    text: 'Segundo o painel da Receita Federal, 86% das notas emitidas nos 30 dias até 7 de outubro por empresas obrigadas a destacar a CBS cumpriram a exigência. Por estabelecimento, o número é menor: cerca de 67% das empresas obrigadas já destacaram a CBS em todos ou em parte dos documentos. Empresas do Simples Nacional não entram na conta.',
    why: 'A fase educativa não rejeita a nota, mas a maior parte do mercado já está preenchendo os campos.',
    src: ['Agência Brasil: 86% das notas fiscais destacam a CBS', 'https://agenciabrasil.ebc.com.br/economia/noticia/2026-10/reforma-tributaria-86-das-notas-fiscais-destacam-cbs', 'Imprensa'],
  },
  {
    date: '2026-10-16', tag: 'NFS-e',
    title: 'Mais municípios migram para o Portal Nacional da NFS-e.',
    text: 'Tijucas (SC) migra a partir de 31 de outubro. Aparecida de Goiânia (GO), Canguçu (RS) e Três Passos (RS) passam a exigir o Portal Nacional a partir de 1º de novembro, e Olímpia (SP) faz o mesmo para as empresas do Simples. No mesmo dia, Receita e Comitê Gestor definiram um modelo opcional para plataformas digitais enviarem operações em lote por API, sem data definida para os testes.',
    why: 'Quem presta serviço precisa conferir qual sistema o seu município exige e se o emissor já traz os campos de IBS e CBS.',
    src: ['Radar NG: notícias fiscais de 16/10/2026', 'https://notagateway.com.br/blog/radar-ng-noticias-fiscais-16-10-2026/', 'Fornecedor de software'],
  },
  {
    date: '2026-09-29', tag: 'Prazo',
    title: 'Simples Nacional: opção pelo regime regular de IBS e CBS vai até 30 de outubro.',
    text: 'O prazo foi ajustado pela Resolução CGSN nº 194, publicada em 28 de setembro. A opção é facultativa, feita no Portal de Serviços da Receita Federal, e vale de janeiro a junho de 2027. O cancelamento da escolha pode ser feito entre 3 de novembro e 20 de dezembro de 2026.',
    why: 'É o prazo mais próximo para quem é optante do Simples. Vale conversar com o contador antes de decidir.',
    src: ['Serpro: prazo para optar pelo regime regular de IBS e CBS', 'https://www.serpro.gov.br/menu/noticias/noticias-2026/opcao-simples-hibrido', 'Fonte oficial'],
  },
  {
    date: '2026-09-04', tag: 'Alíquota',
    title: 'A alíquota da CBS para 2027 ainda não foi fixada.',
    text: 'O TCU calcula a alíquota de referência da CBS e tem até 30 de outubro para enviar o cálculo ao Senado, que deve fixá-la até 15 de dezembro. As alíquotas de referência do IBS serão fixadas para os anos de 2029 a 2033.',
    why: 'Preços, contratos e a margem de 2027 dependem desse número. As estimativas que circulam são privadas e não valem como valor oficial.',
    src: ['Reforma Tributária (portal): prazos do TCU e do Senado', 'https://www.reformatributaria.com/iva/tcu-tem-ate-30-de-outubro-para-enviar-ao-senado-calculos-da-aliquota-da-cbs/', 'Imprensa especializada'],
  },
  {
    date: '2026-08-17', tag: 'MEI',
    title: 'MEI: o DAS continua e IBS e CBS passam a aparecer na nota em janeiro de 2027.',
    text: 'O MEI não paga uma guia nova: a mudança está na emissão das notas, que deve informar IBS e CBS a partir de 4 de janeiro de 2027. Em 2026 ele está dispensado de preencher esses campos. A opção pelo regime regular não vale para o MEI.',
    why: 'Quem é MEI e emite nota precisa de um emissor que traga os campos novos a partir da data.',
    src: ['Poder360: o que muda para o MEI', 'https://www.poder360.com.br/poder-economia/reforma-tributaria-saiba-o-que-muda-para-o-mei/', 'Imprensa'],
  },
  {
    date: '2026-07-31', tag: 'Norma',
    title: 'Cronograma oficial dos documentos fiscais com IBS e CBS.',
    text: 'O Ato Conjunto RFB/CGIBS nº 4/2026 foi divulgado pela Receita Federal e pelo Comitê Gestor do IBS em 31 de julho. Ele define a data de cada documento e adiou o destaque obrigatório na NFS-e, que estava previsto para 3 de agosto, para 1º de outubro de 2026. Para o Simples Nacional, a obrigação começa em 1º de janeiro de 2027.',
    why: 'É o calendário que vale para a emissão. Está resumido no guia, com as quatro datas.',
    src: ['Legisweb: CGIBS e Receita prorrogam o destaque nas notas de serviços', 'https://www.legisweb.com.br/noticia/?id=34071', 'Imprensa jurídica'],
  },
];

// Datas à frente, todas tiradas dos itens acima e do guia.
export const PROXIMAS = [
  ['30 de outubro de 2026', 'Fim do prazo da opção do Simples pelo regime regular e prazo do TCU para enviar ao Senado o cálculo da alíquota da CBS.'],
  ['3 de novembro a 20 de dezembro de 2026', 'Janela para cancelar a opção feita pelo Simples.'],
  ['1º de dezembro de 2026', 'NFS-e de plataformas digitais, locações, condomínios e demais serviços, e NF-e de quem não é contribuinte do ICMS.'],
  ['15 de dezembro de 2026', 'Prazo para o Senado fixar a alíquota de referência da CBS para 2027.'],
  ['1º de janeiro de 2027', 'A CBS substitui o PIS e a Cofins, e todos os documentos do Simples passam a exigir IBS e CBS.'],
  ['4 de janeiro de 2027', 'O MEI passa a informar IBS e CBS nas notas.'],
];

// ---------- Materiais para baixar (página /reforma-tributaria/materiais e PDFs) ----------
export const MATERIAIS = [
  { id: 'checklist-preparacao', file: 'checklist-reforma-tributaria.pdf', who: ['empreendedor', 'contador'], pill: 'Checklist', title: 'Checklist: como se preparar para a reforma nas notas fiscais', desc: 'Os seis passos do guia em uma folha para imprimir ou marcar, com espaço para anotar o que cada responsável respondeu.', pages: '1 página' },
  { id: 'calendario-documentos', file: 'calendario-documentos-fiscais-2026-2027.pdf', who: ['contador', 'empreendedor'], pill: 'Calendário', title: 'Calendário de IBS e CBS nos documentos fiscais, 2026 e 2027', desc: 'As datas do Ato Conjunto RFB/CGIBS nº 4/2026 por tipo de documento, as datas do Simples Nacional e a fase educativa de 2026.', pages: '1 página' },
  { id: 'perguntas-fornecedor', file: 'perguntas-ao-fornecedor-do-sistema.pdf', who: ['empreendedor'], pill: 'Roteiro', title: 'Oito perguntas para fazer ao fornecedor do seu sistema', desc: 'Um roteiro para pedir, por escrito, o que o seu sistema de emissão já faz e o que ainda vai fazer pela reforma tributária.', pages: '1 página' },
];

export const PERGUNTAS_FORNECEDOR = [
  ['Preenchimento nos documentos', 'O sistema já preenche IBS e CBS por item nos documentos que já têm data de obrigatoriedade para a minha empresa? Quais documentos (NF-e, NFC-e, NFS-e, CT-e)?'],
  ['Classificação tributária', 'O sistema informa a classificação tributária (CST e cClassTrib) de cada item? Quem define essa classificação: o sistema, o meu contador ou eu?'],
  ['Notas de débito e de crédito', 'O sistema emite as notas de débito e de crédito de IBS e CBS, usadas para ajustar valores depois da emissão?'],
  ['Novos eventos', 'O sistema registra os novos eventos da nota, como perda, mudança na previsão de entrega e pedido de crédito?'],
  ['Cadastro de produtos e serviços', 'Como o cadastro (NCM, NBS e código de serviço) é conferido? Existe um relatório de itens sem classificação ou com classificação duvidosa?'],
  ['Mudanças de leiaute', 'Quando o leiaute das notas mudar, em quanto tempo vocês atualizam o sistema e como eu fico sabendo?'],
  ['Nota sem os campos novos', 'Se uma nota for emitida sem os campos de IBS e CBS, o sistema avisa antes do envio? Lembre que a rejeição técnica automática está suspensa, mas a obrigação continua.'],
  ['Simples Nacional', 'Sou optante do Simples: o sistema trata a opção pelo regime regular de IBS e CBS e as datas de 2027?'],
];
