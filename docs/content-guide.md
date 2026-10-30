# コンテンツを更新する

| ファイル                    | 更新する内容                                       |
| --------------------------- | -------------------------------------------------- |
| `src/content/site.ts`       | 学校・部活名、活動日時・場所、写真、問い合わせ窓口 |
| `src/content/activities.ts` | 活動内容                                           |
| `src/content/news.ts`       | お知らせ                                           |
| `src/content/results.ts`    | 大会・イベント実績                                 |
| `src/content/works.ts`      | 作品                                               |
| `src/content/links.ts`      | 外部リンク                                         |

お知らせ・実績・作品は次の手順で追加します。

1. 対応する配列にオブジェクトを追加します。型は `src/types/content.ts` を参照してください。お知らせと実績の記事本文、作品の詳細本文は `body` にMarkdownで記述します。作品の `body` は省略できます。
2. `slug` は同じ配列で重複しない英小文字・数字・ハイフン、`publishedAt` は実在する `YYYY-MM-DD` 形式の日付にします。
3. 作業中は `draft: true` にします。承認後に `false` にすると表示されます。公開作品には `/works/slug/` の詳細ページが生成されます。お知らせは公開日の降順、実績は大会年度の降順で表示します。日付による予約投稿機能はありません。
   作品を公開・非公開にするときは、`src/content/published-work-slugs.json` の公開作品のslug一覧も更新してください。テストで作品データとの一致を確認します。
   お知らせやブログを公開・非公開にするときは、`src/content/published-news-slugs.json` の一覧も同じように更新してください。
4. 画像は公開許可とEXIF削除を確認し、縮小したWebP/AVIFを `public/images/` に置きます。作品には `image: '/images/works/名前.webp'` と内容を説明する `imageAlt` を一緒に指定します。
5. 外部リンクはHTTPSにし、公開元のページ名と内容を説明する文を添えます。公式情報を優先し、追加・更新時にはリンク先が表示でき、説明とリンク先が一致することを確認します。画面上の外部リンクは共通部品 `ExternalLink` を使い、新しいタブで安全に開きます。
   作品の動画リンクは `videoUrl` に指定します。
6. テストとプレビューでリンク先・表示を確認してPull Requestを作成します。

サンプルのお知らせと作品は下書きなので表示されません。公開済みデータがない場合も、ページには準備中の案内が表示されます。活動紹介文は運営者が本番公開前に内容を確認してください。

実績は大会・イベント単位の記事として登録します。`eventYear`、大会名、部門別の `outcomes`（部門、任意の作品名、結果）、`summary`、`body`、確認できる公式情報への `sources` を記載してください。出場・受賞などの結果は、運営者から提供された情報または公式発表で確認します。参加者名は公開許可を確認できた場合だけ掲載します。

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
  body: `## 活動の概要

公開前に実際の活動内容へ置き換えます。

- 活動内容を箇条書きで紹介できます。`,
  draft: true,
},
```

これは練習用の下書きです。そのまま本番記事として公開しないでください。`category` は「活動報告」「イベント」「お知らせ」「ブログ」から選びます。掲載が承認された内容へ直し、`draft: false` にするとお知らせ一覧とトップに表示され、タイトルから個別記事へ移動できます。日付だけを未来にしても予約投稿にはなりません。

## Markdownファイルでブログを書く

ブログもお知らせ一覧に表示します。本文を独立したMarkdownファイルで管理したい場合は、`src/content/news/` に `slug` と同名の `.md` ファイルを作ります。例えば `src/content/news/practice-blog.md` に本文を記述し、`src/content/news.ts` の `news` 配列に次のように追加します。

```ts
{
  slug: 'practice-blog',
  title: 'ブログ記事のタイトル',
  summary: '記事の内容を短く紹介します。',
  publishedAt: '2026-09-11',
  category: 'ブログ',
  markdown: true,
  draft: true,
},
```

この例は練習用です。タイトル、概要、本文、掲載日を実際の内容へ変更し、公開前に内容と画像の掲載許可を確認してください。下書きでもMarkdownファイルは必要です。`markdown: true` と `body` は同時に指定せず、従来どおり `body` に本文を書く方法も使えます。

公開時は `draft` を外すか `false` にし、`published-news-slugs.json` にslugを追加してPRを作ります。レビューとCIを通してマージした後、[公開手順](deployment.md)に従ってデプロイするとサイトに反映されます。

Markdownでは見出し、段落、箇条書き、リンク、強調、コードを使えます。生HTMLは表示されません。リンクはHTTPSまたはサイト内パスを使い、画像を使う場合は公開許可とEXIF削除を確認したうえで、`public/images/` 内の画像を指定します。

実績の記事は `src/content/results.ts` に追加します。`publishedAt` は結果を掲載する日、`eventYear` は大会・イベントの開催年です。`outcomes` に結果を部門ごとに記録し、`sources` に公式発表などの出典を設定してください。

確認は `pnpm test` と `pnpm typecheck`、表示確認は `pnpm dev` で行います。画像・URLを含む作品の項目は [型定義](../src/types/content.ts) と [既存の作品データ](../src/content/works.ts)を参照してください。
