import type { Work } from '@/types/content';
export const works = [
  {
    slug: 'puranavi-pig',
    title: 'ぷらなび.pig',
    summary:
      '貯金箱とタブレットのぬりえを組み合わせた、貯金の目標達成を支援する作品です。貯金した金額に応じてインクがたまり、ぬりえを進められます。',
    body: [
      '# 作品について',
      '貯金箱とタブレットアプリを組み合わせ、貯金をしながらぬりえを楽しめるようにした作品です。貯金額に応じてたまるインクを使い、絵を塗り進めます。',
      '# 開発について',
      'AndroidアプリやArduino、Firebase、OpenCVを使って開発しました。作品ページでは、詳しい仕組みを紹介しています。',
    ].join('\n\n'),
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/Puranavi',
    websiteUrl: 'https://protopedia.net/prototype/6398',
    tags: ['Android', 'Arduino', 'Firebase', 'OpenCV'],
  },
  {
    slug: 'neotama',
    title: 'ネオたま —お年玉v2.0—',
    summary:
      'お年玉を渡す体験を、親子の成長や思い出として残すシステムです。写真撮影や御朱印の発行、Webアプリでの記録を組み合わせた作品で、Hack U KOSEN 2024で優秀賞を受賞しました。',
    body: [
      '# 作品について',
      'お年玉を渡すだけでなく、その時間を親子の思い出として残すことを目指しました。お年玉ボックスの前で写真を撮り、発行された御朱印をWebアプリに記録します。',
      '# 発表',
      'Hack U KOSEN 2024で発表し、優秀賞を受賞しました。',
    ].join('\n\n'),
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/NeoTama_hackukosen2024',
    tags: ['Python', 'MediaPipe', 'Arduino'],
  },
  {
    slug: 'sdcs',
    title: 'SDCs —100年続くまちづくり—',
    summary:
      '物理的な駒を配置してまちをつくり、その変化を映像で見ながら地球温暖化などの環境問題を考える、体験型の環境学習システムです。第35回全国高等専門学校プログラミングコンテスト課題部門に向けて開発しました。',
    body: [
      '# 作品について',
      '駒を置いてまちをつくり、その変化を映像で見ることで、環境問題について体験しながら考える作品です。地球温暖化をはじめとする問題への関心を高めることを目指しました。',
      '# 開発について',
      '第35回全国高等専門学校プログラミングコンテストの課題部門に向けて開発しました。',
    ].join('\n\n'),
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/SDCs_procon35',
    tags: ['Unity', 'C#', 'Python'],
  },
  {
    slug: 'kotonoha',
    title: 'Kotonoha',
    summary:
      '盆栽と会話する体験を目指すプロジェクトです。盆栽のプロフィールやセンサー情報、会話の記憶を使った対話機能を開発しており、センサーの実機接続は今後の作業として案内されています。',
    body: [
      '# 作品について',
      '盆栽の名前や性格を設定し、会話を楽しむ体験を目指しています。会話履歴に加えて、センサーから得た状態を返答に反映する仕組みを開発しています。',
      '# 開発状況',
      '公開リポジトリでは、Webアプリや会話履歴を使った対話機能などを紹介しています。ESP32の実機側コードの最終整備と接続確認は、今後の作業として記載されています。',
    ].join('\n\n'),
    publishedAt: '2026-10-30',
    repositoryUrl: 'https://github.com/DCON2026-mAIzuru/kotonoha',
    tags: ['Next.js', 'Go', 'Supabase', 'ESP32'],
  },
  {
    slug: 'bushitsuou',
    title: '部⭐︎室⭐︎王',
    summary:
      '部室に足を運び、部員同士が交流するきっかけをつくる作品です。来室時のポイント、みんなで順位を予想するデイリーレース、メッセージ付きのポイント送信などを組み合わせ、部室の活性化を目指します。Hack U KOSEN 2025 OSAKAに向けて開発しました。',
    body: [
      '# 作品について',
      '部室に足を運び、対面で交流するきっかけを増やすための作品です。来室に応じたポイントや、みんなで順位を予想するデイリーレースを通して、部室に行く楽しさをつくることを目指しました。',
      '# 交流のきっかけ',
      '発表では、メッセージとともにポイントを送る仕組みや、来室人数に応じてアートが現れる仕組みも紹介しました。共通の話題や目的を生み、部員同士の関わりを広げる構想です。',
      '# 発表',
      'Hack U KOSEN 2025 OSAKAに向けて開発しました。関連リンクから大会の発表動画をご覧いただけます。',
    ].join('\n\n'),
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/BU-SHITU-OH_hackukosen2025',
    videoUrl: 'https://youtu.be/jdonjW2NpKw?t=844',
    tags: ['Vue', 'FastAPI', 'NFC'],
  },
  {
    slug: 'first-work',
    title: '作品タイトル',
    summary: '公開を承認された作品の概要に置き換えてください。',
    publishedAt: '2026-09-11',
    tags: ['TypeScript'],
    draft: true,
  },
] satisfies readonly Work[];
