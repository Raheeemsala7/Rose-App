"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGuestCartStore } from "../store/cart.store";
import { useCart } from "./cart.hooks";
import {
    addToCartAction,
    mergeGuestCartAction,
    removeAllCartItemsAction,
    removeCartItemsAction,
    updateCartItemsAction,
} from "../actions/cart.action";
import { AddToCartPayload } from "../types/cart";


export function useAddToCart() {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useCart();
    const { addItem } = useGuestCartStore();

    return useMutation({
        mutationFn: async ({ productId, quantity }: AddToCartPayload) => {
            if (isAuthenticated) {
                return await addToCartAction({ productId, quantity });
            }
            addItem(productId, quantity);
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useRemoveAllCart() {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useCart();
    const { clearCart } = useGuestCartStore();

    return useMutation({
        mutationFn: async () => {
            if (isAuthenticated) {
                return await removeAllCartItemsAction();
            }
            clearCart();
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useRemoveItemCart() {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useCart();
    const { removeItem } = useGuestCartStore();

    return useMutation({
        mutationFn: async (productId: string) => {
            if (isAuthenticated) {
                return await removeCartItemsAction(productId);
            }
            removeItem(productId);
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useupdateItemCart() {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useCart();
    const { updateItem } = useGuestCartStore();

    return useMutation({
        mutationFn: async ({ cartItem, quantity }: { cartItem: string; quantity: number }) => {
            if (isAuthenticated) {
                return await updateCartItemsAction(cartItem, quantity);
            }
            updateItem(cartItem, quantity);
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

/**
 * Merges the guest cart into the server cart right after a successful login.
 * Call `mergeCart()` before redirecting the user post-login.
 *
 * - Sends each guest item to the server via `mergeGuestCartAction` (server action).
 * - On success: clears the local guest cart and invalidates the server cart query.
 * - Uses Promise.allSettled internally so a single failed item won't abort the rest.
 */
export function useMergeCartOnLogin() {
    const queryClient = useQueryClient();
    const { items: guestItems, clearCart } = useGuestCartStore();

    return useMutation({
        mutationFn: async () => {
            if (!guestItems.length) return null;
            return await mergeGuestCartAction(guestItems);
        },
        onSuccess: () => {
            clearCart();
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}
