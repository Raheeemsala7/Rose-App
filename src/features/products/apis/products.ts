import { ParamsProducts, Product } from "../types/product";

export async function getProductsApi(params: ParamsProducts) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const response = await fetch(
        `${process.env.API_URL}/products?${searchParams.toString()}`
    );

    const data: ApiResponse<{
        data: Product[];
        metadata: {
            page: string;
            limit: string;
            total: string;
            totalPages: string;
        };
    }> = await response.json();

    if (!data.status) {
        throw new Error(data.message || "Failed to fetch products");
    }

    return data;
}
export async function getSingleProductApi(id: string) {
    const response = await fetch(
        `${process.env.API_URL}/products/${id}`,
        { cache: 'no-store' }
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch product ${id}`);
    }

    const data: ApiResponse<{ product: Product }> = await response.json();

    if (!data.status) {
        throw new Error(data.message || "Failed to fetch product");
    }

    return data;
}



