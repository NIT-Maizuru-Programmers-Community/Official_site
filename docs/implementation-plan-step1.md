# Step 1 実装計画書

> 2026-09-14更新：配信先はCloudflare Workers Static Assetsを採用する方針に変更しました。以下は当初の計画を記録として保持しています。Pagesに関する配信手順・完了条件より、[現在の配信方針](deployment.md)を優先してください。

## 1. 目的

舞鶴工業高等専門学校のプログラミング系部活動の公式サイトを、部員がGitHubを使って継続的に開発・更新できる形で公開する。

Step 1では、Next.jsによる静的サイトを完成させ、Cloudflare Pagesへ安全に公開するところまでを対象とする。

## 2. 成果物

- PCとスマートフォンの両方で利用できる公式サイト
- TypeScriptで管理できるお知らせ、作品、活動、リンクのデータ
- Pull Requestごとに自動検証されるGitHub Actions
- Cloudflare PagesのPreview環境とProduction環境
- 部員向けの開発・更新手順

## 3. Step 1の対象範囲

### 実装するもの

- トップページ
- 活動紹介ページ
- 作品紹介ページ
- お知らせページ
- お問い合わせページ
- 各種リンクページ
- プライバシーポリシーページ
- 共通ヘッダー、ナビゲーション、フッター
- OGP、title、descriptionなどの基本的なメタデータ
- 404ページ
- レスポンシブ対応
- アクセシビリティの基本対応
- GitHub Actionsによる自動検証
- Cloudflare Pagesへの静的サイト配信

### Step 1では実装しないもの

- ログイン、会員管理、管理画面
- 独自のお問い合わせ送信API
- データベース
- GCP、Cloud Run、Firestoreとの連携
- サイト内検索
- コメント、いいね、アクセスカウンター
- 多言語対応

バックエンド機能は、静的サイトの完成後にStep 2として別途設計する。

## 4. 採用技術

| 分類 | 採用技術 | 方針 |
| --- | --- | --- |
| フレームワーク | Next.js | App Routerを使用する |
| 言語 | TypeScript | `strict`を有効にする |
| UI | React | Server Componentを基本とする |
| スタイル | Tailwind CSS | デザイントークンをCSS変数として定義する |
| パッケージ管理 | pnpm | `pnpm-lock.yaml`をコミットする |
| コンテンツ | TypeScript | `satisfies`で型を検証する |
| 静的解析 | ESLint | CIで警告・エラーを確認する |
| 整形 | Prettier | コードスタイルを統一する |
| テスト | Vitest | データ検証と共通ロジックを中心に使用する |
| CI | GitHub Actions | 型、Lint、テスト、ビルドを実行する |
| 配信 | Cloudflare Pages | Next.js Static Exportを配信する |

## 5. サイト構成

| URL | ページ | 主な内容 |
| --- | --- | --- |
| `/` | トップ | メインビジュアル、最新のお知らせ、活動概要、注目作品、入部・問い合わせへの導線 |
| `/activities` | 活動紹介 | 活動内容、活動日時、活動場所、年間の主な取り組み |
| `/works` | 作品紹介 | 部員が制作したWebサイト、アプリ、競技作品など |
| `/news` | お知らせ | 活動報告、イベント、受賞、サイト更新情報 |
| `/contact` | お問い合わせ | 問い合わせ方法、注意事項、外部フォームへのリンク |
| `/links` | 各種リンク | 学校、GitHub Organization、関連大会など |
| `/privacy` | プライバシーポリシー | 取得する情報、利用目的、外部サービス、問い合わせ先 |

作品やお知らせの詳細ページは、掲載内容が増えて一覧だけでは読みにくくなった時点で追加する。初期実装では一覧ページを優先する。

## 6. ディレクトリ案

```text
.
├── public/
│   ├── images/
│   │   ├── activities/
│   │   ├── works/
│   │   └── common/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── activities/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── links/page.tsx
│   │   ├── news/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── works/page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── content/
│   │   ├── activities.ts
│   │   ├── links.ts
│   │   ├── news.ts
│   │   ├── site.ts
│   │   └── works.ts
│   ├── lib/
│   └── types/
│       └── content.ts
├── docs/
└── .github/
    ├── ISSUE_TEMPLATE/
    ├── pull_request_template.md
    └── workflows/ci.yml
```

