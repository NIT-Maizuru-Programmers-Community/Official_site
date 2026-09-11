import { ArrowLink } from '@/components/ui/content';
export default function NotFound() {
  return (
    <div className="page-wrap not-found">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <p className="error-number">
        404<span>.</span>
      </p>
      <h1>ページが見つかりません</h1>
      <p>URLが変更されたか、ページが削除された可能性があります。</p>
      <ArrowLink href="/">ホームへ戻る</ArrowLink>
    </div>
  );
}
