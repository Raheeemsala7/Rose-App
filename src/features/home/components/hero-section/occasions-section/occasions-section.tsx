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
  const t     = useTranslations('home-page.hero-section.occasions');
  const tHome = useTranslations('home');

  return (
    <section aria-label="Occasions" className="mt-12 sm:mt-14 mb-4">

      {/* ── Section header ── */}
      <div className="flex flex-col xs:flex-row xs:items-end xs:justify-between gap-3 mb-6 sm:mb-8">
        <SectionTitle
          subtitle={(t as AnyT)('subtitle')}
          title={(t as AnyT)('section-title')}
        />
        <Link
          href="/occasions"
          className="flex-shrink-0 flex items-center gap-1 text-sm font-medium
            text-burgundy-700 dark:text-blush-300
            hover:text-blush-600 dark:hover:text-blush-200
            transition-colors no-underline self-start xs:self-auto"
        >
          {tHome('viewAll')}
          <ArrowRight size={15} className="rtl:rotate-180" />
        </Link>
      </div>

      {/*
        Grid layout:
        • mobile  (<md): single column, taller cards for readability
        • tablet  (md):  2-column, third card spans full width
        • desktop (lg+): 3-column equal grid
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {occasionsInfo.map((item, idx) => (
          <Link
            key={item.id}
            href="/occasions"
            className={`
              group relative overflow-hidden rounded-2xl shadow-ds-soft no-underline
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600
              h-56 sm:h-64 md:h-72
              ${idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}
            `}
          >
            {/* Background image */}
            <Image
              src={item.image}
              alt={(t as AnyT)(`${item.key}.title`)}
              placeholder="blur"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

            {/* Card info */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex items-center text-xs font-semibold
                  py-0.5 px-2.5 rounded-full mb-2
                  bg-blush-100/90 text-blush-700
                  dark:bg-blush-900/80 dark:text-blush-200
                  backdrop-blur-sm">
                  {(t as AnyT)(`${item.key}.title`)}
                </span>
                <p className="font-semibold text-base sm:text-lg text-white leading-snug line-clamp-2">
                  {(t as AnyT)(`${item.key}.description`)}
                </p>
              </div>

              {/* Item count */}
              <span className="flex-shrink-0 inline-flex items-center text-xs font-medium
                text-cream-100/80 bg-black/35 backdrop-blur-sm rounded-full px-2.5 py-1 whitespace-nowrap">
                {item.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
