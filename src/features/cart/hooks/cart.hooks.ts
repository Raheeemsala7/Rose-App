'use client';

import { useSession } from 'next-auth/react';
import { useGuestCartStore } from '../store/cart.store';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Product } from '../../products/types/product';
import { getGuestCartApi } from '../apis/cart.apis';
import { HEADERS } from '@/src/shared/constant/api.constant';
import { CartItem, GetCartPayload } from '../types/cart';


export function useCart() {
    const { status } = useSession();

    const itemsGuest = useGuestCartStore((state) => state.items);
    const clearCart = useGuestCartStore((state) => state.clearCart);

    const isAuthenticated = status === 'authenticated';
    const isAuthLoading = status === 'loading';

    const productIds = itemsGuest.map((item) => item.productId);

    const {
        data: productsGuest,
        isLoading: isGuestProductsLoading,
        isFetching: isGuestProductsFetching,
    } = useGuestCartProducts(productIds, isAuthenticated);

    const {
        data: productsAuth,
        isLoading: isAuthProductsLoading,
        isFetching: isAuthProductsFetching,
    } = useAuthCartProducts(isAuthenticated);

    const items = isAuthenticated ? productsAuth : productsGuest;

    const totalPrice = items?.reduce(
        (total, item) => total + Number(item.product.price) * item.quantity,
        0
    );

    const cartCount = items?.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const isEmpty = items?.length === 0;

    return {
        productIds,
        products: items,
        isEmpty,
        cartCount,
        totalPrice,
        clearCart,
        isAuthenticated,
        isLoading: isAuthLoading,
        isCartLoading: isAuthenticated ? isAuthProductsLoading : isGuestProductsLoading,
        isCartFetching: isAuthenticated ? isAuthProductsFetching : isGuestProductsFetching,
    };
}


export function useGuestCartProducts(productIds: string[], isAuthenticated: boolean) {
    return useQuery({
        queryKey: ['cart-products', productIds.slice().sort()],
        queryFn: async () => {
            const products = await getGuestCartApi(productIds);

            return products
                .map((product) => {
                    const cartItem = useGuestCartStore
                        .getState()
                        .items.find((item) => item.productId === product.id);

                    if (!cartItem) return null;

                    return {
                        product,
                        quantity: cartItem.quantity,
                        cartId: undefined,
                    };
                })
                .filter(
                    (item): item is { product: Product; quantity: number; cartId: undefined } =>
                        item !== null
                );
        },
        enabled: !isAuthenticated,
        placeholderData: keepPreviousData,
    });
}


export function useAuthCartProducts(isAuthenticated: boolean) {
    return useQuery({
        queryKey: ['cart'],
        queryFn: async (): Promise<CartItem[]> => {
            const res = await fetch('/api/auth/cart', {
                headers: { ...HEADERS.JsonBody },
            });

            const data: ApiResponse<GetCartPayload> = await res.json();

            if (!data.status) {
                throw new Error(data.message || 'Failed to fetch cart');
            }

            return data.payload.cartItems.map((item: any) => ({
                cartId: item.id,
                product: item.product,
                quantity: item.quantity,
            }));
        },
        enabled: isAuthenticated,
    });
}
