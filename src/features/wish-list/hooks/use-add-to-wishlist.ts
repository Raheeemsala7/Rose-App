'use client';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { addToWishlist } from '../actions/add-to-wishlist';
import { addGuestWishlistItem } from '../storage/guest-wishlist';

export function useAddToWishlist() {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (body: { productId: string }) => {
      if (session?.user) {
        return await addToWishlist(body);
      }

      addGuestWishlistItem(body);

      return null;
    },
  });
}
