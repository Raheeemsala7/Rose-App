'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/src/shared/lib/utils';
import { useSearchParams } from 'next/navigation';

interface MobileFilterDrawerProps {
  children: React.ReactNode;
}

export default function MobileFilterDrawer({ children }: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('filters');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const searchParams = useSearchParams();

  /* Close drawer when filters change (user applied a filter) */
  useEffect(() => { setOpen(false); }, [searchParams]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Count active filters for badge */
  const activeCount = [
    searchParams.has('categoryId'),
    searchParams.has('occasionId'),
    searchParams.has('minRating'),
    searchParams.has('minPrice'),
    searchParams.has('maxPrice'),
  ].filter(Boolean).length;

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer',
          'bg-burgundy-800 dark:bg-burgundy-700 text-cream-50',
          'hover:bg-burgundy-700 dark:hover:bg-burgundy-600',
        )}
        aria-expanded={open}
        aria-controls="filter-drawer"
      >
        <SlidersHorizontal size={16} />
        {t('filters')}
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blush-500 text-white text-[10px] font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Backdrop ── */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* ── Drawer panel ──
          Attaches to the leading edge (start-0 = left in LTR, right in RTL).
          translate direction must match the physical side.
      */}
      <aside
        id="filter-drawer"
        aria-label={t('filters')}
        aria-hidden={!open}
        className={cn(
          'fixed top-0 z-50 h-full w-80 max-w-[90vw]',
          'bg-cream-50 dark:bg-burgundy-950',
          'shadow-2xl transition-transform duration-300 ease-in-out lg:hidden',
          'flex flex-col',
          'start-0',
          open
            ? 'translate-x-0'
            : isRTL
              ? 'translate-x-full'
              : '-translate-x-full',
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-300 dark:border-burgundy-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-burgundy-700 dark:text-blush-300" />
            <span className="text-base font-semibold text-burgundy-900 dark:text-cream-100">
              {t('filters')}
            </span>
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blush-500 text-white text-[10px] font-bold">
                {activeCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close filters"
            className="p-1.5 rounded-full text-burgundy-600 dark:text-blush-200 hover:bg-burgundy-100 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {children}
        </div>
      </aside>
    </>
  );
}
