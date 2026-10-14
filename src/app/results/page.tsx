import { results } from '@/content/results';
import { AchievementList, PageHeading } from '@/components/ui/content';
import { orderedAchievements } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  '大会・イベント実績',
  '高専プロコンやハッカソンなど、部員の大会・イベント実績を紹介します。',
  '/results',
);

export default function Results() {
  return (
    <div className="page-wrap">
      <PageHeading
        number="04"
        english="RESULTS"
        title="大会・イベント実績"
        description="挑戦の記録と、ものづくりの成果。"
      />
      <h2 className="sr-only">大会・イベント実績一覧</h2>
      <AchievementList items={orderedAchievements(results)} />
    </div>
  );
}
