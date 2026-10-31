'use client';

import { useEffect, useId, useState } from 'react';

export function MermaidDiagram({ source }: { source: string }) {
  const id = `mermaid-${useId().replaceAll(':', '')}`;
  const [diagram, setDiagram] = useState<{
    source: string;
    svg: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          suppressErrorRendering: true,
          theme: 'neutral',
          flowchart: { wrappingWidth: 260 },
        });
        if (document.fonts) await document.fonts.ready;
        if (!(await mermaid.parse(source, { suppressErrors: true }))) return;
        const result = await mermaid.render(id, source);
        if (!cancelled) setDiagram({ source, svg: result.svg });
      } catch {
        // 読み込みや構文解析に失敗した場合は元のテキストを表示する。
      }
    }

    void draw();
    return () => {
      cancelled = true;
    };
  }, [id, source]);

  return diagram?.source === source ? (
    <div
      className="mermaid-diagram"
      dangerouslySetInnerHTML={{ __html: diagram.svg }}
    />
  ) : (
    <pre>
      <code>{source}</code>
    </pre>
  );
}
