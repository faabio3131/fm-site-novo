import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../assets/fm-chat-widget.js', import.meta.url), 'utf8');

function setup(site = 'fm', fail = true) {
  const elements = new Map();
  class Node {
    constructor(tag = 'div') {
      this.tagName = tag;
      this.children = [];
      this.handlers = {};
      this.hidden = false;
      this.value = '';
      this.className = '';
      this.classList = {
        open: false,
        toggle: name => { if (name === 'open') this.classList.open = !this.classList.open; },
        contains: name => name === 'open' && this.classList.open,
        remove: name => { if (name === 'open') this.classList.open = false; }
      };
    }
    appendChild(child) { this.children.push(child); if (child.id) elements.set(child.id, child); return child; }
    setAttribute() {}
    addEventListener(name, handler) { this.handlers[name] = handler; }
    querySelector(sel) {
      if (!this.queries) this.queries = new Map();
      if (!this.queries.has(sel)) this.queries.set(sel, new Node(sel));
      return this.queries.get(sel);
    }
    focus() {}
    remove() { this.removed = true; }
    click() { this.handlers.click?.(); }
  }
  const body = new Node('body');
  const document = {head: new Node('head'), body, createElement: tag => new Node(tag), getElementById: id => elements.get(id) || null};
  const store = new Map();
  const window = {
    FM_CHAT_CONFIG: {site, productName: 'FM Tecnologia IA', apiBase: 'https://example.invalid/web', whatsappNumber: '5511978350851'},
    localStorage: {getItem: key => store.get(key), setItem: (key, value) => store.set(key,value)},
    sessionStorage: {getItem: key => store.get(key), setItem: (key, value) => store.set(key,value)}
  };
  const calls = [];
  const fetch = async (url, options) => {
    calls.push({url, options});
    if (fail) throw Error('Connection unavailable');
    return {ok:true, json: async () => ({reply:'Resposta do servidor'})};
  };
  vm.runInNewContext(source, {window,document,fetch,Date,Math,encodeURIComponent,console}, {timeout:2000});
  const panel = elements.get('fmchat-panel');
  const chatBody = panel.querySelector('#fmchat-body');
  const input = panel.querySelector('#fmchat-input');
  const send = panel.querySelector('#fmchat-send');
  const button = elements.get('fmchat-btn');
  async function ask(question) {
    button.click();
    input.value = question;
    send.click();
    await new Promise(resolve => setImmediate(resolve));
    await new Promise(resolve => setImmediate(resolve));
    return chatBody.children.filter(x => x.className?.startsWith('fmchat-msg')).map(x => x.textContent || '');
  }
  return {ask,calls};
}

test('FM: responde sobre a empresa quando backend falha', async () => {
  const result = await setup().ask('Bom dia, o que a FM Tecnologia faz?');
  assert.ok(result.some(m => m.includes('desenvolve software')));
  assert.ok(result.some(m => m.includes('modo de contingência')));
});
test('FM: responde à pergunta do print sobre os produtos', async () => {
  const result = await setup().ask('Quais os produtos da FM?');
  assert.ok(result.some(m => m.includes('Kordena') && m.includes('NFCore') && m.includes('AtendeVendeIA')));
});
test('FM: não confunde P&D com produto comercializado', async () => {
  const result = await setup().ask('O Super Core Extreme está disponível?');
  assert.ok(result.some(m => m.toLowerCase().includes('não é um produto comercial disponível')));
});
test('FM: pergunta desconhecida faz handoff sem inventar resposta', async () => {
  const result = await setup().ask('Qual o número da minha fatura?');
  assert.ok(result.some(m => m.includes('temporariamente indisponível')));
  assert.equal(result.some(m => m.includes('modo de contingência')), false);
});
test('outro tenant não recebe conhecimento institucional da FM', async () => {
  const result = await setup('kordena').ask('Quais os produtos da FM?');
  assert.equal(result.some(m => m.includes('modo de contingência')), false);
});
test('resposta válida do backend tem precedência sobre o FAQ', async () => {
  const result = await setup('fm', false).ask('Quais os produtos da FM?');
  assert.ok(result.includes('Resposta do servidor'));
  assert.equal(result.some(m => m.includes('modo de contingência')), false);
});
test('entrada do usuário é texto e não HTML interpretado', async () => {
  const result = await setup().ask('<img src=x onerror=alert(1)>');
  assert.ok(result.includes('<img src=x onerror=alert(1)>'));
});


test('FM: complementa resposta incompleta da IA com portfólio oficial', async () => {
  const messages = await setup('fm', false).ask('Quais os produtos da FM?');
  assert.ok(messages.some(m => m.includes('FM Command') && m.includes('CampaIA') && m.includes('ERP Core')));
  assert.ok(messages.some(m => m.includes('Super Core Extreme') && m.includes('não comercializado')));
});
test('FM: www redireciona ao domínio autorizado pela API antes de iniciar widget', () => {
  let redirected = '';
  const window = {
    FM_CHAT_CONFIG: {site:'fm'},
    location: {hostname:'www.fmtecnologiaia.com.br',pathname:'/produtos',search:'?x=1',hash:'#chat',replace: v=>{redirected=v;}}
  };
  const document = {head:{appendChild:()=>{throw Error('Widget should not mount on blocked origin');}}};
  vm.runInNewContext(source,{window,document,console},{timeout:2000});
  assert.equal(redirected,'https://fmtecnologiaia.com.br/produtos?x=1#chat');
});
