'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/src/i18n/navigation';
import { toast } from 'sonner';
import { checkoutAction } from '../apis/checkout.action';
import { useCheckoutStore } from '../store/checkout.store';
import { useCouponStore } from '@/src/features/summary-order/store/coupon.store';

export function useCheckoutMutation() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const resetCheckout = useCheckoutStore((state) => state.resetCheckout);
    const clearCoupon = useCouponStore((state) => state.clearCoupon);

    return useMutation({
        mutationFn: checkoutAction,
        onSuccess: (data) => {
            // Clear all order-related client state so the next order starts fresh
            resetCheckout();
            clearCoupon();
            queryClient.invalidateQueries({ queryKey: ['cart'] });

            const checkoutSession = data.payload?.checkout;
            if (checkoutSession?.checkoutUrl) {
                // Credit card — redirect to payment gateway
                window.location.href = checkoutSession.checkoutUrl;
                return;
            }

            // Cash on delivery — go to orders page
            router.push('/orders');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
