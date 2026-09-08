import { getAuthCartApi } from "@/src/features/cart/apis/cart.apis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const products = await getAuthCartApi(req)

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