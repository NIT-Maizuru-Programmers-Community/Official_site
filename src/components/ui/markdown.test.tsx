import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MarkdownBody } from './markdown';

describe('MarkdownBody', () => {
  it('renders headings, paragraphs, lists, and safe HTTPS links', () => {
    const html = renderToStaticMarkup(
      <MarkdownBody
        source={
          '# 見出し\n\n本文 **強調**\n\n- 項目\n\n[公式](https://example.com)'
        }
      />,
    );
    expect(html).toContain('<h2>見出し</h2>');
    expect(html).toContain('<strong>強調</strong>');
    expect(html).toContain('<ul><li><p>項目</p></li></ul>');
    expect(html).toContain('href="https://example.com/"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('omits raw HTML and blocks unsafe link protocols', () => {
    const html = renderToStaticMarkup(
      <MarkdownBody
        source={'<img src=x onerror=alert(1)>\n\n[unsafe](javascript:alert(1))'}
      />,
    );
    expect(html).not.toContain('<img');
    expect(html).not.toContain('onerror');
    expect(html).not.toContain('javascript:');
  });

  it('keeps Mermaid source readable before client rendering', () => {
    const html = renderToStaticMarkup(
      <MarkdownBody source={'```mermaid\nflowchart TD\nA --> B\n```'} />,
    );
    expect(html).toContain('<pre><code>flowchart TD');
    expect(html).toContain('A --&gt; B');
  });
});