## 7. TypeScriptによるコンテンツ管理

コンテンツ更新もTypeScriptの学習機会にするため、MarkdownやCMSは使用せず、`src/content`内の配列として管理する。

```ts
export type Work = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: `${number}-${number}-${number}`;
  image: string;
  repositoryUrl?: string;
  websiteUrl?: string;
  tags: readonly string[];
};

export const works = [
  {
    slug: "sample-app",
    title: "サンプル作品",
    summary: "作品の概要を記載します。",
    publishedAt: "2026-09-05",
    image: "/images/works/sample-app.webp",
    tags: ["Next.js", "TypeScript"],
  },
] satisfies readonly Work[];
```

次のルールを設ける。

- `slug`は重複させない。
- 日付は`YYYY-MM-DD`形式に統一する。
- 画像には内容が分かる代替テキストを用意する。
- 外部URLは`https://`を基本とする。
- 公開前に著作権、個人情報、機密情報を確認する。
- コンテンツの追加もPull Request経由で行う。

## 8. デザイン実装方針

基準デザインは次のモックアップとする。

- `design-concepts/kosen-editorial/kosen-editorial-desktop-home.png`

実装時は画像を完全にトレースするのではなく、以下の特徴をデザインシステムへ変換する。

- 学校名が分かるコンパクトなヘッダー
- 部活名を大きく見せるタイポグラフィ
- 実際の活動写真を主役にした構成
- 白、濃紺、コバルトブルーを基本とする配色
- 黄色は日時など重要な情報に限定する
- カード、角丸、影、装飾を必要以上に増やさない
- PCでは非対称な構成、スマートフォンでは読み順を優先する
- アニメーションは短いフェードや移動に限定し、無効化設定を尊重する

フォントは日本語に`Noto Sans JP`、英数字に`Inter`を使用する。外部配信に依存する場合はプライバシーポリシーへの記載を検討し、可能であればセルフホストする。

## 9. 画像運用

- 写真は公開許可を確認したものだけ使用する。
- 元画像をそのまま置かず、表示用途に合わせて縮小する。
- WebPまたはAVIFを基本とする。
- ファイル名には英小文字、数字、ハイフンを使用する。
- EXIFなど不要なメタデータは公開前に削除する。
- 画面、ホワイトボード、名札などに個人情報や秘密情報が映っていないか確認する。

写真掲載の詳細な規則と承認フローは、実際の写真を準備する段階で別途決定する。

## 10. お問い合わせ

Step 1ではサイト側に送信APIを持たせず、学校が管理できる外部フォームまたは指定された連絡手段へのリンクを掲載する。

これにより、スパム対策、メール送信サービス、秘密鍵、問い合わせ情報の保存をStep 1から切り離す。具体的なサービスと保存期間は公開前までに決定し、プライバシーポリシーへ反映する。

## 11. セキュリティ方針

- 秘密情報をリポジトリへコミットしない。
- `.env*`は必要なサンプルだけを残し、実値を除外する。
- ユーザー入力を受け取る独自機能をStep 1では作らない。
- `dangerouslySetInnerHTML`を使用しない。
- 外部リンクには必要に応じて`rel="noopener noreferrer"`を付ける。
- 依存パッケージを必要最小限にする。
- Dependabotを有効化する。
- GitHub Actionsで型チェック、Lint、テスト、ビルドを実行する。
- CloudflareとGitHubの権限は必要最小限にする。
- Production環境の設定変更権限を限定する。

## 12. GitHub運用

- `main`への直接pushを禁止する。
- すべての変更でPull Requestを作成する。
- マージには1人以上のレビューを必須とする。
- CIが成功していることをマージ条件にする。
- 作業はIssueと対応させる。
- 可能なら小さな単位でPull Requestを作る。
- 部員には必要最小限のリポジトリ権限を付与する。
- ブランチ名は`feature/issue番号-概要`、`fix/issue番号-概要`などに統一する。
- 原則としてSquash mergeを使用する。

