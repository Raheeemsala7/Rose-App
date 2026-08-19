
'use server';

import { updateTag } from 'next/cache';
import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';

export async function clearWishlist() {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await fetch(`${process.env.API_URL}/wishlist`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: ApiResponse<{ message: string }> = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to clear wishlist');
  }

  updateTag('wishlist');

  return data;
}