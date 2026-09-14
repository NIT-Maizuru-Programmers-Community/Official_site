# フレームワーク選定：Next.jsを継続

2026-09-11の検討では、部員のReact開発学習と既存MVPの活用を優先し、Next.js App RouterのStatic Exportを継続することにした。

| 候補           | 今回の判断                                                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js        | 既存の7ページとReactコンポーネントを活用できる。移行を挟まずCIと共同開発を開始できるため採用。                                                 |
| Astro＋React   | 静的な情報発信サイトに適し、必要な部分にReactを利用できる。一方、今回はサイト全体をReactで開発する学習目的を優先した。                         |
| TanStack Start | 型安全なルーティングとデータ読み込みを学ぶ候補。静的プリレンダリングも可能だが、今回はルーティング・メタデータ・配信設定の移行コストを避けた。 |

性能を同一条件で実測比較した判断ではない。将来、データ取得やアプリ機能の学習要件が変わった際に再検討する。現時点ではDB、ログイン、サーバーAPIを追加せず、Cloudflare Workers Static Assetsで配信する静的出力を維持する。配信先は2026-09-14にWorkersを採用する方針へ更新した。

- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
- [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- [TanStack Start Overview](https://tanstack.com/start/latest/docs/framework/react/overview)
- [TanStack Start Static Prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
