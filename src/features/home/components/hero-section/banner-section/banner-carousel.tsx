'use client';
import Image2 from '@/src/assets/images/banner-home-page/Hero-Section-Banner (2).png';
import Image3 from '@/src/assets/images/banner-home-page/Hero-Section-Banner (3).png';
import Image4 from '@/src/assets/images/banner-home-page/Hero-Section-Banner (4).png';
import Image5 from '@/src/assets/images/banner-home-page/Hero-Section-Banner (5).png';

import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/src/shared/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/src/shared/lib/utils';

const images = [Image2, Image3, Image4, Image5];

const CarouselCustomDots = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  /* Auto-advance every 5 s */
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [api]);

  return (
    /*
     * The Carousel component wraps children in a relative div.
     * CarouselContent wraps in overflow-hidden — we need this container
     * to be absolutely positioned and fill the parent so the images show.
     */
    <div className="absolute inset-0">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="w-full h-full [&>[data-slot=carousel-content]]:h-full [&>[data-slot=carousel-content]>div]:h-full"
      >
        <CarouselContent className="h-full ml-0">
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full pl-0">
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  placeholder="blur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators — top-end corner */}
      <div className="absolute top-5 end-5 flex gap-1.5 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              'h-2 rounded-full transition-all duration-300 cursor-pointer',
              index === current
                ? 'bg-burgundy-200 w-7'
                : 'bg-cream-100/50 w-2 hover:bg-cream-100/80'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselCustomDots;
