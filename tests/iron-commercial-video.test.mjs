import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { VIDEOS } from '../src/videos.mjs';

const html = await readFile('docs/produtos/iron-fit.html', 'utf8');
const kordena = await readFile('docs/produtos/kordena.html', 'utf8');
const generator = await readFile('src/build.mjs', 'utf8');

// O vídeo oficial do IRON passou a ser hospedado localmente (padrão já usado
// pelo Kordena), igual aos demais produtos: assets/video/<slug>/demo.{mp4,jpg}.
// A hospedagem externa no Picsart foi abandonada (vídeo corrigido em 2026-11-18:
// removida a repetição do bloco financeiro e adicionado o bloco de controle de acesso).
test('IRON official marketing video is configured and rendered in the canonical FM product page', () => {
  assert.equal(VIDEOS['iron-fit'].main.file, 'demo');
  assert.equal(VIDEOS['iron-fit'].main.src, undefined);
  assert.ok(existsSync('assets/video/iron-fit/demo.mp4'));
  assert.ok(existsSync('assets/video/iron-fit/demo.jpg'));
  assert.match(html, /<section class="sec dark" id="demo">/);
  assert.ok(html.includes('<source src="../assets/video/iron-fit/demo.mp4" type="video/mp4">'));
  assert.match(html, /<video controls preload="none" playsinline poster=/);
  assert.doesNotMatch(html, /gcdn\.picsart\.com/);
  assert.doesNotMatch(html.slice(html.indexOf('id="demo"'), html.indexOf('id="visao"')), /Vídeo em preparação/);
  assert.doesNotMatch(html.slice(html.indexOf('id="demo"'), html.indexOf('id="visao"')), /autoplay/);
});

test('existing Kordena demos remain local and unchanged', () => {
  assert.match(kordena, /src="\.\.\/assets\/video\/kordena\/demo.mp4"/);
  assert.doesNotMatch(kordena, /gcdn\.picsart\.com/);
  assert.ok(generator.includes("const source = custom?.src || (has(f)"));
});
