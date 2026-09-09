'use client';

import { useMemo } from 'react';
import { useCart } from '@/src/features/cart/hooks/cart.hooks';
import { useCouponStore } from '../store/coupon.store';
import { useLocale, useTranslations } from 'next-intl';
import { formatLocaleNumber } from '@/src/shared/lib/utils/format-number';

interface TotalPriceProps {
    currency?: string;
}

export function TotalPrice({ currency = 'EGP' }: TotalPriceProps) {
    const t = useTranslations('order-summary');
    const locale = useLocale();
    const { totalPrice } = useCart();
    const coupon = useCouponStore((state) => state.coupon);

    const { total, discount } = useMemo(() => {
        const subtotal = Number(totalPrice) || 0;

        if (!coupon) return { total: subtotal, discount: 0 };

        const couponValue  = Number(coupon.value)       || 0;
        const maxDiscount  = Number(coupon.maxDiscount)  || 0;
        const minPurchase  = Number(coupon.minPurchase)  || 0;

        // Coupon only applies if subtotal meets minimum purchase requirement
        if (subtotal < minPurchase) return { total: subtotal, discount: 0 };

        const calculatedDiscount =
            coupon.type === 'PERCENT'
                ? Math.min((subtotal * couponValue) / 100, maxDiscount)
                : Math.min(couponValue, subtotal);

        return {
            total: Math.max(subtotal - calculatedDiscount, 0),
            discount: calculatedDiscount,
        };
    }, [totalPrice, coupon]);

    return (
        <div className="flex flex-col gap-2">
            {/* Discount row — only shown when a coupon is active and valid */}
            {coupon && discount > 0 && (
                <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-ds-text-success font-medium">
                        {t('discount')} ({coupon.code})
                    </span>
                    <span className="text-ds-text-success font-medium">
                        − {formatLocaleNumber(discount, locale)}
                        <span className="ms-1 text-xs">{currency}</span>
                    </span>
                </div>
            )}

            {/* Total row */}
            <div className="flex items-center justify-between gap-2 border-t border-ds-border-muted pt-3">
                <span className="text-base font-bold text-ds-text-primary">{t('total')}</span>
                <span className="text-base font-bold text-ds-text-primary">
                    {formatLocaleNumber(total, locale)}
                    <span className="ms-1 text-sm font-medium">{currency}</span>
                </span>
            </div>
        </div>
    );
}
