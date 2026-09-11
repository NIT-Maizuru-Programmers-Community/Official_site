# 開発・更新への参加方法

初参加の方は[環境の準備](docs/getting-started.md) → [最初のPR](docs/first-pull-request.md)の順に進んでください。このページはレビュー・マージの共通ルールをまとめています。

## 基本の流れ

1. Issueで目的・変更内容・完了条件を共有します。開発・改善または不具合報告のテンプレートを使用してください。
2. 最新の `main` から作業ブランチを作ります。名前は `feature/Issue番号-概要` または `fix/Issue番号-概要` を基本とし、自動支援ツールの作業では `codex/概要` も使用します。
3. 小さな変更単位で作業し、変更に合った動作確認をします。文書だけの変更は内容とリンクを確認してください。
4. 作業ブランチをpushし、`main` に向けたPull Requestを作成します。目的、変更内容、関連Issue、確認結果をテンプレートに沿って記載してください。
5. 書き込み権限を持つ別の部員にレビューを依頼し、1人以上の承認を得ます。指摘への対応後、未解決のレビュースレッドを解決します。
6. Squash mergeで取り込みます。マージ済みブランチはGitHubが自動削除します。

PRテンプレートの確認結果は、実施済み・未実施・対象外を区別し、未実施または対象外の理由を記載してください。秘密情報や無許可の写真をIssue・PR・コミットに含めないでください。

## mainの保護

`main` には2つの有効なRulesetを適用します。

| Ruleset                | 内容                                                                                        | 迂回権限                           |
| ---------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------- |
| `main-base-protection` | PR必須、未解決レビュースレッドの解決必須、force push・ブランチ削除の禁止、必須CI `validate` | 管理者を含めなし                   |
| `main-review-policy`   | 他者1人以上の承認、新しいコミットで古い承認を失効                                           | Repository adminのみ、PR経由に限定 |

通常の部員は承認を得てからマージします。新しいコミットをpushした場合、再レビューを依頼してください。

## 管理者が承認を省略する場合

GitHubの仕様上、自分が作成したPRに自分でApproveを付けることはできません。管理者は、自分または他者のPRで承認条件を迂回してマージできます。

1. 必ずPRを作成し、差分と確認結果を確認します。
2. 未解決のレビュースレッドを解決します。必須CI `validate` の成功も必要です。
3. GitHubのマージ欄で、承認ルールの迂回を選択してSquash mergeします。UIの表記はGitHubの表示によって異なります。
4. PR本文などに承認を省略した理由を残してください。

管理者の迂回は `main-review-policy` のみに適用します。直接push、force push、ブランチ削除を許可するものではありません。

## CIとマージ条件

main向けPR、mainへのpush、手動実行でGitHub Actionsの `validate` が動きます。Node.js 22と指定版pnpmで、依存インストール、整形、Lint、型チェック、テスト、静的ビルドを順に検証します。

`main-base-protection` の必須チェックはGitHub Actionsが提供する `validate` です。mainの最新状態に対する成功を要求し、管理者も迂回できません。mainが更新された場合は作業ブランチに取り込み、CIの再実行が成功してからマージしてください。

チェックリストでは実施済み、または対象外と確認した項目にチェックします。対象外は理由を記載し、未実施は未チェックのまま理由を残してください。チェックボックス自体をCIで自動強制する仕組みはありません。

## 参考

- [GitHub：自分のPRは承認できない](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews)
- [GitHub：RulesetとPR限定の迂回](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)
