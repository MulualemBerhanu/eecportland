export type PagerItem =
  | { type: "page"; index: number }
  | { type: "ellipsis"; key: string };

/** Compact page list with ellipses when there are many pages (shared by gallery + video grid). */
export function buildPagerItems(currentPage: number, totalPages: number): PagerItem[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => ({
      type: "page" as const,
      index,
    }));
  }
  const set = new Set<number>([
    0,
    totalPages - 1,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);
  const sorted = [...set].filter((i) => i >= 0 && i < totalPages).sort((a, b) => a - b);
  const out: PagerItem[] = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) {
      out.push({ type: "ellipsis", key: `e-${sorted[i - 1]}-${sorted[i]}` });
    }
    out.push({ type: "page", index: sorted[i]! });
  }
  return out;
}
