import Image from 'next/image';
import OccasionsImage1 from '@/src/assets/images/banner-home-page/Hero-Section-Occasions-1.png';
import OccasionsImage2 from '@/src/assets/images/banner-home-page/Hero-Section-Occasions-2.png';
import OccasionsImage3 from '@/src/assets/images/banner-home-page/Hero-Section-Occasions-3.png';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/src/shared/components/section-title';
import { Link } from '@/src/i18n/navigation';
import { ArrowRight } from 'lucide-react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyT = any;

const occasionsInfo = [
  { id: 1, key: 'wedding',     image: OccasionsImage1, count: 18 },
  { id: 2, key: 'engagement',  image: OccasionsImage2, count: 12 },
  { id: 3, key: 'anniversary', image: OccasionsImage3, count: 5  },
];

export default function OccasionsSection() {
  const t = useTranslations('home-page.hero-section.occasions');
  const tHome = useTranslations('home');

  return (
    <section aria-label="Occasions" className="mt-14 mb-4">
      {/* Section header */}
      <div className="flex items-end justify-between mb-6">
        <SectionTitle
          subtitle={(t as AnyT)('subtitle')}
          title={(t as AnyT)('section-title')}
        />
        <Link
          href="/occasions"
          className="flex items-center gap-1 text-sm font-medium text-burgundy-700 dark:text-blush-300 hover:text-blush-600 dark:hover:text-blush-200 transition-colors no-underline"
        >
          {tHome('viewAll')}
          <ArrowRight size={15} className="rtl:rotate-180" />
        </Link>
      </div>

      {/* 3-column masonry-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {occasionsInfo.map((item) => (
          <Link
            key={item.id}
            href="/occasions"
            className="group relative h-64 rounded-2xl overflow-hidden shadow-ds-soft no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={t(`${item.key}.title` as Parameters<typeof t>[0])}
              placeholder="blur"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

            {/* Info */}
            <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
              <div>
                {/* Badge */}
                <span className="inline-flex items-center text-xs font-semibold py-0.5 px-2.5 rounded-full bg-blush-100/90 text-blush-700 dark:bg-blush-900/80 dark:text-blush-200 backdrop-blur-sm mb-2">
                  {t(`${item.key}.title` as Parameters<typeof t>[0])}
                </span>
                <p className="font-semibold text-lg text-white leading-snug">
                  {t(`${item.key}.description` as Parameters<typeof t>[0])}
                </p>
              </div>

              {/* Item count pill */}
              <span className="flex-shrink-0 ms-3 inline-flex items-center gap-0.5 text-xs font-medium text-cream-100/80 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
                {item.count} {tHome('viewAll')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
