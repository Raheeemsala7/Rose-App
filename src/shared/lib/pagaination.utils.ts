type GetPageNumbersProps = {
  current: number;
  total: number;
};

export function getPageNumbers({
  current,
  total,
}: GetPageNumbersProps): (number | "...")[] {
  const pages: (number | "...")[] = [];

  const start = Math.max(2, current - 2);
  const end = Math.min(total - 1, current + 2);

  pages.push(1);

  if (start > 2) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total - 1) {
    pages.push("...");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}