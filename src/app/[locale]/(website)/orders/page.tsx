import { authOptions } from '@/src/auth';
import { getOrdersApi } from '@/src/features/order/apis/order.api';
import OrderList from '@/src/features/order/components/order-list';
import PaginationOrders from '@/src/features/order/components/pagination-orders';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/components/ui/button';
import { ORDERS_PER_PAGE } from '@/src/shared/constant/orders-constant';
import { ShoppingBag } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

interface OrdersPageProps {
    searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
    const t = await getTranslations('orders');
    const session = await getServerSession(authOptions);

    if (!session?.user) redirect('/login');

    const params = await searchParams;
    const page = Math.max(Number(params.page ?? '1'), 1);
    const limit = Number(params.limit ?? ORDERS_PER_PAGE);

    const orders = await getOrdersApi({ page, limit });

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <ShoppingBag className="size-7 text-ds-text-primary" />
                <h1 className="text-3xl font-bold text-ds-text-plain sm:text-4xl">
                    {t('title')}
                </h1>
            </div>

            {!orders.status ? (
                /* Error state */
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-ds-border-muted bg-ds-subtle p-12 text-center">
                    <p className="text-lg font-semibold text-ds-text-plain">{t('errorTitle')}</p>
                    <p className="text-sm text-ds-text-muted">{t('errorDesc')}</p>
                    <Link href="/">
                        <Button>{t('go-home')}</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    <OrderList orders={orders.payload?.data ?? []} />
                    <PaginationOrders
                        page={page}
                        totalPages={Number(orders.payload?.metadata?.totalPages) || 1}
                    />
                </div>
            )}
        </div>
    );
}
