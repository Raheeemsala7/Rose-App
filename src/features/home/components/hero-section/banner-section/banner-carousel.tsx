'use client';
import Image2 from '@/src/assets/images/banner-home-page/Hero-Section-Banner (2).png';
import Image3 from '@/src/assets/images/banner-home-page/Hero-Section-Banner (3).png';
import Image4 from '@/src/assets/images/banner-home-page/Hero-Section-Banner (4).png';
import Image5 from '@/src/assets/images/banner-home-page/Hero-Section-Banner (5).png';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/src/shared/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/src/shared/lib/utils';

const images = [Image2, Image3, Image4, Image5];

const CarouselCustomDots = () => {
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isRTL = locale === 'ar';

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full h-full">
      {/* Carousel */}
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <figure className="w-full h-full">
                <Image
                  src={src}
                  alt={`img ${index + 1}`}
                  placeholder="blur"
                  width={300}
                  height={439}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Arrow Icons */}
        <div className="absolute inset-e-8 bottom-12 translate-y-1/2 z-40 flex items-center justify-between gap-2 rounded-full bg-maroon-50 h-8.5">
          <CarouselPrevious
            className={cn(
              'cursor-pointer static translate-y-0 bg-transparent hover:bg-transparent text-maroon-700 w-7.5 h-7.5',
              isRTL && 'rotate-180'
            )}
          />
          <CarouselNext
            className={cn(
              'cursor-pointer static translate-y-0 bg-transparent hover:bg-transparent text-maroon-700 w-7.5 h-7.5',
              isRTL && 'rotate-180'
            )}
          />
        </div>
      </Carousel>

      {/* Carousel Dots */}
      <div className="absolute top-8 inset-e-8 flex gap-1.5 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn('h-2.5 rounded-full transition-all duration-300 cursor-pointer', {
              'bg-ds-bg-primary w-8': index + 1 === current,
              'bg-ds-bg-primary-fade w-2.5 hover:bg-ds-bg-primary-faint': index + 1 !== current,
            })}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselCustomDots;
