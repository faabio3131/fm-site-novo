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
  ['3 de agosto de 2026', 'NF-e (modelo 55), NFC-e (modelo 65), CT-e, MDF-e, NF3-e (energia elétrica) e outros documentos de transporte.'],
  ['1º de outubro de 2026', 'NFS-e de serviços sujeitos ao ISS da lista da LC 116/2003 (regra geral) e NFCom.'],
  ['1º de dezembro de 2026', 'NFS-e de plataformas digitais, locações, condomínios e demais serviços não enquadrados antes, e NF-e de quem não é contribuinte do ICMS.'],
  ['1º de janeiro de 2027', 'Todos os documentos para os optantes do Simples Nacional, NF-e de operações com tributação monofásica e importações (Duimp).'],
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
];
