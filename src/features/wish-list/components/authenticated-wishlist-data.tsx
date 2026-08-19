// features/wish-list/components/authenticated-wishlist-data.tsx
import { getWishlist } from '../apis/get-wishlist';
import { AuthenticatedWishlist } from './authenticated-wishlist';

export async function AuthenticatedWishlistData() {
  const items = await getWishlist();
  return <AuthenticatedWishlist items={items} />;
}