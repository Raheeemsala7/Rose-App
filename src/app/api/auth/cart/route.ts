import { getAuthCartProducts } from "@/src/features/cart/apis/cart.apis";
import { CartItem } from "@/src/features/cart/types/cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const products = await getAuthCartProducts(req)

    if (!products.status) {
        return NextResponse.json(
            {
                status: 404,
                message: products.message,
            },
            { status: 404 }
        );
    }

    return NextResponse.json(products)
}