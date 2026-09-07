import { getProductsApi } from '@/src/features/products/apis/products';
import { Product } from '@/src/features/products/types/product';
import ProductCard from '@/src/features/products/_components/product-card';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/src/i18n/navigation';
import { MoveRight, MoveLeft } from 'lucide-react';
import { getLocale } from 'next-intl/server';

interface Props {
  occasionId: string;
}

/**
 * Async server component — fetched with revalidate:300 cache (set in getProductsApi).
 * Each unique occasionId gets its own cache entry, so switching tabs back is instant.
 */
export default async function MostPopularProducts({ occasionId }: Props) {
  const t      = await getTranslations('home');
  const locale = await getLocale();
  const isRTL  = locale === 'ar';

  let products: Product[] = [];
  try {
    const res = await getProductsApi({
      occasionId,
      limit: 12,
      sortBy: 'mostPopular' as any,
    });
    products = res.payload.data;
  } catch {
    products = [];
  }

  if (products.length === 0) {
    return (
      <p className="text-center py-16 text-burgundy-400 dark:text-burgundy-500">
        {t('noProductsForOccasion')}
      </p>
    );
  }

  return (
    <div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Link
          href={occasionId ? `/products?occasionId=${occasionId}` : '/products'}
          className="flex items-center gap-1.5 text-sm font-medium text-burgundy-700 dark:text-blush-300 hover:text-blush-600 transition-colors no-underline"
        >
          {t('viewMore')}
          {isRTL ? <MoveLeft size={16} /> : <MoveRight size={16} />}
        </Link>
      </div>
    </div>
  );
}
