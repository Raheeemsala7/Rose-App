import { getTranslations } from 'next-intl/server';
import { WishlistItem } from '../types/wishlist';
import { WishlistLayout } from './wishlist-layout';

import { ClearWishlistButton } from './clear-wishlist-button';
import { AuthenticatedWishlistItem } from './authenticated-wishlist-item';

interface AuthenticatedWishlistProps {
  items: WishlistItem[];
}

export async function AuthenticatedWishlist({ items }: AuthenticatedWishlistProps) {
  const t = await getTranslations();

  return (
    <WishlistLayout
      title={t('wishlist.title')}
      itemsCountLabel={t('wishlist.itemsCount', { count: items.length })}
      count={items.length}
      clearAction={items.length > 0 ? <ClearWishlistButton /> : null}
    >
      {items.map((item) => (
        <AuthenticatedWishlistItem key={item.id} item={item} />
      ))}
    </WishlistLayout>
  );
}