import { WishlistItemSkeleton } from './wishlist-item-skeleton';

export function WishlistSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col">
        {Array.from({ length: 3 }).map((_, i) => (
          <WishlistItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}