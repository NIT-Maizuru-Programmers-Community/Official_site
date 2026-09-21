import { readFile, writeFile, rename } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { convert, marker, render, hasLine } from './markdown.mjs';
import { createClient } from './client.mjs';
const root = fileURLToPath(new URL('../../', import.meta.url));
const configFile = path.join(root, 'scripts/notion/config.json');
const normalize = (id) => id?.replaceAll('-', '').toLowerCase();
const uuid = (id) =>
  typeof id === 'string' && /^[a-f\d]{32}$/i.test(normalize(id));
export function validate(config, requireIds = false) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(config.repository))
    throw new Error('Invalid repository');
  const ids = new Set(),
    paths = new Set(),
    pages = new Set();
  if (!Array.isArray(config.documents) || !config.documents.length)
    throw new Error('No documents');
  for (const d of config.documents) {
    if (!/^[a-z0-9-]+$/.test(d.id) || ids.has(d.id))
      throw new Error('Invalid or duplicate document id');
    if (
      !/^(?:README\.md|CONTRIBUTING\.md|docs\/[a-z0-9-]+\.md)$/.test(d.path) ||
      paths.has(d.path)
    )
      throw new Error('Invalid or duplicate document path');
    if (
      (requireIds && !d.pageId) ||
      (d.pageId && (!uuid(d.pageId) || pages.has(normalize(d.pageId))))
    )
      throw new Error(`Missing, invalid or duplicate pageId: ${d.id}`);
    ids.add(d.id);
    paths.add(d.path);
    if (d.pageId) pages.add(normalize(d.pageId));
  }
}
export async function preflight(config, parentId, request) {
  validate(config, true);
  if (!uuid(parentId))
    throw new Error('NOTION_PARENT_PAGE_ID must be a page UUID');
  const result = [];
  for (const d of config.documents) {
    const page = await request('GET', `pages/${d.pageId}`);
    if (
      page.archived ||
      page.in_trash ||
      normalize(page.parent?.page_id) !== normalize(parentId)
    )
      throw new Error(`Wrong parent or archived page: ${d.id}`);
    const current = await request('GET', `pages/${d.pageId}/markdown`);
    if (
      current.truncated ||
      current.unknown_block_ids?.length ||
      !hasLine(current.markdown, marker(config.repository, d.id))
    )
      throw new Error(`Unmanaged or incomplete page: ${d.id}`);
    result.push({
      d,
      current: current.markdown,
      title: (page.properties?.title?.title ?? [])
        .map((t) => t.plain_text ?? t.text?.content ?? '')
        .join(''),
    });
  }
  return result;
}
export async function syncDocuments({
  config,
  sources,
  parentId,
  commit,
  request,
  log = console.log,
}) {
  // Validate and convert every source before any API writes.
  validate(config, true);
  const converted = new Map(
    config.documents.map((d) => [d.id, convert(sources[d.path], d, config)]),
  );
  const pages = await preflight(config, parentId, request);
  for (const { d, current, title } of pages) {
    const next = converted.get(d.id);
    if (
      hasLine(current, `source-sha256:${next.hash}`) &&
      title === next.title
    ) {
      log(`unchanged ${d.path}`);
      continue;
    }
    if (title !== next.title)
      await request('PATCH', `pages/${d.pageId}`, {
        properties: {
          title: {
            type: 'title',
            title: [{ type: 'text', text: { content: next.title } }],
          },
        },
      });
    await request('PATCH', `pages/${d.pageId}/markdown`, {
      type: 'replace_content',
      replace_content: { new_str: render(d, config, next, commit) },
    });
    log(`updated ${d.path}`);
  }
}
async function saveConfig(config) {
  await writeFile(`${configFile}.tmp`, JSON.stringify(config, null, 2) + '\n');
  await rename(`${configFile}.tmp`, configFile);
}
export async function setup(
  config,
  sources,
  parentId,
  request,
  persist = saveConfig,
  log = console.log,
) {
  validate(config);
  if (!uuid(parentId))
    throw new Error('NOTION_PARENT_PAGE_ID must be a page UUID');
  const converted = new Map(
    config.documents.map((d) => [d.id, convert(sources[d.path], d, config)]),
  );
  await request('GET', `pages/${parentId}`);
  const children = [];
  let cursor;
  do {
    const value = await request(
      'GET',
      `blocks/${parentId}/children?page_size=100${cursor ? `&start_cursor=${encodeURIComponent(cursor)}` : ''}`,
    );
    children.push(...value.results);
    cursor = value.has_more ? value.next_cursor : null;
  } while (cursor);
  const existing = [];
  for (const child of children.filter((c) => c.type === 'child_page')) {
    const value = await request('GET', `pages/${child.id}/markdown`);
    if (value.truncated || value.unknown_block_ids?.length)
      throw new Error(`Incomplete child page: ${child.id}`);
    existing.push({ id: child.id, markdown: value.markdown });
  }
  for (const d of config.documents) {
    if (d.pageId) continue;
    const key = marker(config.repository, d.id);
    const matches = existing.filter((page) => hasLine(page.markdown, key));
    if (matches.length > 1) throw new Error(`Duplicate managed pages: ${d.id}`);
    if (matches.length) d.pageId = matches[0].id;
    else {
      const page = await request('POST', 'pages', {
        parent: { page_id: parentId },
        properties: {
          title: {
            type: 'title',
            title: [
              { type: 'text', text: { content: converted.get(d.id).title } },
            ],
          },
        },
        markdown: `${key}\n\n初期設定済み。GitHubからの同期を待っています。`,
      });
      d.pageId = page.id;
    }
    await persist(config);
    log(`mapped ${d.id}: ${d.pageId}`);
  }
}
async function main() {
  const mode = process.argv[2] ?? '--dry-run';
  if (!['--dry-run', '--setup', '--sync', '--verify'].includes(mode))
    throw new Error('Use --dry-run, --setup, --sync or --verify');
  const config = JSON.parse(await readFile(configFile, 'utf8'));
  validate(config);
  const sources = Object.fromEntries(
    await Promise.all(
      config.documents.map(async (d) => [
        d.path,
        await readFile(path.join(root, d.path), 'utf8'),
      ]),
    ),
  );
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: root,
    encoding: 'utf8',
  }).trim();
  if (mode === '--dry-run') {
    for (const d of config.documents)
      console.log(
        `\n--- ${d.path} (${d.pageId ?? 'UNCONFIGURED: links use GitHub'}) ---\n${render(d, config, convert(sources[d.path], d, config), commit)}`,
      );
    return;
  }
  const request = createClient(process.env.NOTION_TOKEN),
    parentId = process.env.NOTION_PARENT_PAGE_ID;
  if (mode === '--setup') await setup(config, sources, parentId, request);
  else if (mode === '--verify') {
    await preflight(config, parentId, request);
    console.log(
      `Notion access verified: ${config.documents.length} managed pages (read-only)`,
    );
  } else await syncDocuments({ config, sources, parentId, commit, request });
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
