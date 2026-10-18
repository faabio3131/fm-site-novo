import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { CALENDARIO } from '../src/reforma.mjs';

const read = (file) => readFile(new URL(file, import.meta.url), 'utf8');

test('NFCore landing uses the approved compact dates without truncating the full guide', async () => {
  const landing = await read('../docs/produtos/nfcore.html');
  const guide = await read('../docs/reforma-tributaria.html');
  const spotlight = landing.match(/<div class="spot-cal"[^>]*>[\s\S]*?<\/small>/)?.[0];
  assert.ok(spotlight, 'calendar block must be present');
  assert.equal(CALENDARIO.length, 4);
  for (const [date, full, short] of CALENDARIO) {
    assert.ok(short, `Missing compact description for ${date}`);
    assert.ok(spotlight.includes(date), `Missing date ${date}`);
    assert.ok(spotlight.includes(short), `Missing short copy for ${date}`);
    assert.ok(!spotlight.includes(full), `Detailed guide copy leaked into landing: ${date}`);
    assert.ok(guide.includes(full), `The full guide lost its original context: ${date}`);
  }
  assert.match(spotlight, /Fonte: atos oficiais citados no guia/);
});

test('NFCore retains the full-guide, radar and materials links', async () => {
  const landing = await read('../docs/produtos/nfcore.html');
  assert.match(landing, /href="\.\.\/reforma-tributaria">Ver o guia completo<\/a>/);
  assert.match(landing, /href="\.\.\/reforma-tributaria\/radar">Radar de mudanças<\/a>/);
  assert.match(landing, /href="\.\.\/reforma-tributaria\/materiais">Checklist e materiais para baixar/);
});

test('Spotlight typography remains compact and responsive', async () => {
  const css = await read('../docs/assets/site.css');
  const html = await read('../docs/produtos/nfcore.html');
  assert.match(css, /html\[data-p=nfcore\] \.spot-top\s*\{[\s\S]*?grid-template-columns:/);
  assert.match(css, /html\[data-p=nfcore\] \.spot-cal li span\s*\{[^}]*font-size: 14px/);
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /html\[data-p=nfcore\] \.spot-cal li span\s*\{ font-size: 13px; \}/);
  assert.match(html, /href="\.\.\/assets\/site\.css\?v=[a-f0-9]{8}"/);
});
