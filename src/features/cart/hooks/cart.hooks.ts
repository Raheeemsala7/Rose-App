'use client';

import { useSession } from 'next-auth/react';
import { useGuestCartStore } from '../store/cart.store';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Product } from '../../products/types/product';
import { getClientCartProducts } from '../apis/cart.apis';
import { useCallback } from 'react';

export function useCart() {
    const { status } = useSession();

    const itemsGuest = useGuestCartStore((state) => state.items);
    const addGuestItem = useGuestCartStore((state) => state.addItem);
    const clearCart = useGuestCartStore((state) => state.clearCart)

    const isAuthenticated = status === 'authenticated';
      const isAuthLoading = status === 'loading';



    // Get Products Ids
    const productIds = itemsGuest.map((item) => item.productId);

    // Get User Products
    const {
        data: products,
        isLoading: isProductsLoading,
        isFetching: isProductsFetching
    } = useCartProducts(productIds);

    const isEmpty = itemsGuest.length === 0;

    const cartCount = itemsGuest.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Total Price
    const totalPrice =
        products?.reduce((acc, product) => {
            const cartItem = itemsGuest.find((item) => item.productId === product.id);
            const quantity = cartItem?.quantity ?? 0;
            return acc + Number(product.price) * quantity;
        }, 0) ?? 0;

    //Get Cart Data
    // const refreshCart = useCallback(async () => {
    //     if (!isAuthenticated) {
    //         // const guestCart = getGuestCart();
    //         // setGuestData(guestCart);
    //         return;
    //     }

    //     try {
    //         const userCart = await getUserCart();
    //         setUserData(userCart);
    //     } catch (error) {
    //         throw new Error('Failed to get user cart:', { cause: error });
    //     }
    // }, [isAuthenticated]);


    const addItem = (productId: string, quantity = 1) => {
        if (isAuthenticated) {
            // هنا هنحط React Query mutation
            // addCartItemMutation.mutate({ productId, quantity })
            return;
        }
        addGuestItem(productId, quantity);
    };


    return {
        items: itemsGuest,
        products,

        cartCount,
        totalPrice,

        addItem,
        clearCart,

        isAuthenticated,
        isLoading: isAuthLoading,
        isProductsLoading,
        isProductsFetching,
    };
}



export function useCartProducts(productIds: string[]) {
    return useQuery({
        queryKey: ['cart-products', productIds.slice().sort()],
        queryFn: () => getClientCartProducts(productIds),
        enabled: productIds.length > 0,
        placeholderData: keepPreviousData,
    });
}
