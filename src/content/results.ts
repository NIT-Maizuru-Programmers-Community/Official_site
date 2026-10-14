import type { Achievement } from '@/types/content';

export const results = [
  {
    slug: 'procon-37-2026',
    title: '第37回 全国高等専門学校プログラミングコンテスト',
    eventName: '全国高等専門学校プログラミングコンテスト',
    eventYear: 2026,
    summary:
      '自由部門「かんおん‼」が本選に出場し、競技部門は準決勝に出場しました。',
    publishedAt: '2026-10-11',
    outcomes: [
      { division: '自由部門', entry: 'かんおん‼', result: '本選出場' },
      { division: '競技部門', result: '準決勝出場' },
    ],
    body: [
      '第37回大会では、自由部門「かんおん‼」が本選に出場しました。競技部門では準決勝に進出しました。',
    ].join('\n\n'),
    sources: [
      {
        title: '第37回大会 自由部門本選結果',
        url: 'https://www.procon.gr.jp/uploads/media/Bfg64ajgVAA',
      },
      {
        title: '第37回大会 競技部門準決勝第1試合結果',
        url: 'https://www.procon.gr.jp/uploads/media/BfgfE6mQVAA',
      },
    ],
  },
  {
    slug: 'procon-36-2025',
    title: '第36回 全国高等専門学校プログラミングコンテスト',
    eventName: '全国高等専門学校プログラミングコンテスト',
    eventYear: 2025,
    summary:
      '自由部門・課題部門の3作品が本選に出場し、AQUARIUMOTIONがピクシブ株式会社企業賞を受賞。競技部門は準決勝に出場しました。',
    publishedAt: '2025-10-12',
    outcomes: [
      { division: '自由部門', entry: 'よせぎゅっと', result: '本選出場' },
      { division: '課題部門', entry: 'BAMBOT', result: '本選出場' },
      {
        division: '課題部門',
        entry: 'AQUARIUMOTION',
        result: '本選出場・ピクシブ株式会社企業賞',
      },
      { division: '競技部門', result: '準決勝出場' },
    ],
    body: [
      '第36回大会では、自由部門「よせぎゅっと」と課題部門「BAMBOT」「AQUARIUMOTION」が本選に出場しました。AQUARIUMOTIONはピクシブ株式会社企業賞を受賞し、競技部門では準決勝に出場しました。',
    ].join('\n\n'),
    sources: [
      {
        title: '第36回大会 自由部門本選結果',
        url: 'https://www.procon.gr.jp/uploads/media/BaOh_qAwVAA',
      },
      {
        title: '第36回大会 課題部門本選結果',
        url: 'https://www.procon.gr.jp/wp-content/uploads/2025/10/b946818214002dee844fcaaf2819207b.pdf',
      },
      {
        title: '第36回大会 企業賞一覧',
        url: 'https://www.procon.gr.jp/uploads/media/BaOiBFVAVAA',
      },
      {
        title: '第36回大会アーカイブ',
        url: 'https://www.procon.gr.jp/archive/2025/',
      },
    ],
  },
] satisfies readonly Achievement[];
