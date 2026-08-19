
import { ORDERS_PER_PAGE } from "@/src/shared/constant/orders-constant";
import { Order } from "../types/order";
import { RESPONSES } from "@/src/shared/constant/api.responses";
import { HEADERS } from "@/src/shared/constant/api.constant";
import { getNextAuthToken } from "@/src/shared/lib/utils/auth.utils";


export async function getOrdersApi({ page = 1, limit = ORDERS_PER_PAGE }: { page?: number; limit?: number }) {
    const token = await getNextAuthToken()
    if (!token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/orders?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token),
        },
    })
    const data: ApiResponse<{
        data: Order[];
        metadata: {
            page: string;
            limit: string;
            total: string;
            totalPages: string;
        }
    }> = await res.json()
    if (!data.status) {
        throw new Error(data.message || "Failed to get orders")
    }
    return data
}