import ProductCardSkeleton from './product-card-skeleton';

export function OccasionTabsSkeleton() {
  return (
    <div className="flex animate-pulse gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-5 w-20 rounded bg-gray-100" />
      ))}
    </div>
  );
}

export function MostPopularProductsGridSkeleton() {
  return (
    <div className="mt-10 grid animate-pulse grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} i={i} />
      ))}
    </div>
  );
}
