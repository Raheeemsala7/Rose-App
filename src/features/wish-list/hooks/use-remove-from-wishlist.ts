'use client';

import { useMutation } from '@tanstack/react-query';

import { removeFromWishlist } from '../actions/remove-from-wishlist';

export function useRemoveFromWishlist() {
  return useMutation({
    mutationFn: removeFromWishlist,
  });
}
