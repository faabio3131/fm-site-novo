import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/config.mjs';

const docs = fileURLToPath(new URL('../docs/', import.meta.url));
const corporateEmail = 'comercial@fmtecnologiaia.com.br';
const previousEmail = 'fmtecnologia.comercial@gmail.com';

function* htmlFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.html')) yield fullPath;
  }
}

test('o contato institucional usa o e-mail corporativo', () => {
  assert.equal(SITE.email, corporateEmail);
});

test('todos os rodapés publicados exibem o e-mail corporativo e não o Gmail anterior', () => {
  const pages = [...htmlFiles(docs)];
  assert.ok(pages.length >= 23, 'as páginas do site e dos produtos devem ser verificadas');
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    const start = html.indexOf('<footer class="foot">');
    const end = html.indexOf('</footer>', start);
    assert.ok(start !== -1 && end > start, `Rodapé ausente: ${file}`);
    const footer = html.slice(start, end);
    assert.ok(footer.includes(`href="mailto:${corporateEmail}"`), `E-mail corporativo ausente do rodapé: ${file}`);
    assert.ok(!html.includes(previousEmail), `O e-mail anterior ainda consta em: ${file}`);
  }
});
