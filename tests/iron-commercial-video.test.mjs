import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { VIDEOS } from '../src/videos.mjs';

const url = 'https://gcdn.picsart.com/picsart-mcp/21969df7-c943-496a-a359-b209b01b101d.mp4';
const html = await readFile('docs/produtos/iron-fit.html', 'utf8');
const kordena = await readFile('docs/produtos/kordena.html', 'utf8');
const generator = await readFile('src/build.mjs', 'utf8');

test('IRON official marketing video is configured and rendered in the canonical FM product page', () => {
  assert.equal(VIDEOS['iron-fit'].main.src, url);
  assert.match(VIDEOS['iron-fit'].main.poster, /^https:\/\//);
  assert.match(html, /<section class="sec dark" id="demo">/);
  assert.ok(html.includes(`<source src="${url}" type="video/mp4">`));
  assert.match(html, /<video controls preload="none" playsinline poster=/);
  assert.doesNotMatch(html.slice(html.indexOf('id="demo"'), html.indexOf('id="visao"')), /Vídeo em preparação/);
  assert.doesNotMatch(html.slice(html.indexOf('id="demo"'), html.indexOf('id="visao"')), /autoplay/);
});

test('existing Kordena demos remain local and unchanged', () => {
  assert.match(kordena, /src="\.\.\/assets\/video\/kordena\/demo.mp4"/);
  assert.doesNotMatch(kordena, /gcdn\.picsart\.com/);
  assert.ok(generator.includes("const source = custom?.src || (has(f)"));
});
