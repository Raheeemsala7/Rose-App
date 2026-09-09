'use client';

import { create } from 'zustand';
import { PaymentMethod } from '../types/checkout';

interface CheckoutState {
    addressId: string;
    paymentMethod: PaymentMethod;
    couponCode?: string;
}

interface CheckoutStore extends CheckoutState {
    updateCheckout: (data: Partial<CheckoutState>) => void;
    resetCheckout: () => void;
}

const defaultState: CheckoutState = {
    addressId: '',
    paymentMethod: 'CASH_ON_DELIVERY',
    couponCode: undefined,
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
    ...defaultState,
    updateCheckout: (data) => set((prev) => ({ ...prev, ...data })),
    resetCheckout: () => set(defaultState),
}));
