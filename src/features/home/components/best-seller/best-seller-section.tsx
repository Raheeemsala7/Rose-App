import { getTranslations } from 'next-intl/server';
import { Product } from '@/src/features/products/types/product';
import BestSellerCarousel from './best-seller-carousel';
import { getProductsApi } from '@/src/features/products/apis/products';
import Explore from './explore';
import SectionTitle from '@/src/shared/components/section-title';

export async function BestSellerCarouselSlot({
  products,
  variant = 'default',
}: {
  variant?: 'default' | 'related';
  products: Product[];
}) {
  const t = await getTranslations('home');

  if (products.length === 0) {
    return (
      <p className="text-center py-8 text-burgundy-400 dark:text-burgundy-500">
        {t('noProductsFound')}
      </p>
    );
  }

  return <BestSellerCarousel products={products} variant={variant} />;
}

export default async function BestSellerSection() {
  const t = await getTranslations('home');

  let products: Product[] = [];
  try {
    const res = await getProductsApi({ sortBy: 'bestSelling', limit: 12 });
    products = res.payload.data;
  } catch {
    return null;
  }

  return (
    <section aria-label={t('bestSeller.title')} className="mt-16 mb-12">
      {/* ── Header ── */}
      <div className="mb-8">
        <SectionTitle
          subtitle={t('bestSeller.subtitle')}
          title={t('bestSeller.title')}
        />
      </div>

      {/* ── Two-column layout: explore panel + carousel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-3">
          <Explore />
        </div>
        <div className="lg:col-span-9">
          <BestSellerCarouselSlot products={products} />
        </div>
      </div>
    </section>
  );
}