Pull Requestには、変更内容、確認方法、画面変更時のスクリーンショット、関連Issueを記載する。

## 13. CIで実行する処理

```text
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Cloudflare PagesのPreview DeployをPull Requestの動作確認に使用し、`main`へのマージ後にProductionへ反映する。

## 14. Cloudflare Pagesへの公開

Next.jsは静的エクスポートとして構成する。

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Cloudflare Pagesでは、GitHubリポジトリと連携して次を設定する。

| 項目 | 値 |
| --- | --- |
| Production branch | `main` |
| Build command | `pnpm build` |
| Build output directory | `out` |

参考資料：

- [Cloudflare Pages: Static Next.js site](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Next.js: Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

## 15. 実装フェーズ

### Phase 1: プロジェクト基盤

- Next.js、TypeScript、Tailwind CSS、pnpmをセットアップする。
- ESLint、Prettier、Vitestを設定する。
- Static Exportを設定する。
- GitHub用テンプレートとCIを追加する。

### Phase 2: デザイン基盤

- 色、フォント、余白、画面幅をデザイントークンとして定義する。
- ヘッダー、ナビゲーション、フッターを実装する。
- PCとスマートフォンの基本レイアウトを実装する。

### Phase 3: コンテンツ基盤

- コンテンツ用の型を定義する。
- お知らせ、作品、活動、リンクのサンプルデータを作る。
- データの並び順や必須項目を検証するテストを作る。

### Phase 4: 各ページ

- トップページを実装する。
- 活動紹介ページを実装する。
- 作品紹介ページを実装する。
- お知らせページを実装する。
- お問い合わせページを実装する。
- 各種リンクページを実装する。
- プライバシーポリシーページと404ページを実装する。

### Phase 5: 品質確認

- スマートフォン、タブレット、PC表示を確認する。
- キーボード操作を確認する。
- 見出し構造、代替テキスト、色のコントラストを確認する。
- Lighthouseを利用して品質上の問題を確認する。
- 外部リンク、誤字、仮データの残存を確認する。

### Phase 6: 公開

- Cloudflare Pagesへ接続する。
- Pull RequestのPreview Deployを確認する。
- Productionへ初回公開する。
- 独自ドメイン、HTTPS、リダイレクトを確認する。
- 更新手順をREADMEへ記載する。

## 16. Issue分割案

1. Next.jsプロジェクトの初期設定
2. ESLint、Prettier、Vitestの設定
3. GitHub ActionsとDependabotの設定
4. デザイントークンと共通スタイルの実装
5. ヘッダーとナビゲーションの実装
6. フッターの実装
7. コンテンツ型とサンプルデータの作成
8. トップページの実装
9. 活動紹介ページの実装
10. 作品紹介ページの実装
11. お知らせページの実装
12. お問い合わせページの実装
13. 各種リンクページの実装
14. プライバシーポリシーと404ページの実装
15. レスポンシブ・アクセシビリティ確認
16. Cloudflare PagesのPreview環境構築
17. 本番データへの置き換えと初回公開
18. 部員向け更新手順の作成

各Issueは、初心者でもレビューしやすい規模を目安に分割し直してよい。

## 17. Step 1の完了条件

- 7ページと404ページへ正常に移動できる。
- PCとスマートフォンで内容を読める。
- TypeScriptファイルの変更でお知らせ、作品、活動、リンクを更新できる。
- 型チェック、Lint、テスト、ビルドがCIで成功する。
- Pull RequestでCloudflareのPreviewを確認できる。
- `main`へのマージでProductionが更新される。
- 仮テキスト、仮リンク、生成画像が本番表示に残っていない。
- 個人情報と写真の公開許可を確認している。
- お問い合わせ方法とプライバシーポリシーの内容が一致している。
- READMEだけを読んで、部員がローカル起動とコンテンツ更新を行える。

## 18. Step 2への拡張方針

Step 1の完成後、バックエンド学習用のAPIを公式サイトから分離して追加する。

候補はCloudflare WorkersまたはGoogle Cloud Runとし、最初は`GET /health`や`GET /works`など、公開情報を返す読み取り専用APIから始める。APIが停止しても公式サイトを閲覧できる構成を維持する。
