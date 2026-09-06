import Image from 'next/image';
import BannerCard from '@/src/assets/images/banner-home-page/Hero-Section-Banner (1).png';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import CarouselCustomDots from './banner-carousel';
import { useTranslations } from 'next-intl';
import { Button } from '@/src/shared/components/ui/button';
import { Link } from '@/src/i18n/navigation';

export default function BannerHomePage() {
  const t = useTranslations('home-page.hero-section.banner');

  return (
    <section aria-label="Hero banner" className="w-full mt-8 sm:mt-10">
      <div className="flex flex-col lg:flex-row gap-5 h-auto lg:h-[480px]">

        {/* ── Left: carousel with text overlay ── */}
        <div className="relative flex-1 h-64 lg:h-full rounded-2xl overflow-hidden shadow-ds-soft-lg group">
          {/* gradient scrim — LTR: dark on left, RTL: dark on right */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/30 to-transparent rtl:bg-gradient-to-l" />

          <CarouselCustomDots />

          {/* Text overlay */}
          <div className="absolute inset-s-8 bottom-8 z-20 flex flex-col gap-3 max-w-xs">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-blush-300">
              <span className="block h-px w-5 bg-blush-300 rounded-full" aria-hidden />
              {t('card-title')}
            </span>

            <h1 className="font-bold text-3xl sm:text-4xl text-white leading-tight">
              {t('carousel-title')}
            </h1>

            <p className="text-sm text-cream-200/90 leading-relaxed">
              {t('carousel-description')}
            </p>

            {/* Trust badges */}
            <ul className="flex flex-col gap-1">
              {[t('badge-1'), t('badge-2')].map((badge) => (
                <li key={badge} className="flex items-center gap-1.5 text-xs text-cream-100/80">
                  <CheckCircle2 size={13} className="text-blush-300 flex-shrink-0" />
                  {badge}
                </li>
              ))}
            </ul>

            <div className="flex gap-2 flex-wrap mt-1">
              <Link href="/products">
                <Button
                  variant="secondary"
                  className="py-2 px-5 text-sm rounded-full cursor-pointer bg-burgundy-700 hover:bg-burgundy-600 text-white border-none shadow-none"
                >
                  {t('carousel-button')}
                </Button>
              </Link>
              <Link href="/occasions">
                <Button
                  variant="outline"
                  className="py-2 px-5 text-sm rounded-full cursor-pointer border-white/50 text-white hover:bg-white/10"
                >
                  {t('occasions-button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>


        {/* ── Right: static card imag ── */}
        <div className="relative w-full lg:w-[300px] lg:flex-shrink-0 h-64 lg:h-full rounded-2xl overflow-hidden shadow-ds-soft-lg group">
          {/* dark scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

          <Image
            src={BannerCard}
            alt={t('card-description')}
            placeholder="blur"
            fill
            sizes="(max-width: 1024px) 100vw, 300px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />

          {/* Card info overlay */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-5 flex flex-col gap-3">
            {/* Season badge */}
            <span className="inline-flex w-fit items-center gap-1 text-xs font-semibold py-1 px-3 rounded-full bg-blush-100/90 text-blush-700 dark:bg-blush-900/80 dark:text-blush-200 backdrop-blur-sm">
              {t('card-title')}
            </span>

            <p className="font-semibold text-xl leading-snug text-white">
              {t('card-description')}
            </p>

            <Link href="/products">
              <Button
                variant="secondary"
                className="w-fit py-2 px-5 text-sm rounded-full cursor-pointer bg-burgundy-700 hover:bg-burgundy-600 text-white  border-none shadow-none"
              >
                {t('card-button')}
                <ArrowRight className="rtl:hidden ms-1.5" size={15} />
                <ArrowLeft className="ltr:hidden me-1.5" size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
