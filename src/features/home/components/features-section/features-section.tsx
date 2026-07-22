import { cn } from '@/src/shared/lib/utils';
import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Features Info
const featuresInfo = [
  {
    id: 1,
    key: 'free-delivery',
    icon: <Truck size={40} strokeWidth={1.46} />,
  },
  {
    id: 2,
    key: 'get-refund',
    icon: <RefreshCw size={40} strokeWidth={1.46} />,
  },
  {
    id: 3,
    key: 'safe-payment',
    icon: <ShieldCheck size={40} strokeWidth={1.46} />,
  },
  {
    id: 4,
    key: 'support',
    icon: <Headset size={40} strokeWidth={1.46} />,
  },
];

export default function FeaturesSection() {
  // Translations
  const t = useTranslations('home-page.hero-section.features');

  return (
    <>
      {/* Features Section */}
      <div
        className={cn(
          // Default
          'features bg-ds-bg-primary-fade rounded-2xl p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10',

          // Dark
          'dark:bg-ds-bg-plain'
        )}
      >
        {/* Features Item */}
        {featuresInfo.map((feature) => (
          <div key={feature.id} className="item flex items-center justify-center gap-4">
            {/* Features Icon */}
            <div
              className={cn(
                // Default
                'icon py-4 px-3.5 text-ds-text-inverse bg-maroon-600 rounded-full',

                // Dark
                'dark:bg-ds-bg-primary-saturated'
              )}
            >
              {feature.icon}
            </div>

            {/* Features Info */}
            <div className="info min-w-39.25">
              {/* Features Title */}
              <h2
                className={cn(
                  // Default
                  'mb-1.25 font-semibold text-xl text-maroon-600',

                  // Dark
                  'dark:text-soft-pink-200'
                )}
              >
                {t(`${feature.key}.title` as Parameters<typeof t>[0])}
              </h2>

              {/* Features Description */}
              <p className="font-normal text-sm text-ds-text-soft">
                {t(`${feature.key}.description` as Parameters<typeof t>[0])}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
