import { NextRequest } from "next/server";
import { getSingleProductApi } from "../../products/apis/products";
import { Product } from "../../products/types/product";
import { getToken } from "next-auth/jwt";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { HEADERS } from "@/src/shared/constant/api.constant";
import { CartItem, GetCartPayload } from "../types/cart";

export async function getCartProductsApi(productIds: string[]) {

    if (!productIds.length) return [];

    const results = await Promise.allSettled(
        productIds.map((id) => getSingleProductApi(id))
    );

    return results
        .filter(
            (result): result is PromiseFulfilledResult<
                Awaited<ReturnType<typeof getSingleProductApi>>
            > => result.status === 'fulfilled'
        )
        .map((result) => result.value.payload.product);
}





export async function getGuestCartProducts(productIds: string[]): Promise<Product[]> {
    if (productIds.length === 0) return [];

    const response = await fetch(`/api/cart-products?ids=${productIds.join(',')}`);

    if (!response.ok) {
        throw new Error('Failed to fetch cart products');
    }

    return response.json();
}


export async function getAuthCartProducts(req: NextRequest) {
    const token = await getToken({ req })

    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/cart`, {
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token)
        }
    })

    const data: ApiResponse<GetCartPayload> = await res.json()
    console.log(data);

    if (!data.status) {
        return {
            status: false as const,
            code: res.status,
            message: data.message || "fetch items cart failed",
        };
    }

    return data
}