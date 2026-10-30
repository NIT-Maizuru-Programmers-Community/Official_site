import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { News } from '@/types/content';

export function readNewsBody(item: News, root = process.cwd()): string {
  if (item.body !== undefined) return item.body;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) {
    throw new Error(`Invalid news slug: ${item.slug}`);
  }
  return readFileSync(
    join(root, 'src/content/news', `${item.slug}.md`),
    'utf8',
  );
}
