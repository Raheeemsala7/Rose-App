export function getPageNumbers({ current, total }: { current: number, total: number }) {
    const pages = [];
    const siblingCount = 1;

    const start = Math.max(2, current - siblingCount);
    const end = Math.min(total - 1, current + siblingCount);

    pages.push(1);

    if (start > 2) pages.push("start-ellipsis");

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < total - 1) pages.push("end-ellipsis");

    if (total > 1) pages.push(total);

    return pages;
}