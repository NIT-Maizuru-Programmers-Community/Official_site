# 小さな変更をして最初のPRを作る

PR（Pull Request）は「この変更を取り込んでください」というレビュー依頼です。まずは文章1か所の修正や、説明の改善から始めましょう。このガイドではGitHubへの書き込み権限と[初回セットアップ](getting-started.md)が済んでいることを前提にします。

## 1. Issueで作業内容を共有する

[Issues](https://github.com/NIT-Maizuru-Programmers-Community/Official_site/issues)で、既存の作業と重複していないか確認します。新しく作る場合は「開発・改善」を選び、「どの文章を、なぜ直したいか」を書きます。

以下はIssue番号が123だった場合の例です。`123` は実際の番号に置き換えてください。

## 2. 自分の作業ブランチを作る

まず変更中のファイルがないことを確認します。`git status` に変更が出た場合は、その作業を消したりせず、先に担当者へ相談してください。

```sh
git status
git switch main
git pull --ff-only origin main
git switch -c feature/123-improve-activity-copy
```

`main` は共有する完成版、作業ブランチは自分の変更を進める場所です。`git branch --show-current` で `feature/123-improve-activity-copy` と表示されれば準備完了です。

初回コミット前に、記録する名前・メールをこのリポジトリへ設定します。以下の値は自分のものに置き換えます。メールを公開したくない場合はGitHubのSettings → Emailsにある自分のnoreplyアドレスを使ってください。

```sh
git config user.name "自分の表示名"
git config user.email "自分のGitHub用メールアドレス"
```

## 3. 文章を修正して確認する

エディターで `src/content/activities.ts` を開き、Issueで決めた `summary` の文章を1か所修正します。引用符やカンマは残してください。

```sh
pnpm dev
```

http://localhost:3000/activities/ を開いて変更が反映されることを確認します。公開サイトはまだ変わりません。

別のターミナルで以下を実行します。`pnpm format` はファイルを書き換えて書式を整えるので、最後に差分を確認してください。

```sh
pnpm format
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
git diff
```

赤いエラーが出たら[困ったとき](troubleshooting.md)へ。解決できなくても、どこで困ったかを添えてDraft PRで相談できます。

## 4. 変更を記録してGitHubへ送る

今回は変更したファイルを指定して追加します。別のファイルを修正した場合は、そのパスに置き換えます。

```sh
git add src/content/activities.ts
git diff --cached
git commit -m "docs: improve activity description"
git push -u origin feature/123-improve-activity-copy
```

`git diff --cached` はコミットする差分です。意図しないファイルが含まれていたら、コミット前に相談してください。

## 5. GitHubでPRを作る

1. リポジトリのPull requestsからNew pull requestを開きます。push直後ならCompare & pull requestも使えます。
2. baseを `main`、compareを自分の作業ブランチにします。
3. 目的・変更内容・関連Issueを記入します。関連Issueに `Closes #123` と書くと、マージ時にそのIssueも閉じられます。
4. 確認欄にチェックし、結果・対象外の理由を記入します。未実施の項目にはチェックしません。
5. Create pull requestで作成します。作業途中はDraftを選び、準備できたらReady for reviewにします。
6. Checksの `validate` が成功することを確認し、別の部員にレビューを依頼します。

画面変更がない項目などは「対象外と確認した」場合にチェックして、理由を書きます。承認・CIが必要な理由は[共同開発ルール](../CONTRIBUTING.md)を参照してください。

## 6. レビューの修正とマージ後

指摘を受けたら同じブランチで修正・確認・commit・pushします。新しいPRを作る必要はありません。追加コミットで承認が失効するため、再レビューを依頼します。

mainが更新されてCIから最新化を求められたら、変更をコミットした状態で次を実行します。

```sh
git fetch origin
git merge origin/main
```

競合が出たら[対処方法](troubleshooting.md)へ。競合がなくマージできたら、チェックを実行して `git push` します。

PRはレビューとCIが完了してからSquash mergeします。最初は担当の部員にマージを任せても構いません。マージ後、作業中の変更がないことを確認して共有版を取り込みます。

```sh
git status
git switch main
git pull --ff-only origin main
```

次の作業は更新したmainから新しいブランチを作ります。Squash merge後に古いブランチを使い続けないでください。
