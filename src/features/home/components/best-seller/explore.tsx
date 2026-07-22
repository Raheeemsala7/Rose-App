
import { Link } from '@/src/i18n/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function Explore() {
  // Translation
  const t = useTranslations('home.bestSeller');
  // Variables
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="flex justify-between flex-col h-full">
      <div>
        {/* section title */}
        {/* <SectionSmallTitle title={t('bestSelling')} /> */}

        {/* main title */}
        <p className="text-ds-text-secondary font-bold text-2xl w-10/12 mb-2">
          {t.rich('description', {
            highlight: (chunks) => <span className="text-ds-text-primary">{chunks}</span>,
          })}
        </p>

        <p className="text-zinc-500 dark:text-zinc-400 text-base w-11/12">
          {t.rich('subDescription', {
            br: () => <br />,
          })}
        </p>
      </div>

      <div>
        {/* explore button */}
        <Link
          href="/products"
          className="text-ds-text-inverse w-45 bg-ds-bg-primary font-semibold flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl"
        >
          {t('exploreButton')}{' '}
          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
}
