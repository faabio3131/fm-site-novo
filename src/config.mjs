// Configuração central do site. Para colocar um produto no ar, altere o `status`
// e, quando existir, o `signupUrl` em src/products.mjs. Nada mais precisa mudar.
export const SITE = {
  name: 'FM Tecnologia',
  signature: 'IA para melhorar hoje e evoluir o amanhã.',
  domain: 'fmtecnologiaia.com.br',
  // Contato comercial atual. Trocar aqui quando houver e-mail corporativo.
  email: 'fmtecnologia.comercial@gmail.com',
  whatsapp: '5511978350851',
  whatsappLabel: '(11) 97835-0851',
};

export const wa = (msg) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

// Estados possíveis de um produto e como o site se comporta em cada um.
export const STATUS = {
  available: { label: 'Disponível', tone: 'ok' },
  launching: { label: 'Lançamento em preparação', tone: 'am' },
  dev: { label: 'Em desenvolvimento · Em breve', tone: 'gr' },
  rnd: { label: 'Tecnologia & P&D', tone: 'gr' },
};
