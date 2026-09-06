import { getTranslations } from 'next-intl/server';
import { getOccasionsApi } from '@/src/features/occasions/apis/occasions.api';
import SectionTitle from '@/src/shared/components/section-title';
import MostPopularTabs from './most-popular-tabs';

export default async function MostPopularSection() {
  const t = await getTranslations('home');

  let occasions;
  try {
    const res = await getOccasionsApi({ limit: 5 });
    occasions = res.payload.data;
  } catch {
    return null;
  }

  if (!occasions?.length) return null;

  return (
    <section aria-label={t('mostPopular')} className="mt-16 mb-12">
      <div className="flex items-center justify-between mb-2">
        <SectionTitle title={t('mostPopular')} />
      </div>

      <MostPopularTabs occasions={occasions} />
    </section>
  );
}
