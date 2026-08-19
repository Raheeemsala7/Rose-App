'use client';

import { useMutation } from '@tanstack/react-query';

import { addToWishlist } from '../actions/add-to-wishlist';
import { clearGuestWishlist, getGuestWishlist } from '../storage/guest-wishlist';

export function useSyncGuestWishlist() {
  return useMutation({
    mutationFn: async () => {
      const guestWishlist = getGuestWishlist();

      if (!guestWishlist.length) {
        return;
      }

      for (const item of guestWishlist) {
        await addToWishlist(item);
      }

      clearGuestWishlist();
    },
  });
}
