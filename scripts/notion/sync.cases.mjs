import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { convert, marker, render } from './markdown.mjs';
import { createClient } from './client.mjs';
import { syncDocuments, validate, setup, preflight } from './sync.mjs';
const parentId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const config = {
  repository: 'example/site',
  documents: [
    {
      id: 'guide',
      path: 'docs/guide.md',
      pageId: '11111111-1111-1111-1111-111111111111',
    },
    {
      id: 'other',
      path: 'docs/other.md',
      pageId: '22222222-2222-2222-2222-222222222222',
    },
  ],
};
const sources = {
  'docs/guide.md': '# 日本語ガイド\n\n本文です。',
  'docs/other.md': '# 他のガイド\n\n内容。',
};
function service() {
  const writes = [],
    pages = new Map(
      config.documents.map((d) => [
        d.pageId,
        { title: d.id, markdown: marker(config.repository, d.id) },
      ]),
    );
  let fail;
  const request = async (method, endpoint, body) => {
    if (fail?.(method, endpoint)) throw new Error('simulated failure');
    const [, id, kind] = endpoint.split('/'),
      page = pages.get(id);
    if (!page) throw new Error('404');
    if (method === 'GET')
      return kind === 'markdown'
        ? { markdown: page.markdown, truncated: false, unknown_block_ids: [] }
        : {
            parent: { page_id: parentId },
            properties: { title: { title: [{ plain_text: page.title }] } },
          };
    writes.push({ method, endpoint, body });
    if (kind === 'markdown') page.markdown = body.replace_content.new_str;
    else page.title = body.properties.title.title[0].text.content;
    return {};
  };
  return {
    request,
    writes,
    pages,
    setFailure(value) {
      fail = value;
    },
  };
}
const run = (api) =>
  syncDocuments({
    config,
    sources,
    parentId,
    commit: 'abc123',
    request: api.request,
    log: () => {},
  });
