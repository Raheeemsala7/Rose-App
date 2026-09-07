import { Link } from '@/src/i18n/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

export default async function Explore() {
  const t      = await getTranslations('home.bestSeller');
  const locale = await getLocale();
  const isRTL  = locale === 'ar';

  return (
    <div className="flex flex-col justify-between h-full gap-6 p-6 rounded-2xl bg-cream-200 dark:bg-burgundy-900 border border-cream-300 dark:border-burgundy-800">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xl md:text-2xl text-burgundy-900 dark:text-cream-100 leading-snug">
          {t.rich('description', {
            highlight: (chunks) => (
              <span className="text-blush-600 dark:text-blush-300">{chunks}</span>
            ),
          })}
        </p>

        <p className="text-sm md:text-base text-burgundy-500 dark:text-burgundy-400 leading-relaxed">
          {t.rich('subDescription', {
            br: () => <br />,
          })}
        </p>
      </div>

      <Link
        href="/products"
        className="flex items-center justify-center gap-2.5 py-2.5 px-5 rounded-xl w-full
          bg-burgundy-800 hover:bg-burgundy-700 dark:bg-burgundy-700 dark:hover:bg-burgundy-600
          text-cream-50 font-semibold text-sm transition-colors no-underline"
      >
        {t('exploreButton')}
        {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
      </Link>
    </div>
  );
}
