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
    <section aria-label="Hero banner" className="w-full mt-6 sm:mt-8 lg:mt-10">
      {/*
        Layout:
        • mobile  (<lg): stack vertically, carousel on top
        • desktop (≥lg): side-by-side, carousel takes remaining space, card is 300px wide
      */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

        {/* ── Carousel panel ── */}
        <div className="relative flex-1 h-72 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden shadow-ds-soft-lg group">
          {/* Left-to-right gradient scrim (RTL flips) */}
          <div
            className="absolute inset-0 z-10 pointer-events-none
              bg-gradient-to-t from-black/80 via-black/30 to-transparent
              sm:bg-gradient-to-r sm:from-black/80 sm:via-black/35 sm:to-transparent
              rtl:sm:bg-gradient-to-l"
          />

          {/* Carousel fills the panel via absolute positioning */}
          <CarouselCustomDots />

          {/* Text overlay — sits above gradient */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-8 flex flex-col gap-2.5 sm:gap-3 sm:max-w-sm">
            {/* Eyebrow label */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-blush-300 w-fit">
              <span className="block h-px w-5 bg-blush-300 rounded-full" aria-hidden />
              {t('card-title')}
            </span>

            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              {t('carousel-title')}
            </h1>

            <p className="hidden sm:block text-sm text-cream-200/90 leading-relaxed">
              {t('carousel-description')}
            </p>

            {/* Trust badges — hide on very small screens */}
            <ul className="hidden sm:flex flex-col gap-1">
              {[t('badge-1'), t('badge-2')].map((badge) => (
                <li key={badge} className="flex items-center gap-1.5 text-xs text-cream-100/80">
                  <CheckCircle2 size={13} className="text-blush-300 flex-shrink-0" />
                  {badge}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex gap-2 flex-wrap mt-1">
              <Link href="/products">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full cursor-pointer bg-burgundy-700 hover:bg-burgundy-600 text-white border-none shadow-none"
                >
                  {t('carousel-button')}
                </Button>
              </Link>
              <Link href="/occasions">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full cursor-pointer border-white/50 text-white hover:bg-white/10"
                >
                  {t('occasions-button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Static card panel ── */}
        <div className="relative w-full lg:w-[280px] xl:w-[300px] lg:flex-shrink-0 h-56 sm:h-72 lg:h-[480px] rounded-2xl overflow-hidden shadow-ds-soft-lg group">
          {/* Bottom-up scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10 pointer-events-none" />

          <Image
            src={BannerCard}
            alt={t('card-description')}
            placeholder="blur"
            fill
            sizes="(max-width: 1024px) 100vw, 300px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />

          {/* Info overlay */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
            <span className="inline-flex w-fit items-center gap-1 text-xs font-semibold py-1 px-3 rounded-full bg-blush-100/90 text-blush-700 backdrop-blur-sm">
              {t('card-title')}
            </span>

            <p className="font-semibold text-base sm:text-lg leading-snug text-white">
              {t('card-description')}
            </p>

            <Link href="/products" className="w-fit">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full cursor-pointer bg-burgundy-700 hover:bg-burgundy-600 text-white border-none shadow-none"
              >
                {t('card-button')}
                <ArrowRight className="rtl:hidden ms-1" size={14} />
                <ArrowLeft  className="ltr:hidden me-1" size={14} />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
