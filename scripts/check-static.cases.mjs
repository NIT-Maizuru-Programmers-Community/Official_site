import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { checkStatic, pages } from './check-static.mjs';

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'site-export-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const page of pages) {
    const path = join(directory, page);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, '<!doctype html><html lang="ja"></html>');
  }
  return directory;
}

test('accepts a complete export', (t) => {
  assert.deepEqual(checkStatic(fixture(t)), []);
});
test('rejects a missing 404 and an empty route', (t) => {
  const directory = fixture(t);
  rmSync(join(directory, '404.html'));
  writeFileSync(join(directory, 'works/index.html'), '');
  assert.deepEqual(checkStatic(directory), ['works/index.html', '404.html']);
});
test('rejects a directory in place of HTML', (t) => {
  const directory = fixture(t);
  rmSync(join(directory, 'index.html'));
  mkdirSync(join(directory, 'index.html'));
  assert.deepEqual(checkStatic(directory), ['index.html']);
});
