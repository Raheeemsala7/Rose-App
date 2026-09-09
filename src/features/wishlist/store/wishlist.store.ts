'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GuestWishlistItem {
    productId: string;
}

interface GuestWishlistStore {
    items: GuestWishlistItem[];
    toggleItem: (productId: string) => void;
    removeItem: (productId: string) => void;
    clearWishlist: () => void;
    isWishlisted: (productId: string) => boolean;
}

export const useGuestWishlistStore = create<GuestWishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            toggleItem: (productId) =>
                set((state) => {
                    const exists = state.items.some((i) => i.productId === productId);
                    return {
                        items: exists
                            ? state.items.filter((i) => i.productId !== productId)
                            : [...state.items, { productId }],
                    };
                }),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((i) => i.productId !== productId),
                })),
            clearWishlist: () => set({ items: [] }),
            isWishlisted: (productId) =>
                get().items.some((i) => i.productId === productId),
        }),
        { name: 'guest-wishlist' }
    )
);
