import { useTranslations } from 'next-intl';
import { Order } from '../types/order';
import OrderCard from './order-card';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function OrderList({ orders }: { orders: Order[] }) {
    const t = useTranslations('orders');

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-ds-border-muted bg-ds-subtle px-8 py-16 text-center">
                <ShoppingCart className="size-14 text-ds-text-muted" strokeWidth={1.5} />
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-ds-text-plain">{t('no-orders')}</h2>
                    <p className="text-sm text-ds-text-muted">{t('no-orders-desc')}</p>
                </div>
                <Link href="/">
                    <Button>{t('go-home')}</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}
