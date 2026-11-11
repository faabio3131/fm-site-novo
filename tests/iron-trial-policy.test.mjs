import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../src/products.mjs';

test('IRON public page follows the APPROVED commercial policy rather than an old offer', () => {
  const iron = PRODUCTS.find(p => p.slug === 'iron-fit');
  assert.ok(iron);
  assert.equal(iron.trial.days, 30);
  assert.match(iron.pricing.note, /30 dias/);
  assert.match(iron.pricing.note, /Start, Growth, Scale e Enterprise/);
  assert.doesNotMatch(iron.pricing.monthly, /R\$ 269/);
  assert.doesNotMatch(iron.pricing.yearly, /R\$ 2\.690/);
  assert.equal(iron.signupUrl, 'https://app.ironfitcore.com.br/?iniciar-teste=1');
  assert.ok(iron.sections.some(section => section.id === 'como-comecar' && /CNPJ/.test(section.items?.[1]?.[1] ?? '')));
  assert.ok(!iron.signupUrl.includes('pay.cakto.com.br'), 'a public static checkout has no canonical invoice');
});

test('the Kordena trial policy is not accidentally rewritten', () => {
  const kordena = PRODUCTS.find(p => p.slug === 'kordena');
  assert.equal(kordena?.trial.days, 15);
});
