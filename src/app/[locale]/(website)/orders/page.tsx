import { authOptions } from "@/auth";
import { getOrdersApi } from "@/features/order/apis/order.api";
import OrderList from "@/features/order/components/order-list";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

export default async function OrdersPage() {
    const t = await getTranslations("orders");
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error(t("failed-to-load"));
    }

    const orders = await getOrdersApi();
    console.log(orders)

    return (
        <div className="mx-auto px-4 py-8 container">
            <div className="mx-auto max-w-[1280px]">
                <h1 className="mb-6 font-primary font-bold text-gray-800 text-5xl leading-none">
                    {t("title")}
                </h1>
            </div>
            {/* <OrderList orders={orders.} /> */}
        </div>
    );
}