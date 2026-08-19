import { authOptions } from "@/src/auth";
import { getOrdersApi } from "@/src/features/order/apis/order.api";
import OrderList from "@/src/features/order/components/order-list";
import PaginationOrders from "@/src/features/order/components/pagination-orders";
import { Link } from "@/src/i18n/navigation";
import { buttonVariants } from "@/src/shared/components/ui/button";
import { ORDERS_PER_PAGE } from "@/src/shared/constant/orders-constant";
import { cn } from "@/src/shared/lib/utils";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function OrdersPage({ searchParams }: {
    searchParams: Promise<{
        page?: string;
        limit?: string;
    }>;
}) {
    // Translation
    const t = await getTranslations("orders");
    // Session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }


    const params = await searchParams;

  const page = Number(params.page ?? "1");
    const limit = Number(params.limit ?? ORDERS_PER_PAGE);

    const orders = await getOrdersApi({ page, limit });

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="mx-auto">
                <h5 className="mb-6  font-bold text-zinc-700 dark:text-zinc-50 text-5xl leading-none">
                    {t("title")}
                </h5>
            </div>
            {!orders.status ?
                <div className="flex justify-center items-center flex-col gap-6">
                    <h2 className="text-lg font-semibold mb-2 text-primary">{t("errorTitle")}</h2>
                    <p className="text-muted-foreground mb-4">{t("errorDesc")}</p>
                    <Link
                        href="/"
                        className={cn("inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition", buttonVariants({}))}
                    >
                        {t("go-home")}
                    </Link>
                </div>
                :
                <div className="space-y-4">
                    <OrderList orders={orders.payload?.data || []} />
                    <PaginationOrders page={page} totalPages={Number(orders.payload?.metadata?.totalPages) || 1} />
                </div>
            }
        </div>
    );
}