import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SITE } from '../src/config.mjs';
import { privacidade, termos } from '../src/legal.mjs';

const fakeCnpj = /\bCNPJ\s+(?:sob\s+o\s+n[º°]\s+)?null\b/i;
const noHref = (path) => path;

test('legal content does not publish CNPJ null without verified legal registration', () => {
  for (const document of [privacidade(SITE, noHref), termos(SITE, noHref)]) {
    const text = JSON.stringify(document);
    assert.doesNotMatch(text, fakeCnpj);
  }
  for (const file of ['privacidade.html', 'termos.html']) {
    const html = readFileSync(new URL('../docs/' + file, import.meta.url), 'utf8');
    assert.doesNotMatch(html, fakeCnpj, 'Invalid CNPJ placeholder in ' + file);
  }
});

test('verified legal registration is rendered when a valid CNPJ is configured', () => {
  const site = { ...SITE, legalName: 'Empresa de Exemplo LTDA', cnpj: '12.345.678/0001-99' };
  for (const document of [privacidade(site, noHref), termos(site, noHref)]) {
    assert.match(JSON.stringify(document), /CNPJ[\s\S]*12\.345\.678\/0001-99/);
  }
});
