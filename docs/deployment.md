# 管理者向け：Cloudflare Workersへの公開

## 配信方針と現在の状態

Next.jsのStatic Export（`output: 'export'`）で生成した `out/` を、Cloudflare Workers Static Assetsで配信します。SSR・Server Actionsは使用しません。

`wrangler.jsonc` は静的ファイルのディレクトリ、末尾スラッシュの扱い、404ページ、独自ドメインを指定します。`workers.dev` と独自ドメインのURLはインターネットに公開されるため、確認用でも掲載内容を事前に確認してください。

## ローカル確認

Node.jsとpnpmを用意し、リポジトリのルートで実行します。

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm dlx wrangler@4.155.0 dev
```

表示されたローカルURLで各ページ、末尾スラッシュ、存在しないページの404、画像を確認します。終了はCtrl+Cです。`pnpm check` のビルドで `out/` が生成されます。

## デプロイと確認

1. CloudflareアカウントとWorkersの利用準備を行い、`programmerscommunity.tech` のCloudflareゾーンが有効になっていることを確認します。
2. 公開前に活動情報、問い合わせ窓口、写真の公開許可を確認します。
3. レビューと必須CIを通した変更を使用し、`NEXT_PUBLIC_SITE_URL=https://www.programmerscommunity.tech pnpm check` を実行します。ビルド時の環境変数からcanonicalとOGPが生成されます。
4. `pnpm dlx wrangler@4.155.0 login` でログインし、`pnpm dlx wrangler@4.155.0 whoami` でアカウントを確認します。
5. `pnpm dlx wrangler@4.155.0 deploy` を実行し、`workers.dev` と `https://www.programmerscommunity.tech` の両方でHTTPS、各ページ、末尾スラッシュ、404、画像を確認します。

`NEXT_PUBLIC_SITE_URL` はビルド時に設定する本番のHTTPSオリジンです。未設定ではcanonical/OGPを出力しません。PreviewとProductionの分離、GitHub連携、自動デプロイは別途設計・設定します。

## 参考

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [静的サイトと404ページ](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
