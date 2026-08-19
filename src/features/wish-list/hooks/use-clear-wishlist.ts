'use client';

import { useMutation } from '@tanstack/react-query';
import { clearWishlist } from '../actions/clear-wishlist';

export function useClearWishlist() {
  return useMutation({
    mutationFn: clearWishlist,
  });
}