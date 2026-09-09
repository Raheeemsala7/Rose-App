'use client';

import ProductCard from '@/src/features/products/_components/product-card';
import { Product } from '@/src/features/products/types/product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/components/ui/carousel';

interface BestSellerCarouselProps {
  products: Product[];
  variant?: 'default' | 'related';
}

export default function BestSellerCarousel({ products, variant = 'default' }: BestSellerCarouselProps) {
  const isRelated = variant === 'related';

  return (
    <div className="relative px-6">
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className='p-4 sm:p-0'>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className={
                isRelated
                  ? 'basis-1/1 md:basis-1/3 lg:basis-1/4'
                  : 'basis-1/1 sm:basis-1/3 lg:basis-1/3'
              }
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
