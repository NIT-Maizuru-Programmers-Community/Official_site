import type { Work } from '@/types/content';
export const works = [
  {
    slug: 'puranavi-pig',
    title: 'ぷらなび.pig',
    summary:
      '貯金箱とタブレットのぬりえを組み合わせた、貯金の目標達成を支援する作品です。貯金した金額に応じてインクがたまり、ぬりえを進められます。',
    // 下書き作成日。公開時に実際の掲載日へ変更する。
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/Puranavi',
    websiteUrl: 'https://protopedia.net/prototype/6398',
    tags: ['Android', 'Arduino', 'Firebase', 'OpenCV'],
    draft: true,
  },
  {
    slug: 'neotama',
    title: 'ネオたま —お年玉v2.0—',
    summary:
      'お年玉を渡す体験を、親子の成長や思い出として残すシステムです。写真撮影や御朱印の発行、Webアプリでの記録を組み合わせた作品で、Hack U KOSEN 2024で優秀賞を受賞しました。',
    // 下書き作成日。公開時に実際の掲載日へ変更する。
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/NeoTama_hackukosen2024',
    tags: ['Python', 'MediaPipe', 'Arduino'],
    draft: true,
  },
  {
    slug: 'sdcs',
    title: 'SDCs —100年続くまちづくり—',
    summary:
      '物理的な駒を配置してまちをつくり、その変化を映像で見ながら地球温暖化などの環境問題を考える、体験型の環境学習システムです。第35回全国高等専門学校プログラミングコンテスト課題部門に向けて開発しました。',
    // 下書き作成日。公開時に実際の掲載日へ変更する。
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/SDCs_procon35',
    tags: ['Unity', 'C#', 'Python'],
    draft: true,
  },
  {
    slug: 'kotonoha',
    title: 'Kotonoha',
    summary:
      '盆栽と会話する体験を目指すプロジェクトです。盆栽のプロフィールやセンサー情報、会話の記憶を使った対話機能を開発しており、センサーの実機接続は今後の作業として案内されています。',
    // 下書き作成日。公開時に実際の掲載日へ変更する。
    publishedAt: '2026-10-30',
    repositoryUrl: 'https://github.com/DCON2026-mAIzuru/kotonoha',
    tags: ['Next.js', 'Go', 'Supabase', 'ESP32'],
    draft: true,
  },
  {
    slug: 'bushitsuou',
    title: '部⭐︎室⭐︎王',
    summary:
      '部室に足を運び、部員同士が交流するきっかけをつくる作品です。来室時のポイント、みんなで順位を予想するデイリーレース、メッセージ付きのポイント送信などを組み合わせ、部室の活性化を目指します。Hack U KOSEN 2025 OSAKAに向けて開発しました。',
    // 下書き作成日。公開時に実際の掲載日へ変更する。
    publishedAt: '2026-10-30',
    repositoryUrl:
      'https://github.com/NIT-Maizuru-Programmers-Community/BU-SHITU-OH_hackukosen2025',
    videoUrl: 'https://youtu.be/jdonjW2NpKw?t=844',
    tags: ['Vue', 'FastAPI', 'NFC'],
    draft: true,
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
