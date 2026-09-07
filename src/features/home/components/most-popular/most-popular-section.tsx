import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getOccasionsApi } from '@/src/features/occasions/apis/occasions.api';
import SectionTitle from '@/src/shared/components/section-title';
import MostPopularTabs from './most-popular-tabs';
import MostPopularProducts from './most-popular-products';
import ProductCardSkeleton from '@/src/features/products/skeletons/product-card-skeleton';

interface Props {
  /** Value of ?tab= from the page searchParams */
  activeTabId?: string;
}

export default async function MostPopularSection({ activeTabId }: Props) {
  const t = await getTranslations('home');

  let occasions;
  try {
    const res = await getOccasionsApi({ limit: 5 });
    occasions = res.payload.data;
  } catch {
    return null;
  }

  if (!occasions?.length) return null;

  /* Fall back to the first occasion if no tab param is set */
  const activeId = activeTabId && occasions.find((o) => o.id === activeTabId)
    ? activeTabId
    : occasions[0].id;

  return (
    <section aria-label={t('mostPopular')} className="mt-16 mb-12">
      <SectionTitle title={t('mostPopular')} />

      {/* Tab buttons — client component, only handles URL update */}
      <MostPopularTabs occasions={occasions} activeId={activeId} />

      {/*
        key={activeId} forces Suspense to remount when the tab changes,
        showing the skeleton while the new server fetch streams in.
        Each occasionId response is independently cached for 5 minutes.
      */}
      <Suspense
        key={activeId}
        fallback={
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} i={i} />
            ))}
          </div>
        }
      >
        <MostPopularProducts occasionId={activeId} />
      </Suspense>
    </section>
  );
}
