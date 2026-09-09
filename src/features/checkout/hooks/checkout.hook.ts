'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/src/i18n/navigation';
import { toast } from 'sonner';
import { checkoutAction } from '../apis/checkout.action';
import { useCheckoutStore } from '../store/checkout.store';

export function useCheckoutMutation() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const resetCheckout = useCheckoutStore((state) => state.resetCheckout);

    return useMutation({
        mutationFn: checkoutAction,
        onSuccess: (data) => {
            const checkoutSession = data.payload?.checkout;

            // Invalidate cart so it reflects the cleared state after order
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            resetCheckout();

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
