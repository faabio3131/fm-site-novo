/*!
 * FM Chat Widget v1 — chat automatizado estilo WhatsApp, embutível em qualquer site estático.
 * Mesmo arquivo nos 4 sites (FM Tecnologia, NFCore, Iron Fit, Kordena); o que muda é a
 * configuração passada em window.FM_CHAT_CONFIG antes de carregar este script.
 *
 * Configuração esperada (definir ANTES de incluir este <script>):
 *   window.FM_CHAT_CONFIG = {
 *     site: "nfcore",                         // identificador do produto (bate com o backend)
 *     productName: "NFCore",                  // nome exibido no cabeçalho do chat
 *     accentColor: "#0b8457",                 // cor do botão/cabeçalho (padrão: verde WhatsApp)
 *     avatarInitial: "N",                     // letra/ícone do avatar
 *     greeting: "Olá! Posso te ajudar a conhecer o NFCore. Pergunte sobre planos, cobertura ou teste grátis.",
 *     apiBase: "https://chat.fmtecnologiaia.com.br", // endpoint do backend (vazio = modo WhatsApp direto)
 *     whatsappNumber: "5511978350851",        // número para fallback/handoff humano
 *     whatsappPrefill: "Olá! Vim pelo site do NFCore e quero falar com um atendente."
 *   };
 *
 * Sem apiBase configurado (ou se o backend estiver fora do ar), o widget funciona em modo
 * degradado: mostra uma mensagem explicando e já oferece o botão de WhatsApp real — nunca
 * fica quebrado nem passa impressão de que a automação existe quando não existe.
 */
