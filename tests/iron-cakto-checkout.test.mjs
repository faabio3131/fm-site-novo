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

test('IRON public site leads to canonical academy registration and offers the approved, activated Cakto checkout per tier', () => {
  const { run, html } = build();
  assert.equal(run.status, 0, run.stderr);
  assert.match(html, /https:\/\/app\.ironfitcore\.com\.br\/\?iniciar-teste=1/);
  assert.match(html, /Da inscrição à academia funcionando/);
  assert.doesNotMatch(html, /A liberação comercial está em preparação/);
  // The 4 approved tiers each link straight to their own activated Cakto checkout (mensal + anual).
  const expected = [
    'https://pay.cakto.com.br/36z8cxp_1304464', 'https://pay.cakto.com.br/9niteun_1304558', // Start
    'https://pay.cakto.com.br/37ggkoi_1304607', 'https://pay.cakto.com.br/mag8sf7_1304872', // Growth
    'https://pay.cakto.com.br/3fv8xj2_1304910', 'https://pay.cakto.com.br/zudbm7w_1304943', // Scale
    'https://pay.cakto.com.br/vma722f_1304965', 'https://pay.cakto.com.br/a2mk92n_1304974', // Enterprise
  ];
  for (const url of expected) assert.match(html, new RegExp(`href="${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
});

test('unrelated/unapproved Cakto URLs never leak into the IRON pricing page, even when injected into static build env', () => {
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
