# 管理者向け：Cloudflare Workersへの公開

## 採用方針

2026-09-14時点で、公式サイトの配信先は **Cloudflare Workers Static Assets** とします。Next.jsのStatic Export（`output: 'export'`）で生成する `out/` のHTML・CSS・JavaScript・画像を配信します。

現在のMVPは静的サイトです。Next.jsのSSR・Server ActionsをWorkers上で実行する構成にはしません。将来APIを追加する場合は別途設計し、Goを採用する場合もその実行基盤を改めて選定します。

## 現在の状態

- Next.jsの静的ビルドと、CIによる7ページ・404の出力確認は実装済みです。
- Wrangler設定、Cloudflareとの接続、Preview/Productionへのデプロイ、独自ドメインの設定は未実施です。
- この文書は採用方針の記録です。Pages向けの設定手順は使用しません。

## 配信実装時に行うこと

1. WranglerとWorkers Static Assetsの設定を追加し、配信ディレクトリを `out/` にします。
2. ビルド時の `NEXT_PUBLIC_SITE_URL` に本番のHTTPSオリジンを設定します。未設定のローカル環境ではcanonical/OGPを出力しません。
3. ローカルのWorkers環境で全ページ、末尾スラッシュ、404、画像、ヘッダーの扱いを確認します。
4. PreviewとProductionを分け、GitHub連携・必要な権限・デプロイ方法を設定します。
5. 必須CI成功とレビューを経て公開し、HTTPS・独自ドメイン・OGPを実環境で確認します。

公開前には活動情報、問い合わせ窓口、写真の公開許可を確定してください。プライバシーポリシーの「配信を予定しています」も公開状況に合わせて更新します。

## 参考

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Workers Static Assetsの設定](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
