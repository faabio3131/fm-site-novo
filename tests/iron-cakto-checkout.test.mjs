import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const build = (overrides = {}) => {
  const out = mkdtempSync(join(tmpdir(), 'iron-cakto-site-'));
  const env = { ...process.env, OUT: out, FM_IRON_CAKTO_MONTHLY_URL: '', FM_IRON_CAKTO_YEARLY_URL: '', ...overrides };
  const run = spawnSync(process.execPath, ['src/build.mjs'], { cwd: process.cwd(), env, encoding: 'utf8', timeout: 15_000 });
  const html = run.status === 0 ? readFileSync(join(out, 'produtos', 'iron-fit.html'), 'utf8') : '';
  rmSync(out, { recursive: true, force: true });
  return { run, html };
};

test('without seller checkout links the Iron site never offers fake Cakto purchase buttons', () => {
  const { run, html } = build();
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(html, /Contratar mensal na Cakto|Contratar anual na Cakto/);
});

test('valid official checkout links appear in monthly and annual cards', () => {
  const { run, html } = build({
    FM_IRON_CAKTO_MONTHLY_URL: 'https://pay.cakto.com.br/offer_month',
    FM_IRON_CAKTO_YEARLY_URL: 'https://pay.cakto.com.br/offer_year',
  });
  assert.equal(run.status, 0, run.stderr);
  assert.match(html, /href="https:\/\/pay.cakto.com.br\/offer_month"[^>]*>Contratar mensal na Cakto/);
  assert.match(html, /href="https:\/\/pay.cakto.com.br\/offer_year"[^>]*>Contratar anual na Cakto/);
  assert.match(html, /A liberação do acesso depende da confirmação da compra/);
});

test('rejects injected or third-party checkout URLs', () => {
  for (const candidate of [
    'http://pay.cakto.com.br/notsecure',
    'https://pay.cakto.com.br.evil.example/offer',
    'https://evil.example/payment',
    'https://pay.cakto.com.br/offer?callback=forged',
    'javascript:alert(1)',
  ]) {
    const { run } = build({ FM_IRON_CAKTO_MONTHLY_URL: candidate });
    assert.notEqual(run.status, 0, candidate);
  }
});
