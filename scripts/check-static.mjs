import { statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const pages = [
  'index.html',
  'activities/index.html',
  'works/index.html',
  'news/index.html',
  'contact/index.html',
  'links/index.html',
  'privacy/index.html',
  '404.html',
];

export function checkStatic(directory) {
  const failures = [];
  for (const page of pages) {
    try {
      const info = statSync(resolve(directory, page));
      if (!info.isFile() || info.size === 0) failures.push(page);
    } catch {
      failures.push(page);
    }
  }
  return failures;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const failures = checkStatic(
    fileURLToPath(new URL('../out/', import.meta.url)),
  );
  if (failures.length) {
    console.error(`Static export missing or empty: ${failures.join(', ')}`);
    process.exitCode = 1;
  } else {
    console.log(`Static export OK: ${pages.length} pages`);
  }
}
