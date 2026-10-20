import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const landing = readFileSync('docs/nfcore-trial.html', 'utf8');
const product = readFileSync('docs/produtos/nfcore.html', 'utf8');

test('NFCore trial page uses only published canonical offers', () => {
  assert.match(landing, /\/v1\/public\/trial-plans/);
  assert.match(landing, /\/v1\/public\/trials/);
  assert.match(landing, /Idempotency-Key/);
  assert.match(landing, /credentials: 'omit'/);
  assert.doesNotMatch(landing, /X-NFCore-Signature/);
  assert.doesNotMatch(landing, /HMAC_SECRET|nfcore-trial-[a-f0-9]+/i);
});

test('NFCore product links to trial without dropping prior contact option', () => {
  assert.match(product, /href="\.\.\/nfcore-trial"/);
  assert.match(product, /wa\.me\/5511978350851/);
  assert.match(landing, /cadastro autom[aá]tico de trial ainda n[aã]o est[aá] dispon[ií]vel/i);
});
