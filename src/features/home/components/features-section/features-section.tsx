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
    <section aria-label="Features" className="mt-8 sm:mt-10 mb-10 sm:mb-14">
      {/*
        Grid layout:
        • xs  (<480px): 1-column, full-width cards
        • sm  (≥480px): 2-column
        • xl  (≥1280px): 4-column in one row
        Gap-px trick: background colour = gap colour between cells
      */}
      <div
        className={cn(
          'grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-px',
          'rounded-2xl overflow-hidden shadow-ds-soft',
          'bg-cream-300 dark:bg-burgundy-800',
        )}
      >
        {featuresInfo.map((feature) => (
          <div
            key={feature.id}
            className={cn(
              'flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-5 sm:py-7',
              'bg-cream-100 dark:bg-burgundy-900',
              'transition-colors hover:bg-cream-200 dark:hover:bg-burgundy-800',
            )}
          >
            {/* Icon circle */}
            <div
              className={cn(
                'flex-shrink-0 flex items-center justify-center',
                'w-10 h-10 sm:w-12 sm:h-12 rounded-full',
                'bg-burgundy-800 dark:bg-burgundy-700 text-cream-100',
              )}
              aria-hidden
            >
              <feature.Icon size={20} strokeWidth={1.6} />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-burgundy-800 dark:text-cream-100 leading-snug">
                {(t as any)(`${feature.key}.title`)}
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-burgundy-600/70 dark:text-cream-400/70 leading-relaxed">
                {(t as any)(`${feature.key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
