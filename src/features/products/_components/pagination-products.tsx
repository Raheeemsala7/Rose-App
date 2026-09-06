'use client';

import { getPageNumbers } from '@/src/shared/lib/pagaination.utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';
import { cn } from '@/src/shared/lib/utils';

function PageButton({
  children,
  active = false,
  disabled = false,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-400',
        disabled && 'opacity-40 cursor-not-allowed',
        !disabled && !active && [
          'border border-cream-300 dark:border-burgundy-700',
          'text-burgundy-700 dark:text-cream-200',
          'hover:bg-cream-200 dark:hover:bg-burgundy-800',
          'bg-white dark:bg-burgundy-900',
        ],
        active && [
          'bg-burgundy-800 dark:bg-burgundy-600 text-cream-50',
          'border border-burgundy-800 dark:border-burgundy-600',
          'shadow-sm',
        ],
      )}
    >
      {children}
    </button>
  );
}

export default function PaginationProducts({
  page,
  totalPages = 10,
}: {
  page: number;
  totalPages?: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pages = getPageNumbers({ current: page, total: totalPages });

  const goTo = (p: number) => {
    const clamped = Math.min(Math.max(p, 1), totalPages);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', clamped.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    /* dir="ltr" keeps page numbers left-to-right in both locales */
    <div dir="ltr" className="flex items-center justify-center gap-1 py-6 flex-wrap">
      <PageButton ariaLabel="First page"    disabled={page === 1}          onClick={() => goTo(1)}>          <ChevronsLeft  size={15} /></PageButton>
      <PageButton ariaLabel="Previous page" disabled={page === 1}          onClick={() => goTo(page - 1)}>   <ChevronLeft   size={15} /></PageButton>

      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <PageButton key={p} active={p === page} onClick={() => goTo(p)}>
            {p}
          </PageButton>
        ) : (
          <span
            key={`ellipsis-${idx}`}
            className="inline-flex h-9 w-9 items-center justify-center text-sm text-burgundy-400 dark:text-burgundy-500 select-none"
          >
            …
          </span>
        )
      )}

      <PageButton ariaLabel="Next page" disabled={page === totalPages} onClick={() => goTo(page + 1)}> <ChevronRight  size={15} /></PageButton>
      <PageButton ariaLabel="Last page" disabled={page === totalPages} onClick={() => goTo(totalPages)}><ChevronsRight size={15} /></PageButton>
    </div>
  );
}
