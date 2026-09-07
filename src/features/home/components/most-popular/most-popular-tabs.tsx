'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { cn } from '@/src/shared/lib/utils';
import { Occasion } from '@/src/features/occasions/types/occasions';

interface Props {
  occasions: Occasion[];
  activeId: string;
}

export default function MostPopularTabs({ occasions, activeId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectTab = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', id);
    startTransition(() => router.replace(`?${params.toString()}`, { scroll: false }));
  };

  return (
    <div className={cn('flex items-center gap-2 flex-wrap mt-2 transition-opacity', isPending && 'opacity-60')}>
      {occasions.map((occasion) => (
        <button
          key={occasion.id}
          type="button"
          onClick={() => selectTab(occasion.id)}
          disabled={isPending}
          aria-selected={activeId === occasion.id}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer select-none',
            activeId === occasion.id
              ? 'bg-burgundy-800 dark:bg-burgundy-700 text-cream-50 shadow-sm'
              : 'bg-cream-200 dark:bg-burgundy-900 text-burgundy-700 dark:text-cream-300 hover:bg-cream-300 dark:hover:bg-burgundy-800',
          )}
        >
          {occasion.title}
        </button>
      ))}
    </div>
  );
}
