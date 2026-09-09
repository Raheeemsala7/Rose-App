import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface OrderSummaryProps {
    couponForm: ReactNode;
    couponList?: ReactNode;
    subtotal?: ReactNode;
    totalPrice: ReactNode;
    summaryItems?: ReactNode;
    checkoutButton?: ReactNode;
    className?: string;
}

export function OrderSummary({
    couponForm,
    couponList,
    totalPrice,
    subtotal,
    summaryItems,
    checkoutButton,
    className,
}: OrderSummaryProps) {
    const t = useTranslations('order-summary');

    return (
        <div className={`flex flex-col gap-4 rounded-2xl border border-ds-border-muted bg-ds-subtle p-5 ${className ?? ''}`}>
            {/* Title */}
            <h2 className="text-xl font-bold text-ds-text-plain">
                {t('title', { title: '' })}
            </h2>

            {/* Coupon + items block */}
            <div className="flex flex-col gap-3 rounded-xl bg-ds-plain p-4 border border-ds-border-muted">
                {couponForm}
                {couponList}
                {summaryItems}
            </div>

            {/* Price block */}
            <div className="flex flex-col gap-3 rounded-xl bg-ds-plain p-4 border border-ds-border-muted">
                {subtotal}
                {totalPrice}
            </div>

            {/* CTA */}
            {checkoutButton}
        </div>
    );
}
