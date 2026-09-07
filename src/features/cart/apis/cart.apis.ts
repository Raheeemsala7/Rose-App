import { getSingleProductApi } from "../../products/apis/products";
import { Product } from "../../products/types/product";

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
        .map((result) => result.value);
}





export async function getClientCartProducts(productIds: string[]): Promise<Product[]> {
    if (productIds.length === 0) return [];

    const response = await fetch(`/api/cart-products?ids=${productIds.join(',')}`);

    if (!response.ok) {
        throw new Error('Failed to fetch cart products');
    }

    return response.json();
}
