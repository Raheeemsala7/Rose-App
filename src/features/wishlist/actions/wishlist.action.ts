'use server';

import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';
import { HEADERS } from '@/src/shared/constant/api.constant';
import { RESPONSES } from '@/src/shared/constant/api.responses';

export async function addToWishlistAction(productId: string) {
    const token = await getNextAuthToken();
    if (!token?.token) return RESPONSES.unauthorized;

    const res = await fetch(`${process.env.API_URL}/wishlist`, {
        method: 'POST',
        headers: { ...HEADERS.JsonBody, ...HEADERS.authorize(token.token) },
        body: JSON.stringify({ productId }),
    });

    const data: ApiResponse<unknown> = await res.json();
    if (!data.status) throw new Error(data.message || 'Failed to add to wishlist');
    return data;
}

export async function removeFromWishlistAction(wishlistItemId: string) {
    const token = await getNextAuthToken();
    if (!token?.token) return RESPONSES.unauthorized;

    const res = await fetch(`${process.env.API_URL}/wishlist/${wishlistItemId}`, {
        method: 'DELETE',
        headers: { ...HEADERS.JsonBody, ...HEADERS.authorize(token.token) },
    });

    const data: ApiResponse<unknown> = await res.json();
    if (!data.status) throw new Error(data.message || 'Failed to remove from wishlist');
    return data;
}

export async function clearWishlistAction() {
    const token = await getNextAuthToken();
    if (!token?.token) return RESPONSES.unauthorized;

    const res = await fetch(`${process.env.API_URL}/wishlist`, {
        method: 'DELETE',
        headers: { ...HEADERS.JsonBody, ...HEADERS.authorize(token.token) },
    });

    const data: ApiResponse<unknown> = await res.json();
    if (!data.status) throw new Error(data.message || 'Failed to clear wishlist');
    return data;
}

/**
 * Merges guest wishlist into the server after login.
 * Uses Promise.allSettled so one failure doesn't abort the rest.
 */
export async function mergeGuestWishlistAction(productIds: string[]) {
    const token = await getNextAuthToken();
    if (!token?.token) return RESPONSES.unauthorized;
    if (!productIds.length) return { status: true, merged: 0, failed: 0 };

    const results = await Promise.allSettled(
        productIds.map((productId) =>
            fetch(`${process.env.API_URL}/wishlist`, {
                method: 'POST',
                headers: { ...HEADERS.JsonBody, ...HEADERS.authorize(token.token as string) },
                body: JSON.stringify({ productId }),
            }).then((r) => r.json())
        )
    );

    return {
        status: true,
        merged: results.filter((r) => r.status === 'fulfilled').length,
        failed: results.filter((r) => r.status === 'rejected').length,
    };
}
