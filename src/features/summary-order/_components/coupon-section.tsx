'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ICoupon } from '../types/copons';
import { useCouponStore } from '../store/coupon.store';
import { useApplyCoupon } from '../hooks/coupon.hook';
import { useCart } from '@/src/features/cart/hooks/cart.hooks';
import { toast } from 'sonner';
import { CouponForm } from './coupon-form';
import { CouponList } from './coupon-list';

export function CouponSection() {
    const t = useTranslations('order-summary');

    const [coupons, setCoupons] = useState<ICoupon[]>([]);
    const setCoupon = useCouponStore((state) => state.setCoupon);
    const clearCoupon = useCouponStore((state) => state.clearCoupon);
    const { totalPrice } = useCart();

    const { applyCoupon, isPending } = useApplyCoupon();

    async function handleApplyCoupon(code: string) {
        try {
            const coupon = await applyCoupon(code);

            if (!coupon) {
                setCoupons([]);
                clearCoupon();
                toast.error(t('coupon-not-found'));
                return;
            }

            const minPurchase = Number(coupon.minPurchase) || 0;
            const subtotal = Number(totalPrice) || 0;

            setCoupons([coupon]);
            setCoupon(coupon);

            if (subtotal < minPurchase) {
                toast.warning(t('coupon-min-purchase'));
            } else {
                toast.success(t('coupon-found'));
            }
        } catch (error) {
            clearCoupon();
            toast.error(error instanceof Error ? error.message : t('coupon-not-found'));
        }
    }

    function handleRemoveCoupon(id: string) {
        setCoupons((prev) => prev.filter((c) => c.id !== id));
        clearCoupon();
    }

    return (
        <div className="space-y-3">
            <CouponForm onApply={handleApplyCoupon} isPending={isPending} />
            <CouponList coupons={coupons} onRemove={handleRemoveCoupon} />
        </div>
    );
}
