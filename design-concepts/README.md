# Official Site Design Concepts

部活公式サイトの方向性を比較するため、built-in `image_gen` で作成したUIモックアップです。
画像内の文章、日付、制作物名、人物・風景はすべてデザイン検討用の仮素材です。

## 1. Tech Academic

学校公式サイトとしての信頼感を優先した案です。白、濃紺、青、控えめなシアンを使い、
技術資料を思わせるグリッドやコード表現を加えています。

- `academic/academic-desktop-home.png`: PC向けトップページ
- `academic/academic-mobile-home.png`: スマホ向けトップページ
- `academic/academic-desktop-works.png`: PC向け制作物一覧

Prompt set: high-fidelity and production-ready UI mockups for a Japanese school programming club;
white and pale blue-gray surfaces, deep navy and restrained cyan accents, technical grid decoration,
accessible typography, practical Tailwind-compatible cards, navigation, calls to action and footer;
no browser/device frame, no copied brand, no watermark, no excessive neon or glassmorphism.

## 1b. Tech Academic v2

初稿の生成AIらしい装飾を減らし、実在する `Noto Sans JP` と `Inter` をフォント指定した
再設計案です。架空のコード画面、回路線、浮遊する図形、意味の薄い英字装飾、手書き文字、
グラデーション、ガラス表現を避け、学校広報サイトとして一般的な罫線、矩形、余白、整列を
中心にしています。

- `academic-v2/academic-v2-desktop-home.png`: PC向けトップページ
- `academic-v2/academic-v2-mobile-home.png`: スマホ向けトップページ
- `academic-v2/academic-v2-desktop-works.png`: PC向け制作物一覧

Prompt set: revise the academic concept into a credible human-designed Japanese school club website;
use real typefaces Noto Sans JP for Japanese and Inter for Latin text and numerals; conventional header,
flat white/navy/blue palette, thin rules, honest rectangular sections, restrained radii, accessible spacing;
remove fake terminals, fake devices, circuit decoration, floating geometry, random English microcopy,
handwriting, gradients, glassmorphism, excessive shadows, 3D effects and identifiable people.

## 1c. Tech Academic v3 — Editorial Flow

カードや均等なブロックの集合をやめ、大学広報や編集紙面に近い連続レイアウトへ再設計した案です。
見出し、余白、写真の切り取り、細い罫線、番号によって情報を整理しています。

- `academic-v3/academic-v3-desktop-home.png`: PC向けトップページ

Prompt set: redesign without cards, tiles, equal-size blocks, rounded containers, colored section bands,
dashboard patterns or SaaS landing-page conventions; use Noto Sans JP and Inter, an asymmetric editorial
hero, ruled news index, numbered full-width activities, typographic works index, abundant white space,
documentary photo crops, square corners and one restrained cobalt accent.

## 1d. Tech Academic v4 — Unruled News

v3のお知らせ欄にあった罫線リストを廃止した案です。注目記事1件と小さな記事2件を、
囲みや区切り線を使わず、日付、見出し、要約、余白の差だけで整理しています。

- `academic-v4/academic-v4-desktop-home.png`: PC向けトップページ

Prompt set: preserve the v3 editorial page while replacing only the news section with one featured
announcement and two secondary announcements; use typography and asymmetric whitespace only;
no horizontal or vertical rules, tables, timelines, cards, boxes, badges, dots, equal columns,
background bands, gradients, shadows or decorative microcopy.

## 2. Dark Neon Terminal

プログラミング部らしい技術感と挑戦的な雰囲気を強く出した案です。黒から濃紺を土台に、
エメラルドと紫を限定的に使い、ゲームサイトにならないよう情報設計を抑制しています。

- `neon/neon-terminal-home-desktop.png`: PC向けトップページ
- `neon/neon-terminal-home-mobile.png`: スマホ向けトップページ
- `neon/neon-terminal-works-desktop.png`: PC向け制作物一覧

Prompt set: high-fidelity and implementation-ready UI mockups for an official Japanese school
programming club; near-black and midnight navy surfaces, restrained emerald and violet accents,
terminal-inspired details, strong contrast, disciplined grids and reusable Tailwind components;
no gaming HUD, cyberpunk scenery, crypto styling, code rain, watermark or impossible floating UI.

## 1e. Kosen Reference — Activity First

舞鶴・東京・奈良・仙台高専などの公式サイトと、高専の情報系学科サイトを確認して、
学校名が明確なヘッダー、実際の活動写真、具体的な日付と予定、制作物、入部案内を優先した案です。
均等なカードの反復、罫線リスト、抽象的なIT装飾、マーケティング風の大見出しを避け、
学生と顧問が更新する現実的な部活サイトの情報密度を目指しています。

- `kosen-reference/kosen-reference-desktop-home.png`: PC向けトップページ

Prompt set: create a credible Japanese KOSEN programming-club homepage informed by institutional
mastheads, practical navigation and authentic activity photography; show factual recent activity,
the next meeting, works and a recruitment note in an uneven editorial composition; avoid repeated
cards, ruled lists, colored bands, pills, dashboards, startup slogans, abstract technology graphics,
fake terminals, gradients, glass effects, excessive rounding and copied school branding; specify
Noto Sans JP for Japanese and Inter for Latin text, numerals and dates.

## 1f. Kosen Editorial — SANKOU! Reference

高専公式サイトの信頼性を残しつつ、SANKOU! の学校・教育カテゴリに見られる、
文字の大きなジャンプ率、大胆な写真トリミング、非対称な余白、画面外へ続く色面構成を
取り入れた案です。情報を一画面へ詰め込まず、ファーストビューでは部活名と活動風景を
印象づけ、次の活動記事が下端から見える構成にしています。

- `kosen-editorial/kosen-editorial-desktop-home.png`: PC向けトップページ

Prompt set: combine the credibility of a real Japanese KOSEN site with contemporary Japanese
editorial art direction; use one dominant candid club-room photograph, dramatic Noto Sans JP
typographic hierarchy, asymmetric cropping, warm off-white, ink navy, one broad cobalt plane and
one small yellow factual accent; keep the institutional masthead and practical navigation; avoid
repeated cards, modular dashboards, rounded boxes, gradients, glass effects, abstract tech art,
fake terminals, copied branding and a dense everything-in-one-view composition.

## 3. Campus Editorial

学生同士の活動やものづくりの温度感を伝える案です。白から生成りを土台に、オレンジと
黄緑をアクセントとして使い、学校案内や学生誌のような余白と写真構成を採用しています。

- `campus/campus-editorial-desktop-home.png`: PC向けトップページ
- `campus/campus-editorial-mobile-home.png`: スマホ向けトップページ
- `campus/campus-editorial-desktop-works.png`: PC向け制作物一覧

Prompt set: high-fidelity and realistically implementable UI mockups for a Japanese school
programming club; warm white and cream surfaces, charcoal type, controlled orange and yellow-green
accents, magazine-like spacing, student activity imagery focused on hands or rear views, practical
Tailwind cards and grids; no identifiable real person, childish motifs, copied brand or watermark.

## Shared screens and constraints

Each concept contains the same three screens for comparison: desktop homepage, mobile homepage and
desktop works listing. All prompts requested the labels `NITMC Programmers Community` and
`プログラマーズコミュニティ部`, accessible contrast, a realistic Next.js + Tailwind implementation,
and no existing logos or brand imitation. Generated text must be replaced with real HTML content when
the selected concept is implemented.
