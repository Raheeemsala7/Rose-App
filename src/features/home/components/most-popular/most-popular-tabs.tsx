'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { cn } from '@/src/shared/lib/utils';
import { Occasion } from '@/src/features/occasions/types/occasions';
import { useGetProductsQuery } from '@/src/features/products/hooks/products.hook';
import ProductCard from '@/src/features/products/_components/product-card';
import ProductCardSkeleton from '@/src/features/products/skeletons/product-card-skeleton';

interface Props {
  occasions: Occasion[];
}

export default function MostPopularTabs({ occasions }: Props) {
  const t      = useTranslations('home');
  const locale = useLocale();
  const isRTL  = locale === 'ar';

  const [activeId, setActiveId] = useState(occasions[0]?.id ?? '');

  const { data, isLoading } = useGetProductsQuery({
    occasionId: activeId,
    limit: 12,
    sortBy: 'mostPopular' as any,
  });

  const products = data?.payload.data ?? [];

  return (
    <div>
      {/* Tab list */}
      <div className="flex items-center gap-2 flex-wrap mt-2">
        {occasions.map((occasion) => (
          <button
            key={occasion.id}
            type="button"
            onClick={() => setActiveId(occasion.id)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer',
              activeId === occasion.id
                ? 'bg-burgundy-800 dark:bg-burgundy-700 text-cream-50'
                : 'bg-cream-200 dark:bg-burgundy-900 text-burgundy-700 dark:text-cream-300 hover:bg-cream-300 dark:hover:bg-burgundy-800'
            )}
          >
            {occasion.title}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} i={i} />)
          : products.map((product) => <ProductCard key={product.id} {...product} />)}
      </div>

      {products.length === 0 && !isLoading && (
        <p className="text-center py-12 text-burgundy-400 dark:text-burgundy-500">
          {t('noProductsForOccasion')}
        </p>
      )}

      {/* View more */}
      <div className="flex justify-end mt-6">
        <Link
          href={activeId ? `/products?occasionId=${activeId}` : '/products'}
          className="flex items-center gap-2 text-sm font-medium text-burgundy-700 dark:text-blush-300 hover:text-blush-600 transition-colors no-underline"
        >
          {t('viewMore')}
          {isRTL ? <MoveLeft size={16} /> : <MoveRight size={16} />}
        </Link>
      </div>
    </div>
  );
}
