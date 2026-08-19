'use server';
import { updateTag } from 'next/cache'; 

import { AddToWishlistPayload, WishlistItemRequest } from '../types/wishlist';
import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';

export async function addToWishlist(body: WishlistItemRequest) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${process.env.API_URL}/wishlist`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: ApiResponse<AddToWishlistPayload> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to add product to wishlist');
  }
  updateTag('wishlist'); 
  return data.payload;
}
