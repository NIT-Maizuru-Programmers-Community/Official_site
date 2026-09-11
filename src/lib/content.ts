import type { DatedContent } from '@/types/content';
export function published<T extends DatedContent>(items: readonly T[]): T[] {
  return items
    .filter((item) => !item.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function formatDate(date: string): string {
  return date.replaceAll('-', '.');
}
export function isValidDate(date: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(Date.parse(date)) &&
    new Date(date).toISOString().slice(0, 10) === date
  );
}
