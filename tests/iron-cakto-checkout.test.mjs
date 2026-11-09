import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function build(overrides = {}) {
  const output = mkdtempSync(join(tmpdir(), 'iron-cakto-site-'));
  try {
    const run = spawnSync(process.execPath, ['src/build.mjs'], {
      cwd: process.cwd(),
      env: { ...process.env, OUT: output, ...overrides },
      encoding: 'utf8', timeout: 15_000,
    });
    const html = run.status === 0
      ? readFileSync(join(output, 'produtos', 'iron-fit.html'), 'utf8') : '';
    return { run, html };
  } finally { rmSync(output, { recursive: true, force: true }); }
}

test('IRON public site leads to canonical academy registration and offers checkout only after billing identity', () => {
  const { run, html } = build();
  assert.equal(run.status, 0, run.stderr);
  assert.match(html, /https:\/\/app\.ironfitcore\.com\.br\//);
  assert.match(html, /Escolher plano mensal no IRON/);
  assert.match(html, /Escolher plano anual no IRON/);
  assert.match(html, /checkout oficial Cakto será vinculado à fatura da sua academia/);
  assert.doesNotMatch(html, /href="https:\/\/pay\.cakto\.com\.br/);
});

test('unbound Cakto URLs never become public checkout CTAs, even when injected into static build env', () => {
  const { run, html } = build({
    FM_IRON_CAKTO_MONTHLY_URL: 'https://pay.cakto.com.br/unsafe-monthly',
    FM_IRON_CAKTO_YEARLY_URL: 'https://pay.cakto.com.br/unsafe-annual',
  });
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(html, /unsafe-monthly|unsafe-annual/);
  assert.match(html, /https:\/\/app\.ironfitcore\.com\.br\//);
});

test('the FM site never advertises an invented CNPJ while FM legal registration is pending', () => {
  const { run, html } = build();
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(html, /07\.109\.248\/0001-57|FM Tecnologia LTDA/);
});
