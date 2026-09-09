'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ICoupon } from '../types/copons';

type CouponStore = {
    coupon: ICoupon | null;
    setCoupon: (coupon: ICoupon | null) => void;
    clearCoupon: () => void;
};

export const useCouponStore = create<CouponStore>()(
    persist(
        (set) => ({
            coupon: null,
            setCoupon: (coupon) => set({ coupon }),
            clearCoupon: () => set({ coupon: null }),
        }),
        { name: 'applied-coupon' }
    )
);
