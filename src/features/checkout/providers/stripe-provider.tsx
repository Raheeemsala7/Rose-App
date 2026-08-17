"use client";

import { stripePromise } from "@/shared/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
type StripeProviderProps = {
    clientSecret: string;
    children: React.ReactNode;
};

export default function StripeProvider({
    clientSecret,
    children,
}: StripeProviderProps) {
    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
            }}
        >
            {children}
        </Elements>
    );
}