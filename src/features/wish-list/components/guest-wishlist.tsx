'use client';

import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { useGuestWishlist } from '../hooks/use-guest-wishlist';
import { WishlistLayout } from './wishlist-layout';
import { WishlistItemCard } from './wishlist-item-card';
import { WishlistSkeleton } from './wishlist-skeleton';
import { Button } from '@/src/shared/components/ui/button';

export function GuestWishlist() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { products, isLoading, removeProduct, clearAll } = useGuestWishlist();

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  return (
    <WishlistLayout
      title={t('wishlist.title')}
      itemsCountLabel={t('wishlist.itemsCount', { count: products.length })}
      count={products.length}
      clearAction={
        products.length > 0 ? (
          <Button variant="destructive" onClick={clearAll}>
            <Trash2 />
            {t('wishlist.clearWishlist')}
          </Button>
        ) : null
      }
    >
      {products.map((product) => (
        <WishlistItemCard key={product.id} product={product} onRemove={() => removeProduct(product.id)} />
      ))}
    </WishlistLayout>
  );
}