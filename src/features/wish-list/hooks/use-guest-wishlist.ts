'use client';

import { useState, useEffect, useCallback } from 'react';
import { getGuestWishlist, removeGuestWishlistItem, clearGuestWishlist } from '../storage/guest-wishlist';
import { Product } from '../../products/types/product';

export function useGuestWishlist() {
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effects
  useEffect(() => {
    async function hydrateGuestWishlist() {
      const guestItems = getGuestWishlist();

      if (guestItems.length === 0) {
        setIsLoading(false);
        return;
      }

      const results = await Promise.all(
        guestItems.map(async (item) => {
          const res = await fetch(`/api/products/${item.productId}`);
          const data = await res.json();
          return data.status ? (data.payload.product as Product) : null;
        })
      );

      setProducts(results.filter((p): p is Product => p !== null));
      setIsLoading(false);
    }

    hydrateGuestWishlist();
  }, []);

  // Handlers
  const removeProduct = useCallback((productId: string) => {
    removeGuestWishlistItem(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clearAll = useCallback(() => {
    clearGuestWishlist();
    setProducts([]);
  }, []);

  return { products, isLoading, removeProduct, clearAll };
}