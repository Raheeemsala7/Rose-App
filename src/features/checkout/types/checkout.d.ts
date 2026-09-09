export type PaymentMethod = "CREDIT_CARD" | "CASH_ON_DELIVERY"

export interface PayloadCheckOut {
    addressId: string,
    paymentMethod: PaymentMethod
    couponCode?: string,
}
export type OrderStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED';

export type PaymentMethod =
    | 'CASH_ON_DELIVERY'
    | 'CREDIT_CARD';

export type PaymentStatus =
    | 'PENDING'
    | 'PAID'
    | 'FAILED'
    | 'REFUNDED';

export type OrderItem = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: string;
    total: string;
};

export type CheckoutSession = {
    checkoutUrl: string;
    sessionId: string;
    expiresAt: string;
    reused: boolean;
};

export type CheckoutResponse = {
    order: {
        id: string;
        userId: string;
        addressId: string;
        couponId: string | null;

        status: OrderStatus;
        paymentMethod: PaymentMethod;
        paymentStatus: PaymentStatus;

        stripePaymentIntentId: string | null;
        stripeCheckoutSessionId: string | null;

        subtotal: string;
        discount: string;
        shipping: string;
        total: string;

        trackingNumber: string | null;
        notes: string | null;

        createdAt: string;
        updatedAt: string;

        orderItems: OrderItem[];
    };

    checkout: CheckoutSession | null;
};