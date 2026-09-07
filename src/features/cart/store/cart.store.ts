"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware";

export type GuestCartItem = {
    productId: string;
    quantity: number;
};

type GuestCartStore = {
    items: GuestCartItem[];
    addItem: (productId: string, quantity?: number) => void;
    updateItem: (productId: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
};

export const useGuestCartStore  = create<GuestCartStore>()(
    persist(
        (set) => ({
            items: [],
            addItem: (productId, quantity = 1) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.productId === productId
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.productId === productId
                                    ? {
                                        ...item,
                                        quantity: item.quantity + quantity,
                                    }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            {
                                productId,
                                quantity,
                            },
                        ],
                    };
                }),

            updateItem: (productId, quantity) =>
                set((state) => {
                    if (quantity <= 0) {
                        return {
                            items: state.items.filter(
                                (item) => item.productId !== productId
                            ),
                        };
                    }

                    return {
                        items: state.items.map((item) =>
                            item.productId === productId
                                ? {
                                    ...item,
                                    quantity,
                                }
                                : item
                        ),
                    };
                }),

            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.productId !== productId
                    ),
                })),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "guest-cart",
        }
    )
)