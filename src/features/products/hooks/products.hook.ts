"use client"

import { useQuery } from "@tanstack/react-query";
import { ParamsProducts, Product } from "../types/product";


export function useGetProductsQuery(params: ParamsProducts) {
    return useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const searchParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    searchParams.append(key, String(value));
                }
            });

            const res = await fetch(`/api/products?${searchParams.toString()}`);

            const data: ApiResponse<{
                data: Product[],
                metadata: MetadataData
            }> = await res.json()
            if (!data.status) {
                throw new Error("Failed to fetch products");
            }

            return data
        },
    });
}