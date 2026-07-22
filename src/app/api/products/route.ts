import { getProductsApi } from "@/src/features/products/apis/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const data = await getProductsApi({
            page: Number(searchParams.get("page")) || 1,
            limit: Number(searchParams.get("limit")) || 10,
            categoryId: searchParams.get("categoryId") || undefined,
            subCategoryId: searchParams.get("subCategoryId") || undefined,
            occasionId: searchParams.get("occasionId") || undefined,
            minPrice: searchParams.get("minPrice")
                ? Number(searchParams.get("minPrice"))
                : undefined,
            maxPrice: searchParams.get("maxPrice")
                ? Number(searchParams.get("maxPrice"))
                : undefined,
            minRating: searchParams.get("minRating")
                ? Number(searchParams.get("minRating"))
                : undefined,
            sortBy: searchParams.get("sortBy") as any,
            sortOrder: searchParams.get("sortOrder") as any,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { status: false, message: "Failed to fetch products" },
            { status: 500 }
        );
    }
}