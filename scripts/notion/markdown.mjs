import path from 'node:path';
import { createHash } from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkStringify);
const sha = (s) => createHash('sha256').update(s).digest('hex');
const encodePath = (s) => s.split('/').map(encodeURIComponent).join('/');
export const marker = (repo, id) => `notion-sync:${sha(`${repo}:${id}`)}`;
export const hasLine = (text, line) =>
  text.split('\n').some((s) => s.trim() === line);
export function convert(markdown, document, config) {
  const tree = processor.parse(markdown),
    definitions = new Map();
  function collect(n) {
    if (n.type === 'definition') definitions.set(n.identifier, n);
    n.children?.forEach(collect);
  }
  collect(tree);
  const plain = (n) => n.value ?? n.children?.map(plain).join('') ?? '';
  const titleNode = tree.children.find(
    (n) => n.type === 'heading' && n.depth === 1,
  );
  const title = titleNode ? plain(titleNode) : document.id;
  // Notion already displays the page title, so omit the first source H1.
  if (titleNode) tree.children.splice(tree.children.indexOf(titleNode), 1);
  function url(value, image = false) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return value;
    const hashAt = value.indexOf('#'),
      hash = hashAt < 0 ? '' : value.slice(hashAt),
      raw = hashAt < 0 ? value : value.slice(0, hashAt);
    const queryAt = raw.indexOf('?'),
      query = queryAt < 0 ? '' : raw.slice(queryAt);
    const file = decodeURIComponent(queryAt < 0 ? raw : raw.slice(0, queryAt));
    const resolved = file
      ? path.posix.normalize(
          file.startsWith('/')
            ? file.slice(1)
            : path.posix.join(path.posix.dirname(document.path), file),
        )
      : document.path;
    if (resolved.startsWith('../'))
      throw new Error(`Link escapes repository: ${value}`);
    const target = config.documents.find((d) => d.path === resolved);
    if (target?.pageId && !hash && !query && !image)
      return `https://www.notion.so/${target.pageId.replaceAll('-', '')}`;
    return image
      ? `https://raw.githubusercontent.com/${config.repository}/main/${encodePath(resolved)}${query}${hash}`
      : `https://github.com/${config.repository}/blob/main/${encodePath(resolved)}${query}${hash}`;
  }
  const stringify = (n) =>
    processor.stringify({ type: 'root', children: [n] }).trimEnd();
  function transform(n) {
    if (n.type === 'linkReference' || n.type === 'imageReference') {
      const def = definitions.get(n.identifier);
      if (!def) throw new Error('Missing link definition');
      n.type = n.type === 'linkReference' ? 'link' : 'image';
      n.url = def.url;
      n.title = def.title;
    }
    if (n.type === 'link' || n.type === 'image')
      n.url = url(n.url, n.type === 'image');
    // Do not interpret source HTML as Notion commands (e.g. child-page moves).
    if (n.type === 'html' && !/^<br\s*\/?\s*>$/i.test(n.value))
      throw new Error(
        'Unsupported raw HTML; use Markdown or a fenced code block',
      );
    n.children?.forEach(transform);
    if (n.type === 'list') {
      const content = n.children
        .map((item, i) => {
          const [first, ...rest] = item.children;
          if (first?.type !== 'paragraph')
            throw new Error('List items must begin with text');
          const prefix = n.ordered ? `${(n.start ?? 1) + i}. ` : '- ';
          const checked =
            typeof item.checked === 'boolean'
              ? `[${item.checked ? 'x' : ' '}] `
              : '';
          const nested = rest
            .map((c) =>
              stringify(c)
                .split('\n')
                .map((line) => `\t${line}`)
                .join('\n'),
            )
            .join('\n');
          return (
            prefix +
            checked +
            stringify(first).replaceAll('\n', ' ') +
            (nested ? `\n${nested}` : '')
          );
        })
        .join('\n');
      n.type = 'html';
      n.value = content;
      delete n.children;
    }
    if (n.type === 'table') {
      const rows = n.children.map(
        (row) =>
          '\t<tr>\n' +
          row.children
            .map((cell) => {
              const text = stringify({
                type: 'paragraph',
                children: cell.children,
              })
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('\n', '<br>');
              return `\t\t<td>${text}</td>`;
            })
            .join('\n') +
          '\n\t</tr>',
      );
      n.type = 'html';
      n.value = `<table header-row="true">\n${rows.join('\n')}\n</table>`;
      delete n.children;
    }
  }
  transform(tree);
  tree.children = tree.children.filter((n) => n.type !== 'definition');
  const body = processor.stringify(tree);
  return { title, body, hash: sha(`v2\n${title}\n${body}`) };
}
export function render(d, config, converted, commit) {
  return `> GitHubから自動同期しています。本文の編集はGitHubのPRで行ってください。メモは別ページに保存してください。\n\n[元文書](https://github.com/${config.repository}/blob/main/${encodePath(d.path)}) · [反映コミット](https://github.com/${config.repository}/commit/${commit})\n\n${marker(config.repository, d.id)}\n\nsource-sha256:${converted.hash}\n\n${converted.body}`;
}
