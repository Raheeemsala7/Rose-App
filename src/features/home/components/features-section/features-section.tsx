import { cn } from '@/src/shared/lib/utils';
import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const featuresInfo = [
  { id: 1, key: 'free-delivery', Icon: Truck },
  { id: 2, key: 'get-refund',    Icon: RefreshCw },
  { id: 3, key: 'safe-payment',  Icon: ShieldCheck },
  { id: 4, key: 'support',       Icon: Headset },
];

export default function FeaturesSection() {
  const t = useTranslations('home-page.hero-section.features');

  return (
    <section aria-label="Features" className="mt-10 mb-12">
      <div
        className={cn(
          'grid grid-cols-2 xl:grid-cols-4 gap-px',
          'rounded-2xl overflow-hidden',
          'bg-cream-300 dark:bg-burgundy-800',   /* gap colour between cells */
          'shadow-ds-soft'
        )}
      >
        {featuresInfo.map((feature) => (
          <div
            key={feature.id}
            className={cn(
              'flex items-center gap-4 px-6 py-7',
              'bg-cream-100 dark:bg-burgundy-900',
              'transition-colors hover:bg-cream-200 dark:hover:bg-burgundy-800'
            )}
          >
            {/* Icon circle */}
            <div
              className={cn(
                'flex-shrink-0 flex items-center justify-center',
                'w-12 h-12 rounded-full',
                'bg-burgundy-800 dark:bg-burgundy-700 text-cream-100'
              )}
              aria-hidden
            >
              <feature.Icon size={22} strokeWidth={1.6} />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-burgundy-800 dark:text-cream-100 leading-snug">
                {t(`${feature.key}.title` as Parameters<typeof t>[0])}
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-burgundy-600/70 dark:text-cream-400/70 leading-relaxed">
                {t(`${feature.key}.description` as Parameters<typeof t>[0])}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
