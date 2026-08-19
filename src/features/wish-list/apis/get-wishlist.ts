import 'server-only';
import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';

import { WishlistItem } from '../types/wishlist';

export async function getWishlist(): Promise<WishlistItem[]> {
  
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) return [];

  const response = await fetch(`${process.env.API_URL}/wishlist`, {   
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ['wishlist'] },
  });

  const data: ApiResponse<{ wishlistItems: WishlistItem[] }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch wishlist');
  }

  return data.payload.wishlistItems;
}