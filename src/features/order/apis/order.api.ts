import { HEADERS } from "@/shared/constant/api-header.constants";
import { RESPONSES } from "@/shared/constant/api.responses";
import { IApiResponse } from "@/shared/lib/types/api";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";
import { Order } from "../types/order";

export async function getOrdersApi() {
    const token = await getNextAuthToken()
    if (!token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/orders`, {
        method: "GET",
        headers: {
            ...HEADERS.JSON,
            ...HEADERS.AUTH(token.token),
        },
    })
    const data: IApiResponse<Order[]> = await res.json()
    if (!data.status) {
        throw new Error(data.message || "Failed to get orders")
    }
    return data
}