"use server"

import { getNextAuthToken } from "@/src/shared/lib/utils/auth.utils";
import { AddToCartPayload } from "../types/cart";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { HEADERS } from "@/src/shared/constant/api.constant";


export async function addToCartAction({ productId, quantity }: AddToCartPayload) {
    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/cart`, {
        method: "POST",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body:JSON.stringify({ productId, quantity })
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
        throw new Error(data.message || 'Failed to add product to cart');
    }

    return data
}
export async function removeCartItemsAction(cartItem:string) {
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
        throw new Error(data.message || 'Failed to add product to cart');
    }

    return data
}
export async function updateCartItemsAction(cartItem:string , quantity:number) {
    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/cart/${cartItem}`, {
        method: "PATCH",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        },
        body: JSON.stringify({quantity})
    })

    const data: ApiResponse<{}> = await res.json()

    console.log(data);
    

    if (!data.status) {
        throw new Error(data.message || 'Failed to add product to cart');
    }

    return data
}