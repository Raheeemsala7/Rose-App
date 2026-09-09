import { CheckoutButton } from '@/src/features/summary-order/_components/checkout-button';
import { CouponSection } from '@/src/features/summary-order/_components/coupon-section';
import { OrderSummary } from '@/src/features/summary-order/_components/order-summary';
import { SubTotalPrice } from '@/src/features/summary-order/_components/subtotal-price';
import { TotalPrice } from '@/src/features/summary-order/_components/total-price';
import React from 'react';

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-screen-2xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-10 py-6">
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">

                {/* Cart items — full width on mobile, left col on desktop */}
                <section className="min-w-0">{children}</section>

                {/* Order summary — below on mobile, sticky sidebar on desktop */}
                <aside className="lg:sticky lg:top-24">
                    <OrderSummary
                        couponForm={<CouponSection />}
                        subtotal={<SubTotalPrice currency="EGP" />}
                        totalPrice={<TotalPrice currency="EGP" />}
                        checkoutButton={<CheckoutButton />}
                    />
                </aside>

            </div>
        </div>
    );
}
