'use client';

import { useRemoveFromWishlist } from '../hooks/use-remove-from-wishlist';
import { WishlistItem } from '../types/wishlist';
import { WishlistItemCard } from './wishlist-item-card';

interface AuthenticatedWishlistItemProps {
  item: WishlistItem;
}

export function AuthenticatedWishlistItem({ item }: AuthenticatedWishlistItemProps) {
  const removeFromWishlist = useRemoveFromWishlist();

  return (
    <WishlistItemCard
      product={item.product}
      onRemove={() => removeFromWishlist.mutate({ id: item.id })}
      isRemoving={removeFromWishlist.isPending}
    />
  );
}