'use client';

import { useState } from 'react';
import { getCouponApi } from '../apis/coupon.api';
import { ICoupon } from '../types/copons';

type UseCouponReturn = {
    applyCoupon: (code: string) => Promise<ICoupon | null>;
    isPending: boolean;
};

export function useApplyCoupon(): UseCouponReturn {
    const [isPending, setIsPending] = useState(false);

    async function applyCoupon(code: string): Promise<ICoupon | null> {
        setIsPending(true);
        try {
            const res = await getCouponApi(code);
            return res.payload.data[0] ?? null;
        } finally {
            setIsPending(false);
        }
    }

    return { applyCoupon, isPending };
}
