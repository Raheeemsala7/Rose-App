import ProductCardSkeleton from './product-card-skeleton';

export default function BestSellerCarouselSkeleton() {
  return (
    <div className="flex gap-6">
      {[1, 2, 3].map((i) => (
        <ProductCardSkeleton i={i} key={i} />
      ))}
    </div>
  );
}
