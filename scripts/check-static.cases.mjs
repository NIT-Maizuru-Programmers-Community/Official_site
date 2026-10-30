import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { checkStatic, requiredPages } from './check-static.mjs';

const testSlugs = { workSlugs: ['fixture-work'], newsSlugs: ['fixture-news'] };

function fixture(t, slugs = testSlugs) {
  const directory = mkdtempSync(join(tmpdir(), 'site-export-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const page of requiredPages(slugs)) {
    const path = join(directory, page);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, '<!doctype html><html lang="ja"></html>');
  }
  return directory;
}

test('accepts a complete export', (t) => {
  assert.deepEqual(checkStatic(fixture(t), testSlugs), []);
});
test('rejects a missing 404 and an empty route', (t) => {
  const directory = fixture(t);
  rmSync(join(directory, '404.html'));
  writeFileSync(join(directory, 'works/index.html'), '');
  assert.deepEqual(checkStatic(directory, testSlugs), [
    'works/index.html',
    '404.html',
  ]);
});
test('rejects a directory in place of HTML', (t) => {
  const directory = fixture(t);
  rmSync(join(directory, 'index.html'));
  mkdirSync(join(directory, 'index.html'));
  assert.deepEqual(checkStatic(directory, testSlugs), ['index.html']);
});
test('checks generated article routes', (t) => {
  const directory = fixture(t);
  mkdirSync(join(directory, 'results/procon-37-2026'), { recursive: true });
  writeFileSync(
    join(directory, 'results/procon-37-2026/index.html'),
    '<!doctype html><html lang="ja"></html>',
  );
  assert.deepEqual(checkStatic(directory, testSlugs), []);
  rmSync(join(directory, 'results/procon-37-2026/index.html'));
  assert.deepEqual(checkStatic(directory, testSlugs), [
    'results/procon-37-2026/index.html',
  ]);
});
test('checks generated work detail routes', (t) => {
  const directory = fixture(t);
  mkdirSync(join(directory, 'works/example'), { recursive: true });
  assert.deepEqual(checkStatic(directory, testSlugs), [
    'works/example/index.html',
  ]);
  writeFileSync(join(directory, 'works/example/index.html'), '<!doctype html>');
  assert.deepEqual(checkStatic(directory, testSlugs), []);
});
test('rejects a missing published work directory', (t) => {
  const directory = fixture(t);
  rmSync(join(directory, 'works/fixture-work'), { recursive: true });
  assert.deepEqual(checkStatic(directory, testSlugs), [
    'works/fixture-work/index.html',
  ]);
});
test('rejects a missing published news directory', (t) => {
  const directory = fixture(t);
  rmSync(join(directory, 'news/fixture-news'), { recursive: true });
  assert.deepEqual(checkStatic(directory, testSlugs), [
    'news/fixture-news/index.html',
  ]);
});
test('accepts an export with no published news or works', (t) => {
  const slugs = { workSlugs: [], newsSlugs: [] };
  assert.deepEqual(checkStatic(fixture(t, slugs), slugs), []);
});
