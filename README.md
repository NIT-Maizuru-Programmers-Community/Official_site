# 舞鶴高専 プログラミングコンテスト部 公式サイト

部員がGitHubで開発・更新する公式サイトです。Next.js・React・TypeScript・Tailwind CSSを使い、静的なHTMLとして配信します。ログインやデータベースはありません。

プログラミングやGitが初めてでも、誤字の修正、説明文の改善、不具合の報告から参加できます。最初から全部の技術を覚える必要はありません。

## 初めて参加する方へ

1. [環境を準備してサイトを起動する](docs/getting-started.md)
2. [小さな変更をして最初のPRを作る](docs/first-pull-request.md)
3. [レビュー・マージのルールを確認する](CONTRIBUTING.md)

詰まったら[困ったときの対処方法](docs/troubleshooting.md)へ。環境構築がまだできなくても、GitHubのIssuesから「開発・改善」「不具合報告」を投稿できます。

## 目的別のガイド

| やりたいこと                       | 読むもの                                            |
| ---------------------------------- | --------------------------------------------------- |
| お知らせ・作品・活動内容を更新する | [コンテンツ更新ガイド](docs/content-guide.md)       |
| コードの配置と用語を知る           | [構成と用語](docs/project-guide.md)                 |
| CIの失敗を調べる                   | [困ったときの対処方法](docs/troubleshooting.md)     |
| 公開設定をする（管理者向け）       | [Cloudflare Pagesへの公開](docs/deployment.md)      |
| 技術選定の理由を読む               | [Next.jsを継続する理由](docs/framework-decision.md) |

AIを使って作業する場合は [Codex・Claude Codeの開発ガイド](docs/agent-workflow.md)を参照してください。共通ルールは [AGENTS.md](AGENTS.md) にあります。

## セットアップ済みの方

リポジトリのフォルダーで実行します。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

ブラウザで http://localhost:3000 を開きます。起動したターミナルはそのままにし、終了するときはCtrl+Cを押します。

```sh
pnpm format
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Node.jsはCIと同じ22系（22.13以上）、pnpmは `package.json` の `packageManager` に指定した版を使います。ビルド結果は `out/` に生成され、`pnpm preview` で確認できます。

トップ・活動紹介・作品紹介・お知らせ・お問い合わせ・各種リンク・プライバシーポリシーと404を用意しています。写真、活動日時、問い合わせ窓口などの公開情報は運営者による確定が必要です。

[当初のStep 1計画書](docs/implementation-plan-step1.md)は設計時点の記録です。現在の操作手順は上記の各ガイドを参照してください。
