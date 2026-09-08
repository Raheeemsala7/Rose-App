'use client';

import { useSession } from 'next-auth/react';
import { useGuestCartStore } from '../store/cart.store';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Product } from '../../products/types/product';
import { getGuestCartProducts } from '../apis/cart.apis';
import { useCallback } from 'react';
import { HEADERS } from '@/src/shared/constant/api.constant';
import { CartItem, GetCartPayload } from '../types/cart';

export function useCart() {
    const { status } = useSession();

    const itemsGuest = useGuestCartStore((state) => state.items);
    const addGuestItem = useGuestCartStore((state) => state.addItem);
    const clearCart = useGuestCartStore((state) => state.clearCart)

    const isAuthenticated = status === 'authenticated';
    const isAuthLoading = status === 'loading';



    // Get Products Ids
    const productIds = itemsGuest.map((item) => item.productId);

    // Get Guest Cart Products
    const {
        data: productsGuest,
        isLoading: isGuestProductsLoading,
        isFetching: isGuestProductsFetching
    } = useGuestCartProducts(productIds, isAuthenticated);

    // Get User Cart Products
    const {
        data: productsAuth,
        isLoading: isAuthProductsLoading,
        isFetching: isAuthProductsFetching
    } = useAuthCartProducts(isAuthenticated);





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


    const items = isAuthenticated
        ? productsAuth
        : productsGuest;



    // Total Price
    // const totalPrice =
    //     items?.reduce((acc, product) => {
    //         const cartItem = itemsGuest.find((item) => item.productId === product.id);
    //         const quantity = cartItem?.quantity ?? 0;
    //         return acc + Number(product.price) * quantity;
    //     }, 0) ?? 0;


    // const isEmpty = items.length === 0;

    // const cartCount = items.reduce(
    //     (total, item) => total + item.quantity,
    //     0
    // );

    const totalPrice = items?.reduce(
        (total, item) =>
            total + Number(item.product.price) * item.quantity,
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

        addItem,
        clearCart,

        isAuthenticated,
        isLoading: isAuthLoading,
        isCartLoading: isAuthenticated
            ? isAuthProductsLoading
            : isGuestProductsLoading,

        isCartFetching: isAuthenticated
            ? isAuthProductsFetching
            : isGuestProductsFetching,

    };
}



export function useGuestCartProducts(productIds: string[], isAuthenticated: boolean) {
    return useQuery({
        queryKey: ['cart-products', productIds.slice().sort()],
        queryFn: async () => {
            const products = await getGuestCartProducts(productIds);

            return products
                .map((product) => {
                    const cartItem = useGuestCartStore
                        .getState()
                        .items.find(
                            (item) => item.productId === product.id
                        );

                    if (!cartItem) return null;

                    return {
                        product,
                        quantity: cartItem.quantity,
                    };
                })
                .filter(
                    (
                        item
                    ): item is {
                        product: Product;
                        quantity: number;
                    } => item !== null
                );
        }, enabled: !isAuthenticated,
        placeholderData: keepPreviousData,
    });
}


export function useAuthCartProducts(isAuthenticated: boolean) {
    return useQuery({
        queryKey: ['cart'],
        queryFn: async (): Promise<CartItem[]> => {

            const res = await fetch("/api/auth/cart", {
                headers: {
                    ...HEADERS.JsonBody
                }
            })

            const data: ApiResponse<GetCartPayload> = await res.json()

            if (!data.status) {
                throw new Error(data.message || "Failed fetch")
            }

            return data.payload.cartItems.map((item: any) => ({
                product: item.product,
                quantity: item.quantity,
            }));
        },
        enabled: isAuthenticated,
    });
}