test('Japanese headings, tables, links and literal code survive conversion', () => {
  const value = convert(
    '# 表題\n\n[別](other.md) [章](other.md#例) [型](../src/types.ts)\n\n| 名前 | 参照 |\n| --- | --- |\n| **太字** | [別](other.md) |\n\n```ts\nconst link = "other.md";\n```\n',
    config.documents[0],
    config,
  );
  assert.equal(value.title, '表題');
  assert.doesNotMatch(value.body, /# 表題/);
  assert.match(value.body, /<table header-row="true">/);
  assert.match(value.body, /\*\*太字\*\*/);
  assert.match(value.body, /www.notion.so\/22222222222222222222222222222222/);
  assert.match(value.body, /docs\/other.md#例/);
  assert.match(value.body, /src\/types.ts/);
  assert.match(value.body, /const link = "other.md";/);
});
test('reference links, image paths, fragments and external links', () => {
  const { body } = convert(
    '# 題\n\n[別][x]\n\n[x]: other.md\n\n![図](../public/a.png) [章](#章) [外](https://example.com)\n',
    config.documents[0],
    config,
  );
  assert.match(body, /www.notion.so/);
  assert.match(
    body,
    /raw.githubusercontent.com\/example\/site\/main\/public\/a.png/,
  );
  assert.match(body, /docs\/guide.md#章/);
  assert.match(body, /https:\/\/example.com/);
});
test('nested lists use tabs; nested code keeps literal indentation', () => {
  const { body } = convert(
    '# List\n\n- Parent\n  - Child\n\n    ```js\n      call();\n    ```\n\n- [x] Done\n',
    config.documents[0],
    config,
  );
  assert.match(body, /- Parent\n\t- Child/);
  assert.match(body, /\t\t  call\(\);/);
  assert.match(body, /- \[x\] Done/);
});
test('unconfigured conversion falls back to GitHub; duplicate ids and paths fail', () => {
  const draft = structuredClone(config);
  draft.documents[1].pageId = null;
  assert.match(
    convert('[別](other.md)', draft.documents[0], draft).body,
    /github.com/,
  );
  assert.throws(() => validate(draft, true), /pageId/);
  draft.documents[1].id = 'guide';
  assert.throws(() => validate(draft), /duplicate/);
});
test('sync and rerun with another commit are idempotent', async () => {
  const api = service();
  await run(api);
  assert.equal(api.writes.length, 4);
  api.writes.length = 0;
  await syncDocuments({
    config,
    sources,
    parentId,
    commit: 'def456',
    request: api.request,
    log: () => {},
  });
  assert.equal(api.writes.length, 0);
});
test('midway failure resumes without writing completed documents', async () => {
  const api = service();
  api.setFailure(
    (m, e) =>
      m === 'PATCH' && e.endsWith(`${config.documents[1].pageId}/markdown`),
  );
  await assert.rejects(run(api), /simulated/);
  api.setFailure(null);
  api.writes.length = 0;
  await run(api);
  assert.equal(api.writes.length, 1);
});
test('unmanaged page aborts all writes', async () => {
  const api = service();
  api.pages.get(config.documents[1].pageId).markdown = '他の資料';
  await assert.rejects(run(api), /Unmanaged/);
  assert.equal(api.writes.length, 0);
});
test('wrong parent, truncation, archived page and missing page fail before writes', async () => {
  for (const mode of ['parent', 'truncated', 'archived', 'missing']) {
    const api = service();
    const request = async (m, e, b) => {
      if (mode === 'missing') throw new Error('404');
      const v = await api.request(m, e, b);
      if (mode === 'parent' && v.parent)
        v.parent.page_id = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
      if (mode === 'truncated' && e.endsWith('/markdown')) v.truncated = true;
      if (mode === 'archived') v.archived = true;
      return v;
    };
    await assert.rejects(
      syncDocuments({
        config,
        sources,
        parentId,
        commit: 'abc',
        request,
        log: () => {},
      }),
    );
    assert.equal(api.writes.length, 0);
  }
});
test('content digest excludes commit and changes with content', () => {
  const d = config.documents[0],
    value = convert(sources[d.path], d, config);
  assert.match(
    render(d, config, value, '123'),
    new RegExp(`source-sha256:${value.hash}`),
  );
  assert.notEqual(
    value.hash,
    convert(sources[d.path] + '\n変更', d, config).hash,
  );
});
test('429 retries with Retry-After; 401 never retries or leaks response/token', async () => {
  let count = 0;
  const waits = [];
  const request = createClient('SECRET', {
    wait: async (ms) => waits.push(ms),
    fetchImpl: async () =>
      ++count === 1
        ? new Response('', { status: 429, headers: { 'retry-after': '2' } })
        : Response.json({ ok: true }),
  });
  assert.deepEqual(await request('GET', 'pages/test'), { ok: true });
  assert.equal(count, 2);
  assert.ok(waits.includes(2000));
  count = 0;
  const denied = createClient('SECRET', {
    wait: async () => {},
    fetchImpl: async () => {
      count++;
      return new Response('SECRET', { status: 401 });
    },
  });
  await assert.rejects(
    denied('GET', 'pages/test'),
    (e) => e.message.includes('401') && !e.message.includes('SECRET'),
  );
  assert.equal(count, 1);
});
test('network retries bounded; ambiguous POST never automatically retried', async () => {
  let count = 0;
  const client = createClient('token', {
    wait: async () => {},
    fetchImpl: async () => {
      count++;
      throw new Error('network');
    },
  });
  await assert.rejects(client('GET', 'pages/test'), /network/);
  assert.equal(count, 4);
  count = 0;
  await assert.rejects(client('POST', 'pages', {}));
  assert.equal(count, 1);
});
test('setup recovers an already-created page and persists mappings incrementally', async () => {
  const draft = structuredClone(config);
  draft.documents.forEach((d) => {
    d.pageId = null;
  });
  const persisted = [];
  let creates = 0;
  const request = async (method, endpoint, body) => {
    if (endpoint === `pages/${parentId}`) return {};
    if (endpoint.startsWith('blocks/'))
      return {
        results: [{ type: 'child_page', id: config.documents[0].pageId }],
        has_more: false,
      };
    if (method === 'GET')
      return { markdown: marker(config.repository, 'guide'), truncated: false };
    assert.equal(method, 'POST');
    creates++;
    assert.equal(body.parent.page_id, parentId);
    return { id: config.documents[1].pageId };
  };
  await setup(
    draft,
    sources,
    parentId,
    request,
    async (value) => persisted.push(structuredClone(value)),
    () => {},
  );
  assert.equal(creates, 1);
  assert.equal(persisted.length, 2);
  assert.deepEqual(draft, config);
  await setup(
    draft,
    sources,
    parentId,
    request,
    async () => {},
    () => {},
  );
  assert.equal(creates, 1);
});
test('setup rejects duplicate identity; prefix identities are distinct', async () => {
  const draft = {
    ...config,
    documents: [{ ...config.documents[0], pageId: null }],
  };
  await assert.rejects(
    setup(
      draft,
      sources,
      parentId,
      async (m, e) =>
        e.startsWith('blocks/')
          ? {
              results: [
                { type: 'child_page', id: 'a' },
                { type: 'child_page', id: 'b' },
              ],
              has_more: false,
            }
          : { markdown: marker(config.repository, 'guide') },
      async () => {},
      () => {},
    ),
    /Duplicate managed/,
  );
  assert.notEqual(
    marker(config.repository, 'guide'),
    marker(config.repository, 'guide-extra'),
  );
});
test('verify is read-only; source HTML cannot move Notion pages', async () => {
  const api = service();
  await preflight(config, parentId, api.request);
  assert.equal(api.writes.length, 0);
  assert.throws(
    () =>
      convert(
        '<page url="https://notion.so/other">Other</page>',
        config.documents[0],
        config,
      ),
    /raw HTML/,
  );
});
test('all tracked configured sources convert; workflow watches every configured path', async () => {
  const actual = JSON.parse(
    await readFile(new URL('./config.json', import.meta.url), 'utf8'),
  );
  validate(actual);
  const workflow = await readFile(
    new URL('../../.github/workflows/notion-sync.yml', import.meta.url),
    'utf8',
  );
  for (const d of actual.documents) {
    const source = await readFile(
      new URL('../../' + d.path, import.meta.url),
      'utf8',
    );
    assert.ok(convert(source, d, actual).title);
    assert.ok(workflow.includes(`- ${d.path}\n`), d.path);
  }
});
