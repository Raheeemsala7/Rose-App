
import { GuestWishlist } from './guest-wishlist';
import { Suspense } from 'react';
import { WishlistSkeleton } from './wishlist-skeleton';
import { AuthenticatedWishlistData } from './authenticated-wishlist-data';
import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';

export async function WishlistPage() {
  // Auth check
  const jwt = await getNextAuthToken();

if (jwt?.token) {
    return (
      <Suspense fallback={<WishlistSkeleton />}>
        <AuthenticatedWishlistData />
      </Suspense>
    );
  }

  return <GuestWishlist />;
}