# 管理者向け：Cloudflare Pagesへの公開

1. CloudflareのWorkers & PagesでPagesプロジェクトを作り、対象GitHubリポジトリに接続します。
2. Production branchを `main`、Build commandを `pnpm build`、Build output directoryを `out` にします。Next.jsのサーバー用アダプターは不要です。
3. ビルド環境は `NODE_VERSION=22`、`PNPM_VERSION=11.19.0` を設定します。
4. ProductionとPreviewの `NEXT_PUBLIC_SITE_URL` に本番のHTTPSオリジン（例：実際に割り当てられたPagesドメイン）を設定します。パスは含めません。設定後は再ビルドが必要です。未設定のローカル環境ではcanonical/OGPを出力しません。
5. Preview branch deploymentを有効にし、PRのプレビューで全ページを確認します。
6. レビュー後にmainへマージし、Productionの更新、独自ドメイン、HTTPS、404を確認します。

公開前に活動情報、問い合わせ先、公開許可を確定してください。プライバシーポリシーの「配信を予定しています」も実際の運用に合わせて更新します。公開権限を持つ管理者の操作が必要です。GitHubの保護設定は設定済みです。Cloudflareの接続と本番公開は別途実施します。

参考：[Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)、[Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)、[Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs)。
