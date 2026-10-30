# PRレビューの仕組み

このページは `main` 向けPull Request（PR）のレビューと承認の運用を説明します。GitHub上の設定は2026年10月30日に確認した内容です。設定やチームのメンバーが変わった場合は、この案内も更新してください。

## レビュー依頼と承認

- 承認担当はOrganizationの [`site-approvers`](https://github.com/orgs/NIT-Maizuru-Programmers-Community/teams/site-approvers) チームです。現在のメンバーは `HizKz`、`matsudayuta0329`、`KabutoEbi`、`Saba3939` です。
- `main-review-policy` では、対象ファイルの変更に `site-approvers` のメンバー1人以上の承認を要求します。通常の `Write` 権限の人の承認だけでは、このチームの承認条件は満たせません。
- チームへのレビュー依頼は、自動割り当てで2人を順番に選ぶ設定です。2人に依頼しても、必須の承認数は1人です。PR作成者は自分のPRを承認できず、Busyのメンバーも自動割り当ての対象外です。候補者が足りなければ2人に依頼できない場合があります。
- 自動割り当てはチームへのレビュー依頼が発生したときに動きます。PR作成後にReviewers欄を確認し、依頼が付いていなければ `site-approvers` に依頼してください。PR #41では、チームへの依頼と2人への自動割り当てを確認しました。
- 新しいコミットのpushで古い承認は失効します。修正後は再レビューを依頼してください。

レビュー担当者は差分と確認結果を確認し、必要に応じてコメントや変更要求を出します。問題がなければApproveを送信します。AIレビューは人による承認の代わりにはなりません。

## マージの条件と管理者の迂回

通常は承認に加え、必須CI `validate` の成功と、未解決レビュースレッドの解決が必要です。`main-base-protection` はPR必須、force push・ブランチ削除の禁止も適用し、管理者を含め迂回できません。

管理者はPR経由に限り `main-review-policy` の承認条件を迂回できます。必要な場合は差分・確認結果を確認し、CIの成功とスレッドの解決を済ませ、承認を省略した理由をPR本文などに残してください。直接pushや基本保護の迂回はできません。

詳しい運用は[開発・更新への参加方法](../CONTRIBUTING.md)を参照してください。

## 設定を管理する人へ

自動割り当てはチームのSettings → Code reviewで管理します。現在の設定は、2人、Round robin、チーム全体への通知なしです。チームへの依頼を残す設定です。メンバー追加はOrganizationのチーム管理から行います。チームに付与されたリポジトリの `Write` 権限は、レビュー以外にpushや条件を満たしたPRのマージなども許可します。

自分のPRに自分でApproveできないため、担当者がPRを作る場合にも2人に依頼できるよう、承認担当を3人以上確保してください。Busyや不在も考慮し、必要に応じて担当者を増やします。

## 参考

- [GitHub：チームのレビュー自動割り当て](https://docs.github.com/en/organizations/organizing-members-into-teams/managing-code-review-settings-for-your-team)
- [GitHub：Rulesetのレビュー条件](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [GitHub：自分のPRは承認できない](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews)
