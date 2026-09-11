# 環境を準備してサイトを起動する

目標は、自分のPCのブラウザで公式サイトが表示されることです。本番公開の権限やCloudflareのアカウントは必要ありません。

## 1. 道具を用意する

| 道具                      | 用途                        | 入手先                                        |
| ------------------------- | --------------------------- | --------------------------------------------- |
| GitHubアカウント          | IssueやPRで相談・変更を共有 | [GitHub](https://github.com/)                 |
| Git                       | ファイルの変更履歴を管理    | [Git公式](https://git-scm.com/downloads)      |
| Node.js 22系（22.13以上） | 開発ツールを動かす          | [Node.js公式](https://nodejs.org/en/download) |
| エディター                | ファイルを編集              | 普段のエディターで構いません                  |

Node.jsのダウンロードでは22系を選びます。インストール後はターミナルを開き直してください。

このガイドのコマンドは、WindowsならGit Bash、macOSならターミナル、Linuxなら端末で実行してください。コマンド欄の1行を入力してEnterを押す、という操作を繰り返します。

```sh
git --version
node --version
npm --version
npm install -g pnpm@11.19.0
pnpm --version
```

`node --version` は22.13以上の22系、`pnpm --version` は `11.19.0` なら準備完了です。将来版が変わった場合は、[package.json](../package.json)の指定を優先します。インストールで権限エラーが出たら、[対処方法](troubleshooting.md)を確認してください。

## 2. コードをPCにコピーする

コードを置きたいフォルダーで実行します。`clone` はGitHubのコードと履歴をPCへコピーする操作です。

```sh
git clone https://github.com/NIT-Maizuru-Programmers-Community/Official_site.git
cd Official_site
```

以降はこの `Official_site` フォルダーでコマンドを実行します。すでにコピー済みならcloneは不要です。`package.json` が見えるフォルダーをエディターで開いてください。

## 3. 必要なパッケージを入れて起動する

```sh
pnpm install --frozen-lockfile
pnpm dev
```

初回インストールにはネット接続が必要です。`pnpm dev` は起動したまま待機するのが正常です。ブラウザで http://localhost:3000 を開くとサイトが表示されます。別のポートが案内された場合はターミナルのURLを使用してください。

お知らせ・作品が「準備中」でも正常です。サンプルが下書きになっているためです。ローカル起動に `.env` の作成や秘密鍵は不要です。

別のコマンドを実行するときは、同じフォルダーで2つ目のターミナルを開きます。サーバーを終了するときは、起動したターミナルでCtrl+Cを押します。

## 4. GitHubへ変更を送る準備

閲覧・cloneは誰でもできますが、部のリポジトリへpushするには管理者から書き込み権限を付与してもらう必要があります。参加者は自分のGitHubユーザー名を管理者へ伝えてください。権限がない間も、コードを読んだりIssueを投稿したりできます。

Gitの認証はWebサイトのログインとは別です。[GitHub CLI](https://cli.github.com/)を使う場合は、インストール後に以下を実行し、GitHub.com → HTTPS → ブラウザでのログインを選びます。

```sh
gh auth login
gh auth setup-git
```

すでにGitの認証ができていれば追加設定は不要です。HTTPSのGit操作では通常のGitHubパスワードは使いません。[公式の認証説明](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)も参照してください。トークンはIssueやチャットに貼らないでください。

準備できたら[最初のPR](first-pull-request.md)へ進みます。
