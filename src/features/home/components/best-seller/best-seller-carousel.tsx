'use client';


import ProductCard from '@/src/features/products/_components/product-card';
import { Product } from '@/src/features/products/types/product';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/src/shared/components/ui/carousel';

interface BestSellerCarouselProps {
  products: Product[];
}

export default function BestSellerCarousel({ products }: BestSellerCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-1/1 md:basis-1/3">
            <ProductCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
