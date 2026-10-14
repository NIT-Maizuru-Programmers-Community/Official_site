# MVP検証記録

2026-09-11にローカルの静的出力を検証しました。

## 実装済み

- 7ページ、404、共通ヘッダー・フッター、モバイルナビゲーション
- Next.js App RouterによるStatic Export、TypeScript strict、Tailwind CSS
- TypeScriptコンテンツ、下書き除外、日付降順表示、画像と問い合わせ窓口の設定
- title・description、本番オリジン設定時のcanonical・OGP、セルフホストフォント
- GitHub Actions、Dependabot、Issue/PRテンプレート、開発・公開手順

## 検証結果

| 検証                               | 結果                                                           |
| ---------------------------------- | -------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`   | 成功                                                           |
| `pnpm format:check`                | 成功                                                           |
| `pnpm lint`                        | 警告・エラーなし                                               |
| `pnpm typecheck`                   | 成功                                                           |
| `pnpm test`                        | 7テスト成功                                                    |
| `pnpm build`                       | 全ページの静的出力に成功                                       |
| Chromeでの画面幅375 / 768 / 1440px | 7ページ × 3幅でHTTP 200、横はみ出しなし、h1が1個               |
| モバイルメニュー                   | 開閉、ページ移動時の閉鎖、Escapeで閉鎖・ボタンへフォーカス復帰 |
| キーボード                         | Tabでスキップリンク、Enterで本文へ移動                         |
| 存在しないURL                      | HTTP 404と専用画面                                             |
| JavaScript                         | 上記の操作中に未処理エラーなし                                 |

Lighthouseのローカル静的サーバー・モバイル設定での結果：Performance 73、Accessibility 100、Best Practices 100、SEO 100。FCP 3.9秒、LCP 4.8秒、TBT 0ms、CLS 0.002。主な改善候補はCSS・日本語フォントの読み込みです。これは単回のローカル計測であり、本番CDNの性能を保証しません。Cloudflare公開後にキャッシュ・圧縮を含めて再計測してください。

## 本番公開前に必要なこと

- 部活名・活動紹介文・活動日時・場所を運営者が確認する。
- 実際のお知らせ・作品を登録する。サンプルは下書きのため非表示。
- 活動写真の公開許可を確認する。現在は文字によるビジュアルを表示し、生成モックアップは配信していない。
- 問い合わせ窓口、サービス、利用目的、保存期間を確定して `site.contact` に登録する。
- Cloudflare PagesのGitHub接続、Preview/Production環境、本番オリジンを設定する。
- 実環境のOGP、HTTPS、独自ドメイン、404を確認する。
- GitHubのブランチ保護とレビュー必須設定を有効にする。

Cloudflareへの接続・デプロイ、GitHubの設定変更、Issue/PR作成、コミット・pushはこのMVP実装では実施していません。
