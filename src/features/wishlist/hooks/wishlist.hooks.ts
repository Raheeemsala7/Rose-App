'use client';

import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGuestWishlistStore } from '../store/wishlist.store';
import { getGuestCartApi } from '@/src/features/cart/apis/cart.apis';
import { HEADERS } from '@/src/shared/constant/api.constant';
import { WishlistItem, GetWishlistPayload } from '../types/wishlist';
import {
    addToWishlistAction,
    removeFromWishlistAction,
    mergeGuestWishlistAction,
} from '../actions/wishlist.action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

// ─── useWishlist ─────────────────────────────────────────────────────────────

export function useWishlist() {
    const { status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    const guestItems = useGuestWishlistStore((state) => state.items);
    const guestIsWishlisted = useGuestWishlistStore((state) => state.isWishlisted);

    const productIds = guestItems.map((i) => i.productId);

    const { data: guestProducts, isLoading: isGuestLoading } = useQuery({
        queryKey: ['wishlist-products', productIds.slice().sort()],
        queryFn: async (): Promise<WishlistItem[]> => {
            if (!productIds.length) return [];
            const products = await getGuestCartApi(productIds);
            return products.map((product) => ({ wishlistId: product.id, product }));
        },
        enabled: !isAuthenticated,
    });

    const { data: authProducts, isLoading: isAuthLoading } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async (): Promise<WishlistItem[]> => {
            const res = await fetch('/api/auth/wishlist', { headers: { ...HEADERS.JsonBody } });
            const data: ApiResponse<GetWishlistPayload> = await res.json();
            if (!data.status) throw new Error(data.message || 'Failed to fetch wishlist');
            return data.payload.wishlistItems.map((item: any) => ({
                wishlistId: item.id,
                product: item.product,
            }));
        },
        enabled: isAuthenticated,
    });

    const items = isAuthenticated ? authProducts : guestProducts;

    function isWishlisted(productId: string): boolean {
        if (isAuthenticated) {
            return (authProducts ?? []).some((i) => i.product.id === productId);
        }
        return guestIsWishlisted(productId);
    }

    function getWishlistId(productId: string): string | undefined {
        return (authProducts ?? []).find((i) => i.product.id === productId)?.wishlistId;
    }

    return {
        items: items ?? [],
        isEmpty: (items?.length ?? 0) === 0,
        count: items?.length ?? 0,
        isWishlisted,
        getWishlistId,
        isAuthenticated,
        isLoading,
        isWishlistLoading: isAuthenticated ? isAuthLoading : isGuestLoading,
    };
}

// ─── useToggleWishlist ────────────────────────────────────────────────────────

export function useToggleWishlist() {
    const queryClient = useQueryClient();
    const t = useTranslations('product');
    const { isAuthenticated, isWishlisted, getWishlistId } = useWishlist();
    const toggleGuest = useGuestWishlistStore((state) => state.toggleItem);

    return useMutation({
        mutationFn: async (productId: string) => {
            if (!isAuthenticated) {
                toggleGuest(productId);
                return null;
            }

            if (isWishlisted(productId)) {
                const wishlistId = getWishlistId(productId);
                if (wishlistId) await removeFromWishlistAction(wishlistId);
            } else {
                await addToWishlistAction(productId);
            }
        },
        onSuccess: (_, productId) => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            queryClient.invalidateQueries({ queryKey: ['wishlist-products'] });
            const added = !isWishlisted(productId);
            toast.success(added ? t('addToWishlist') : t('removeFromWishlist'));
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : 'Failed');
        },
    });
}

// ─── useMergeWishlistOnLogin ──────────────────────────────────────────────────

export function useMergeWishlistOnLogin() {
    const queryClient = useQueryClient();
    const { items: guestItems, clearWishlist } = useGuestWishlistStore();

    return useMutation({
        mutationFn: async () => {
            if (!guestItems.length) return null;
            return mergeGuestWishlistAction(guestItems.map((i) => i.productId));
        },
        onSuccess: () => {
            clearWishlist();
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        },
    });
}
