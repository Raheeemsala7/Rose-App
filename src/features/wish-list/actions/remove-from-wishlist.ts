'use server';

import { updateTag } from 'next/cache';
import { RemoveWishlistItemRequest } from '../types/wishlist';
import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';

interface RemoveWishlistPayload {
  message: string;
}

export async function removeFromWishlist({ id }: RemoveWishlistItemRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${process.env.API_URL}/wishlist/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ApiResponse<RemoveWishlistPayload> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to remove item from wishlist');
  }
updateTag('wishlist');
  return data;
}
