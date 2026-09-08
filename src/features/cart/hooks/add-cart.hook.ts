"use client"

import { useSession } from "next-auth/react";
import { useCart } from "./cart.hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddToCartPayload } from "../types/cart";
import { useGuestCartStore } from "../store/cart.store";
import { addToCartAction, removeAllCartItemsAction, removeCartItemsAction, updateCartItemsAction } from "../actions/cart.action";


export function useAddToCart() {
    // Query Client
    const queryClient = useQueryClient();
    const { isAuthenticated } = useCart();

    const { addItem } = useGuestCartStore()

    return useMutation({
        mutationFn: async ({ productId, quantity }: AddToCartPayload) => {
            if (isAuthenticated) {
                return await addToCartAction({ productId, quantity });
            }

            addItem(productId, quantity);

            return null;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
        },
    });
}
export function useRemoveAllCart() {
    // Query Client
    const queryClient = useQueryClient();
    const { isAuthenticated } = useCart();

    const { clearCart } = useGuestCartStore()

    return useMutation({
        mutationFn: async () => {
            if (isAuthenticated) {
                return await removeAllCartItemsAction();
            }

            clearCart();

            return null;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
        },
    });
}
export function useRemoveItemCart() {
    // Query Client
    const queryClient = useQueryClient();
    const { isAuthenticated } = useCart();

    const { removeItem } = useGuestCartStore()

    return useMutation({
        mutationFn: async (productId:string) => {
            if (isAuthenticated) {
                return await removeCartItemsAction(productId);
            }

            removeItem(productId);

            return null;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
        },
    });
}
export function useupdateItemCart() {
    // Query Client
    const queryClient = useQueryClient();
    const { isAuthenticated } = useCart();

    const { updateItem } = useGuestCartStore()

    return useMutation({
        mutationFn: async ({cartItem,quantity}:{cartItem:string , quantity:number}) => {
            if (isAuthenticated) {
                return await updateCartItemsAction(cartItem , quantity);
            }

            updateItem(cartItem , quantity);

            return null;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
        },
    });
}