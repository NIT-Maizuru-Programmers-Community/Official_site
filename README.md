# 舞鶴高専 プログラミングコンテスト部 公式サイト

Next.js App Router / TypeScript / Tailwind CSS の静的サイトです。配信成果物は `out/` に出力されます。API・データベースは使いません。

## 開発を始める

Node.js 22.13以上と、`package.json` の `packageManager` に指定したpnpmを用意します。

```sh
npm install -g pnpm@11.19.0
pnpm install --frozen-lockfile
pnpm dev
```

ブラウザで http://localhost:3000 を開きます。

```sh
pnpm format
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

`pnpm preview` は `out/` を配信します。Next.jsのサーバーは本番環境に不要です。

## ページ

`/`、`/activities/`、`/works/`、`/news/`、`/contact/`、`/links/`、`/privacy/` と `404.html` を生成します。

## 内容を更新する

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

トップ写真は `site.heroImage` に `{ src: '/images/activities/名前.webp', alt: '写真の具体的な説明' }` を設定します。未設定時は文字のデザインを表示します。`design-concepts/` 内の生成モックアップ画像は配信しません。

問い合わせ窓口は `site.contact` に `url`、`provider`、`retention`（保存期間）、`purpose`（利用目的）を設定します。お問い合わせページとプライバシーポリシーが同じ設定を参照します。未設定時は受付を案内せず、個人情報を収集しません。

フォントはFontsourceパッケージからセルフホストしています。OG画像は `public/images/common/og.png`、アイコンは `public/favicon.svg` です。

## GitHubでの更新

[開発・更新ガイド](CONTRIBUTING.md)にPR・レビュー・管理者の承認省略の手順を記載しています。CIの `validate` は管理者を含め必須です。

## Cloudflare Pages

1. CloudflareのWorkers & PagesでPagesプロジェクトを作り、対象GitHubリポジトリに接続します。
2. Production branchを `main`、Build commandを `pnpm build`、Build output directoryを `out` にします。Next.jsのサーバー用アダプターは不要です。
3. ビルド環境は `NODE_VERSION=22`、`PNPM_VERSION=11.19.0` を設定します。
4. ProductionとPreviewの `NEXT_PUBLIC_SITE_URL` に本番のHTTPSオリジン（例：実際に割り当てられたPagesドメイン）を設定します。パスは含めません。設定後は再ビルドが必要です。未設定のローカル環境ではcanonical/OGPを出力しません。
5. Preview branch deploymentを有効にし、PRのプレビューで全ページを確認します。
6. レビュー後にmainへマージし、Productionの更新、独自ドメイン、HTTPS、404を確認します。

公開前に活動情報、問い合わせ先、公開許可を確定してください。プライバシーポリシーの「配信を予定しています」も実際の運用に合わせて更新します。公開権限を持つ管理者の操作が必要です。MVP実装のみではCloudflare接続・本番公開・GitHubの保護設定は別途管理します。

参考：[Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)、[Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)、[Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs)。
