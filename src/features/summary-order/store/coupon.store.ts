'use client';

import { create } from 'zustand';
import { ICoupon } from '../types/copons';

type CouponStore = {
    coupon: ICoupon | null;
    setCoupon: (coupon: ICoupon | null) => void;
    clearCoupon: () => void;
};

export const useCouponStore = create<CouponStore>((set) => ({
    coupon: null,
    setCoupon: (coupon) => set({ coupon }),
    clearCoupon: () => set({ coupon: null }),
}));
