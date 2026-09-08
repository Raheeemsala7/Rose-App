"use server"

import { getNextAuthToken } from "@/src/shared/lib/utils/auth.utils";
import { AddToCartPayload, GuestCartMergePayload } from "../types/cart";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { HEADERS } from "@/src/shared/constant/api.constant";


export async function addToCartAction({ productId, quantity }: AddToCartPayload) {
    const token = await getNextAuthToken()
    console.log("TOKEN L: " , token);
    
    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/cart`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body: JSON.stringify({ productId, quantity })
    })

    const data: ApiResponse<AddToCartPayload> = await res.json()

    if (!data.status) {
        throw new Error(data.message || 'Failed to add product to cart');
    }

    return data
}

export async function removeAllCartItemsAction() {
    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/cart`, {
        method: "DELETE",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
    })

    const data: ApiResponse<{}> = await res.json()

    if (!data.status) {
        throw new Error(data.message || 'Failed to clear cart');
    }

    return data
}

export async function removeCartItemsAction(cartItem: string) {
    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/cart/${cartItem}`, {
        method: "DELETE",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
    })

    const data: ApiResponse<{}> = await res.json()

    if (!data.status) {
        throw new Error(data.message || 'Failed to remove cart item');
    }

    return data
}

export async function updateCartItemsAction(cartItem: string, quantity: number) {
    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/cart/${cartItem}`, {
        method: "PATCH",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body: JSON.stringify({ quantity })
    })

    const data: ApiResponse<{}> = await res.json()

    if (!data.status) {
        throw new Error(data.message || 'Failed to update cart item');
    }

    return data
}

/**
 * Merges guest cart items into the authenticated user's server cart.
 * Called once after a successful login when the guest cart is non-empty.
 * Uses Promise.allSettled so a single failed item does not abort the rest.
 */
export async function mergeGuestCartAction(items: GuestCartMergePayload[]) {
    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized

    if (!items.length) return { status: true, merged: 0, failed: 0 }

    const results = await Promise.allSettled(
        items.map(({ productId, quantity }) =>
            fetch(`${process.env.API_URL}/cart`, {
                method: "POST",
                headers: {
                    ...HEADERS.JsonBody,
                    ...HEADERS.authorize(token.token as string)
                },
                body: JSON.stringify({ productId, quantity })
            }).then((res) => res.json())
        )
    )

    const merged = results.filter((r) => r.status === "fulfilled").length
    const failed = results.filter((r) => r.status === "rejected").length

    return { status: true, merged, failed }
}
