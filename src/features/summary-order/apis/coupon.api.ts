import { ICoupon } from '../types/copons';

interface CouponApiResponse {
    status: boolean;
    message?: string;
    payload: {
        data: ICoupon[];
    };
}

export async function getCouponApi(code: string): Promise<CouponApiResponse> {
    const res = await fetch(`/api/coupons?code=${encodeURIComponent(code)}`);
    const data: CouponApiResponse = await res.json();

    if (!res.ok || !data.status) {
        throw new Error(data.message ?? 'Failed to fetch coupon');
    }

    return data;
}
