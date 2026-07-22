import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { MostPopularProductPanelsSlot, MostPopularTabListSlot } from './most-popular-content';
import { MostPopularSharedTabsProvider, ViewMoreLink } from './most-popular-shared-tabs';
// import { getMostPopularOccasionProducts } from '../../lib/utils/most-popular-data';
import ProductsErrorBoundary from '@/src/shared/error-boundary';
import { MostPopularProductsGridSkeleton, OccasionTabsSkeleton } from '@/src/features/products/skeletons/most-popular-section.skeleton';
import SectionTitle from '@/src/shared/components/section-title';

export default async function MostPopularSection() {
  // Translation
  const t = await getTranslations('home');
  // const occasionProductsPromise = getMostPopularOccasionProducts();

  return (
    <MostPopularSharedTabsProvider>
      <div className="mx-auto max-w-11/12 my-34">
        <div className="flex items-center justify-between">
          <SectionTitle title={t('mostPopular')} />

          <ProductsErrorBoundary>
            <Suspense fallback={<OccasionTabsSkeleton />}>
              {/* <MostPopularTabListSlot occasionProductsPromise={occasionProductsPromise} /> */}
            </Suspense>
          </ProductsErrorBoundary>
        </div>

        <ProductsErrorBoundary>
          <Suspense fallback={<MostPopularProductsGridSkeleton />}>
            {/* <MostPopularProductPanelsSlot occasionProductsPromise={occasionProductsPromise} /> */}
          </Suspense>
        </ProductsErrorBoundary>

        <ViewMoreLink />
      </div>
    </MostPopularSharedTabsProvider>
  );
}
