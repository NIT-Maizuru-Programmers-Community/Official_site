import { ArrowLink } from '@/components/ui/content';
import { ThreeScene } from '@/components/visual/three-scene';
export default function NotFound() {
  return (
    <div className="page-wrap not-found">
      <div className="not-found-copy">
        <p className="eyebrow">PAGE NOT FOUND</p>
        <p className="error-number">
          404<span>.</span>
        </p>
        <h1>ページが見つかりません</h1>
        <p>URLが変更されたか、ページが削除された可能性があります。</p>
        <ArrowLink href="/">ホームへ戻る</ArrowLink>
      </div>
      <ThreeScene compact variant="404" />
    </div>
  );
}