(function () {
  "use strict";

  var CFG = window.FM_CHAT_CONFIG || {};
  var SITE = CFG.site || "fm";
  var PRODUCT = CFG.productName || "FM Tecnologia";
  var ACCENT = CFG.accentColor || "#128C7E";
  var AVATAR = (CFG.avatarInitial || PRODUCT.charAt(0) || "F").toUpperCase();
  var GREETING = CFG.greeting || "Olá! Como posso ajudar?";
  var API_BASE = (CFG.apiBase || "").replace(/\/$/, "");
  var WA_NUMBER = CFG.whatsappNumber || "";
  var WA_PREFILL = CFG.whatsappPrefill || ("Olá! Vim pelo site do " + PRODUCT + ".");
  // API CORS permite o domínio canônico sem www. Evita origem bloqueada no navegador.
  if (SITE === "fm" && window.location && window.location.hostname === "www.fmtecnologiaia.com.br") {
    window.location.replace("https://fmtecnologiaia.com.br" + window.location.pathname + window.location.search + window.location.hash);
    return;
  }
  var SESSION_KEY = "fm_chat_session_" + SITE;

  function waLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text || WA_PREFILL);
  }

  function getSessionId() {
    try {
      var id = window.localStorage.getItem(SESSION_KEY);
      if (!id) {
        id = SITE + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
        window.localStorage.setItem(SESSION_KEY, id);
      }
      return id;
    } catch (e) {
      return SITE + "-" + Date.now();
    }
  }

  var css = "" +
    "#fmchat-btn{position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;" +
    "background:" + ACCENT + ";box-shadow:0 4px 14px rgba(0,0,0,.25);display:flex;align-items:center;" +
    "justify-content:center;cursor:pointer;z-index:999998;transition:transform .15s ease;border:none;}" +
    "#fmchat-btn:hover{transform:scale(1.06);}" +
    "#fmchat-btn svg{width:30px;height:30px;fill:#fff;}" +
    "#fmchat-panel{position:fixed;bottom:92px;right:20px;width:340px;max-width:92vw;height:480px;" +
    "max-height:72vh;background:#fff;color:#111;border-radius:14px;box-shadow:0 10px 34px rgba(0,0,0,.28);" +
    "display:none;flex-direction:column;overflow:hidden;z-index:999999;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;" +
    "text-align:left;line-height:normal;}" +
    "#fmchat-panel *{box-sizing:border-box;}" +
    "#fmchat-panel.open{display:flex;}" +
    "#fmchat-head{background:" + ACCENT + ";color:#fff;padding:12px 14px;display:flex;align-items:center;gap:10px;}" +
    "#fmchat-avatar{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.25);" +
    "display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;}" +
    "#fmchat-head .fmchat-title{font-weight:600;font-size:14px;}" +
    "#fmchat-head .fmchat-sub{font-size:11px;opacity:.85;}" +
    "#fmchat-close{margin-left:auto;cursor:pointer;background:none;border:none;color:#fff;font-size:18px;opacity:.85;}" +
    "#fmchat-body{flex:1;overflow-y:auto;padding:12px;background:#e9edf0;display:flex;flex-direction:column;gap:8px;}" +
    ".fmchat-msg{max-width:80%;padding:8px 11px;border-radius:9px;font-size:13.5px;line-height:1.35;white-space:pre-wrap;word-wrap:break-word;color:#111;}" +
    ".fmchat-msg.bot{background:#fff;align-self:flex-start;border-top-left-radius:2px;color:#111;}" +
    ".fmchat-msg.user{background:#d9fdd3;align-self:flex-end;border-top-right-radius:2px;color:#111;}" +
    ".fmchat-msg.sys{background:transparent;align-self:center;color:#667;font-size:12px;text-align:center;}" +
    ".fmchat-typing{align-self:flex-start;background:#fff;border-radius:9px;padding:8px 12px;font-size:12px;color:#888;}" +
    "#fmchat-foot{display:flex;border-top:1px solid #ddd;padding:8px;gap:6px;background:#fff;}" +
    "#fmchat-input{flex:1;border:1px solid #ccc;border-radius:18px;padding:8px 13px;font-size:13.5px;outline:none;color:#111;background:#fff;}" +
    "#fmchat-send{background:" + ACCENT + ";border:none;color:#fff;border-radius:50%;width:36px;height:36px;" +
    "display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none;}" +
    ".fmchat-wabtn{display:inline-block;margin-top:6px;background:#128C7E;color:#fff !important;text-decoration:none;" +
    "padding:7px 12px;border-radius:16px;font-size:12.5px;}";

  css += "#fmchat-invite{position:fixed;bottom:25px;right:92px;z-index:999997;max-width:min(300px,calc(100vw - 112px));display:flex;align-items:center;gap:6px;background:#fff;color:#172033;border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 6px 22px rgba(0,0,0,.17);font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;}" +
    "#fmchat-invite[hidden]{display:none;}" +
    "#fmchat-invite-open{border:0;background:transparent;color:inherit;cursor:pointer;text-align:left;padding:10px 4px 10px 12px;min-width:0;}" +
    "#fmchat-invite-open strong{display:block;font-size:12px;line-height:1.35;color:#1e293b;}" +
    "#fmchat-invite-open span{display:block;font-size:12px;line-height:1.4;color:#475569;}" +
    "#fmchat-invite-dismiss{align-self:flex-start;flex:none;background:transparent;border:0;color:#64748b;cursor:pointer;padding:7px 9px;font-size:17px;line-height:1;}" +
    "#fmchat-invite :focus-visible{outline:2px solid #2563eb;outline-offset:2px;}" +
    "@media(max-width:480px){#fmchat-invite{bottom:23px;right:88px;max-width:calc(100vw - 108px);}#fmchat-invite-open{padding:8px 2px 8px 10px;}#fmchat-invite-open span{font-size:11px;}}";

  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var btn = document.createElement("button");
  btn.id = "fmchat-btn";
  btn.setAttribute("aria-label", "Abrir chat");
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>';
  document.body.appendChild(btn);

  var INVITATIONS = {
    fm: "Conheça nossas soluções ou fale com nossa equipe.",
    nfcore: "Precisa de ajuda com emissão fiscal ou quer conhecer o NFCore?",
    kordena: "Conheça a gestão inteligente para seu restaurante.",
    ironfit: "Tire dúvidas e descubra como transformar sua academia."
  };
  var INVITATION = CFG.invitation || INVITATIONS[SITE] || "Como podemos ajudar?";
  var INVITE_KEY = "fm_chat_invite_dismissed_" + SITE;
  var invite = document.createElement("div");
  invite.id = "fmchat-invite";
  var inviteOpen = document.createElement("button");
  inviteOpen.id = "fmchat-invite-open";
  inviteOpen.type = "button";
  inviteOpen.setAttribute("aria-label", "Abrir atendimento: " + INVITATION);
  var inviteTitle = document.createElement("strong");
  inviteTitle.textContent = "Atendimento Inteligente";
  var inviteMessage = document.createElement("span");
  inviteMessage.textContent = INVITATION;
  inviteOpen.appendChild(inviteTitle);
  inviteOpen.appendChild(inviteMessage);
  var inviteDismiss = document.createElement("button");
  inviteDismiss.id = "fmchat-invite-dismiss";
  inviteDismiss.type = "button";
  inviteDismiss.setAttribute("aria-label", "Dispensar convite de atendimento");
  inviteDismiss.textContent = "×";
  invite.appendChild(inviteOpen);
  invite.appendChild(inviteDismiss);
  document.body.appendChild(invite);
  var inviteDismissed = false;
  try { inviteDismissed = window.sessionStorage.getItem(INVITE_KEY) === "1"; } catch (e) {}
  invite.hidden = inviteDismissed;
  inviteOpen.addEventListener("click", function () { btn.click(); });
  inviteDismiss.addEventListener("click", function () {
    inviteDismissed = true;
    invite.hidden = true;
    try { window.sessionStorage.setItem(INVITE_KEY, "1"); } catch (e) {}
  });

  var panel = document.createElement("div");
  panel.id = "fmchat-panel";
  panel.innerHTML =
    '<div id="fmchat-head">' +
      '<div id="fmchat-avatar">' + AVATAR + '</div>' +
      '<div><div class="fmchat-title">' + PRODUCT + '</div><div class="fmchat-sub">normalmente responde em poucos segundos</div></div>' +
      '<button id="fmchat-close" aria-label="Fechar">✕</button>' +
    '</div>' +
    '<div id="fmchat-body"></div>' +
    '<div id="fmchat-foot">' +
      '<input id="fmchat-input" type="text" placeholder="Digite sua mensagem..." autocomplete="off" />' +
      '<button id="fmchat-send" aria-label="Enviar"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button>' +
    '</div>';
  document.body.appendChild(panel);

  var body = panel.querySelector("#fmchat-body");
  var input = panel.querySelector("#fmchat-input");

  function addMsg(text, who) {
    var el = document.createElement("div");
    el.className = "fmchat-msg " + who;
    el.textContent = String(text);
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function addWaButton(text, label) {
    var el = document.createElement("div");
    el.className = "fmchat-msg sys";
    el.innerHTML = '<a class="fmchat-wabtn" target="_blank" rel="noopener" href="' + waLink(text) + '">' +
      (label || "Falar no WhatsApp") + "</a>";
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  var opened = false;
  btn.addEventListener("click", function () {
    panel.classList.toggle("open");
    invite.hidden = inviteDismissed || panel.classList.contains("open");
    if (!opened && panel.classList.contains("open")) {
      opened = true;
      addMsg(GREETING, "bot");
      if (!API_BASE && WA_NUMBER) {
        addWaButton(WA_PREFILL, "Prefiro falar no WhatsApp");
      }
      input.focus();
    }
  });
  panel.querySelector("#fmchat-close").addEventListener("click", function () {
    panel.classList.remove("open");
    invite.hidden = inviteDismissed;
  });

  function showTyping() {
    var t = document.createElement("div");
    t.className = "fmchat-typing";
    t.id = "fmchat-typing-now";
    t.textContent = PRODUCT + " está digitando...";
    body.appendChild(t);
    body.scrollTop = body.scrollHeight;
  }
  function hideTyping() {
    var t = document.getElementById("fmchat-typing-now");
    if (t) t.remove();
  }

  // FAQ pública de contingência; não substitui a base central do AtendeVendeIA.
  // Fontes: páginas oficiais da FM Tecnologia IA, revisão 2026-11-18.
  var FM_PUBLIC_FAQ = [["empresa","A FM Tecnologia IA desenvolve software, automação e soluções de inteligência artificial para empresas. O foco é organizar operações, conectar dados e apoiar decisões com governança e controle humano. Conheça a empresa: https://fmtecnologiaia.com.br/empresa",["o que a fm tecnologia faz","o que e a fm tecnologia","quem e a fm tecnologia","sobre a fm tecnologia","o que a fm faz","sobre a empresa","quem somos"]],["produtos","Os produtos principais apresentados pela FM Tecnologia IA são Kordena (alimentação), Iron Fit Core (academias), NFCore (fiscal), FM Command (gestão executiva) e AtendeVendeIA (atendimento e vendas). CampaIA e ERP Core estão em desenvolvimento; Super Core Extreme é P&D, não está à venda. Veja: https://fmtecnologiaia.com.br/produtos",["quais os produtos","quais sao os produtos","produtos da fm","solucoes da fm","o que voces vendem","portfolio","catalogo de produtos"]],["kordena","O Kordena é a plataforma de gestão para restaurantes e outros negócios de alimentação. Reúne pedidos, salão, cozinha/KDS, estoque, clientes, financeiro e Gerente IA Core. O site informa lançamento em preparação e teste grátis de 15 dias quando liberado: https://kordenaia.com.br/",["kordena","restaurante","lanchonete","delivery","food service","gestao de alimentacao"]],["iron","O Iron Fit Core é voltado à gestão de academias e operações fitness: alunos, treinos, avaliações, agenda, acessos, equipamentos e financeiro. A Iron Intelligence apoia o profissional, que aprova as decisões relacionadas aos treinos. Veja as condições vigentes de teste no site: https://fmtecnologiaia.com.br/produtos/iron-fit",["iron fit","ironfit","academia","fitness","estudio de treino","gestao de alunos"]],["nfcore","O NFCore é uma plataforma fiscal B2B com motor próprio para NF-e, NFC-e e NFS-e, regras versionadas, assinatura, eventos e auditoria. Integrações e emissão dependem de credenciais, configuração e homologação aplicáveis; cobertura não é universal. Saiba mais: https://nfcore.com.br/",["nfcore","nota fiscal","emitir nota","nf-e","nfc-e","nfs-e","emissao fiscal","reforma tributaria"]],["command","O FM Command é uma central executiva em preparação que consolida indicadores dos produtos e da operação, preservando origem, período, qualidade e governança de cada informação. Não inventa métricas ausentes. Saiba mais: https://fmtecnologiaia.com.br/produtos/command",["fm command","command","painel executivo","dashboard gerencial","indicadores de empresa"]],["atende","O AtendeVendeIA é uma solução de atendimento e vendas por IA: conversa com clientes, apresenta ofertas e links de pagamento cadastrados e ajuda a retomar vendas interrompidas. A equipe mantém controle sobre negociações e casos sensíveis. A disponibilidade comercial deve ser confirmada: https://fmtecnologiaia.com.br/produtos/atendevendeia",["atendevendeia","atende vende","atendimento com ia","atendente de vendas","recuperar vendas","vender pelo whatsapp","whatsapp para vendas"]],["campa","O CampaIA está em desenvolvimento. A proposta é apoiar campanhas de marketing com briefing, estratégia, textos, imagens e revisão de políticas, mantendo a aprovação humana antes da publicação. Consulte disponibilidade: https://fmtecnologiaia.com.br/produtos/campaia",["campaia","campanhas de marketing","marketing digital","anuncios com ia","google ads"]],["erp","O ERP Core ainda está em desenvolvimento. Seu primeiro módulo planejado é estoque por lote e validade, com saída dos itens que vencem primeiro (FEFO). Não é anunciado como ERP completo disponível. Saiba mais: https://fmtecnologiaia.com.br/produtos/erp-core",["erp core","estoque por lote","controle de validade","fefo"]],["supercore","O Super Core Extreme é uma iniciativa de pesquisa e desenvolvimento da FM Tecnologia IA para uma arquitetura cognitiva horizontal, multiagente, multimodelo e governada por humanos. Não é um produto comercial disponível: https://fmtecnologiaia.com.br/produtos/super-core-extreme",["super core","supercore","cerebro cognitivo","multiagente","multimodelo"]],["ia","A FM integra IA a software, dados e regras de negócio. A inteligência ajuda a interpretar informações e recomendar ações, enquanto decisões críticas permanecem sob controle humano e validações determinísticas. Veja: https://fmtecnologiaia.com.br/empresa",["como funciona a ia","inteligencia artificial da fm","core cognitivo","automacao inteligente","a ia decide sozinha"]],["governanca","A FM adota a diretriz 'A IA recomenda; você decide'. Os produtos são desenhados com controle de acesso, rastreabilidade e validações adequadas ao risco. Não afirmamos certificações externas ou homologações sem comprovação: https://fmtecnologiaia.com.br/seguranca",["governanca","seguranca","privacidade","lgpd","auditoria","dados protegidos"]],["planos","Os preços e as condições comerciais variam conforme o produto e podem mudar. Para valores oficiais atualizados, consulte https://fmtecnologiaia.com.br/precos ou a página do produto; a equipe comercial pode confirmar elegibilidade, disponibilidade e contratação.",["quanto custa","qual o preco","precos","valores","planos","mensalidade","assinatura","orcamento"]],["teste","As condições de teste dependem de cada produto e da sua liberação comercial. Os sites anunciam teste de 15 dias para o Kordena após ativação, 30 dias conforme política do Iron Fit Core e 14 dias para o NFCore. Confirme a disponibilidade antes de contratar: https://fmtecnologiaia.com.br/precos",["teste gratis","periodo gratis","experimentar","avaliar produto","trial","sem cartao"]],["contratar","Para contratar ou solicitar demonstração, consulte os canais oficiais em https://fmtecnologiaia.com.br/contato. Nossa equipe verifica o produto, o estágio de disponibilidade e a necessidade do seu negócio.",["como contratar","quero contratar","fazer assinatura","assinar","solicitar demonstracao","agendar demonstracao"]],["contato","Contato comercial da FM Tecnologia IA: WhatsApp (11) 97835-0851 e e-mail comercial@fmtecnologiaia.com.br. Página oficial: https://fmtecnologiaia.com.br/contato",["telefone","whatsapp da fm","email","e-mail","contato da fm","falar com atendente","falar com especialista","falar com humano","suporte humano"]],["segmentos","A FM atende diferentes necessidades empresariais: alimentação e restaurantes com Kordena, academias com Iron Fit Core, operações fiscais com NFCore, gestão executiva com FM Command e atendimento/vendas com AtendeVendeIA. Cada produto tem escopo e disponibilidade próprios.",["para quem sao os produtos","quais segmentos","setores atendidos","tipo de empresa","quais negocios"]],["integracoes","As integrações variam de acordo com cada SaaS e com sua configuração. O Kordena apresenta canais de pedidos e delivery; o NFCore prevê integração com sistemas e provedores fiscais; o FM Command conecta fontes de dados governadas. Confirme cada conector e sua disponibilidade com a equipe.",["integracoes","integra com","api","webhook","conectar sistemas"]],["financeiro","Para rotinas financeiras do restaurante, conheça o Kordena. Para faturamento e cobrança da academia, veja Iron Fit Core. Para consolidação executiva de indicadores, conheça FM Command. São produtos diferentes; a disponibilidade deve ser verificada por solução.",["financeiro","faturamento","cobranca","recebimentos","contabilidade"]],["pessoal","Sou o atendimento digital da FM Tecnologia IA. Posso explicar a empresa, seus produtos, públicos atendidos e canais oficiais. Para propostas comerciais, informações específicas não publicadas ou suporte individual, posso direcionar à equipe.",["voce e humano","voce e uma ia","quem esta falando","voce e robo","quem e voce"]]];
  function publicFaqAnswer(question) {
    if (SITE !== "fm") return null;
    var normalized = String(question || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
    for (var i = 0; i < FM_PUBLIC_FAQ.length; i++) {
      var triggers = FM_PUBLIC_FAQ[i][2];
      for (var j = 0; j < triggers.length; j++) {
        if (normalized.indexOf(triggers[j]) !== -1) return FM_PUBLIC_FAQ[i][1];
      }
    }
    return null;
  }

  function sendMessage() {
    var text = input.value.trim();
    if (!text) return;
    addMsg(text, "user");
    input.value = "";

    if (!API_BASE) {
      // Modo degradado: sem backend configurado ainda — oferece WhatsApp real, nunca finge automação.
      var offlineAnswer = publicFaqAnswer(text);
      if (offlineAnswer) {
        addMsg("Informação pública da FM Tecnologia IA (modo de contingência): " + offlineAnswer, "bot");
      } else {
        addMsg("O atendimento automatizado está indisponível agora. Nossa equipe pode ajudar:", "bot");
        addWaButton(text);
      }
      return;
    }

    showTyping();
    fetch(API_BASE + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: SITE, message: text, session_id: getSessionId() })
    })
      .then(function (r) {
        if (!r.ok) throw new Error("status " + r.status);
        return r.json();
      })
      .then(function (data) {
        hideTyping();
        if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("missing chat reply");
        addMsg(data.reply, "bot");
        // O servidor da FM ainda pode fornecer catálogo incompleto (confirmado em teste real).
        // Complemento estritamente baseado na página oficial, sem modificar outros tenants.
        if (SITE === "fm" && /(?:quais|lista|mostre|todos|portfolio|portfólio).*produtos|produtos.*(?:fm|tecnologia)/i.test(text) && !/FM Command/i.test(data.reply)) {
          addMsg("Complemento do catálogo oficial: além de Kordena, Iron Fit Core, NFCore e AtendeVendeIA, a FM apresenta o FM Command (central executiva, lançamento em preparação), CampaIA e ERP Core (em desenvolvimento), e Super Core Extreme (pesquisa e desenvolvimento, não comercializado). Detalhes: https://fmtecnologiaia.com.br/produtos", "bot");
        }
        if (data.handoff) {
          addWaButton(data.handoff_message || text, "Continuar no WhatsApp com um atendente");
        }
      })
      .catch(function () {
        hideTyping();
        var offlineAnswer = publicFaqAnswer(text);
        if (offlineAnswer) {
          addMsg("Informação pública da FM Tecnologia IA (modo de contingência): " + offlineAnswer, "bot");
        } else {
          addMsg("O atendimento automatizado está temporariamente indisponível. Pode falar com nossa equipe:", "bot");
          addWaButton(text);
        }
      });
  }

  panel.querySelector("#fmchat-send").addEventListener("click", sendMessage);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });
})();
