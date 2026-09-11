# コンテンツを更新する

| ファイル                    | 更新する内容                                       |
| --------------------------- | -------------------------------------------------- |
| `src/content/site.ts`       | 学校・部活名、活動日時・場所、写真、問い合わせ窓口 |
| `src/content/activities.ts` | 活動内容                                           |
| `src/content/news.ts`       | お知らせ                                           |
| `src/content/works.ts`      | 作品                                               |
| `src/content/links.ts`      | 外部リンク                                         |

お知らせと作品は次の手順で追加します。

1. 対応する配列にオブジェクトを追加します。型は `src/types/content.ts` を参照してください。
2. `slug` は同じ配列で重複しない英小文字・数字・ハイフン、`publishedAt` は実在する `YYYY-MM-DD` 形式の日付にします。
3. 作業中は `draft: true` にします。承認後に `false` にすると表示されます。表示順は日付の降順です。日付による予約投稿機能はありません。
4. 画像は公開許可とEXIF削除を確認し、縮小したWebP/AVIFを `public/images/` に置きます。作品には `image: '/images/works/名前.webp'` と内容を説明する `imageAlt` を一緒に指定します。
5. リンクはHTTPSにします。テストとプレビューで確認してPull Requestを作成します。

サンプルのお知らせと作品は下書きなので表示されません。公開済みデータがない場合も、ページには準備中の案内が表示されます。活動紹介文は運営者が本番公開前に内容を確認してください。

トップ写真は `site.heroImage` に `{ src: '/images/activities/名前.webp', alt: '写真の具体的な説明' }` を設定します。未設定時は文字のデザインを表示します。デザイン検討用の生成モックアップ画像は配信しません。

問い合わせ窓口は `site.contact` に `url`、`provider`、`retention`（保存期間）、`purpose`（利用目的）を設定します。お問い合わせページとプライバシーポリシーが同じ設定を参照します。未設定時は受付を案内せず、個人情報を収集しません。

フォントはFontsourceパッケージからセルフホストしています。OG画像は `public/images/common/og.png`、アイコンは `public/favicon.svg` です。

具体的な初回操作は[最初のPR](first-pull-request.md)を参照してください。

## お知らせを追加する例

`src/content/news.ts` の `news` 配列内に、次のオブジェクトを追加します。既存の記事を丸ごと置き換えず、配列の中へカンマ区切りで追加してください。

```ts
{
  slug: 'practice-report',
  title: '練習用の活動報告',
  summary: '公開前に実際の活動内容へ置き換えます。',
  publishedAt: '2026-09-11',
  category: '活動報告',
  draft: true,
},
```

これは練習用の下書きです。そのまま本番記事として公開しないでください。`category` は「活動報告」「イベント」「お知らせ」から選びます。掲載が承認された内容へ直し、`draft: false` にするとローカルのお知らせ一覧とトップに表示されます。日付だけを未来にしても予約投稿にはなりません。

確認は `pnpm test` と `pnpm typecheck`、表示確認は `pnpm dev` で行います。画像・URLを含む作品の項目は [型定義](../src/types/content.ts) と [既存の作品データ](../src/content/works.ts)を参照してください。
