'use client';

import { ArrowRight, Loader2, Banknote, CreditCard } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useTransition } from 'react';
import { useCheckoutStepper } from '@/src/features/checkout/components/checkout-stepper';
import { useCheckoutStore } from '@/src/features/checkout/store/checkout.store';
import { useCheckoutMutation } from '@/src/features/checkout/hooks/checkout.hook';
import { useCouponStore } from '@/src/features/summary-order/store/coupon.store';
import { cn } from '@/src/shared/lib/utils';
import { PaymentMethod } from '../../types/checkout';

interface PaymentMethodOption {
    id: PaymentMethod;
    icon: React.ReactNode;
    labelKey: 'cashOnDelivery' | 'creditCard';
    descKey: 'cashOnDeliveryDescription' | 'creditCardDescription';
}

const PAYMENT_METHODS: PaymentMethodOption[] = [
    {
        id: 'CASH_ON_DELIVERY',
        icon: <Banknote className="size-16 text-ds-text-primary" />,
        labelKey: 'cashOnDelivery',
        descKey: 'cashOnDeliveryDescription',
    },
    {
        id: 'CREDIT_CARD',
        icon: <CreditCard className="size-16 text-ds-text-primary" />,
        labelKey: 'creditCard',
        descKey: 'creditCardDescription',
    },
];

export function PaymentStep() {
    const t = useTranslations('checkout.paymentMethod');
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();

    const { mutateAsync: checkout } = useCheckoutMutation();
    const { goToPreviousStep, isLastStep } = useCheckoutStepper();

    const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
    const addressId = useCheckoutStore((state) => state.addressId);
    const updateCheckout = useCheckoutStore((state) => state.updateCheckout);

    // Read applied coupon code from coupon store
    const coupon = useCouponStore((state) => state.coupon);

    function handleCheckout() {
        startTransition(async () => {
            await checkout({
                addressId,
                paymentMethod,
                couponCode: coupon?.code,
            });
        });
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm bg-ds-subtle border border-ds-border-muted text-ds-text-default hover:bg-ds-soft transition-colors cursor-pointer"
                >
                    <ArrowRight
                        size={16}
                        className={locale === 'ar' ? undefined : 'rotate-180'}
                    />
                    {t('back')}
                </button>
                <h2 className="text-2xl font-semibold text-ds-text-plain">{t('title')}</h2>
            </div>

            {/* Payment method cards */}
            <div className="grid gap-4 sm:grid-cols-2">
                {PAYMENT_METHODS.map((method) => {
                    const isSelected = paymentMethod === method.id;

                    return (
                        <button
                            key={method.id}
                            type="button"
                            onClick={() => updateCheckout({ paymentMethod: method.id })}
                            className={cn(
                                'flex flex-col items-center justify-center gap-3 rounded-2xl border p-8 text-center transition-all cursor-pointer',
                                isSelected
                                    ? 'border-ds-border-primary bg-ds-primary-fade shadow-ds-soft'
                                    : 'border-ds-border-muted bg-ds-subtle hover:border-ds-border-primary hover:shadow-ds-soft'
                            )}
                        >
                            {method.icon}
                            <h3 className={cn(
                                'text-lg font-semibold',
                                isSelected ? 'text-ds-text-primary' : 'text-ds-text-plain'
                            )}>
                                {t(method.labelKey)}
                            </h3>
                            <p className="text-sm text-ds-text-muted">
                                {t(method.descKey)}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Submit */}
            {isLastStep && (
                <div className="flex justify-end">
                    <button
                        type="button"
                        disabled={!paymentMethod || isPending}
                        onClick={handleCheckout}
                        className="flex items-center gap-2 rounded-xl bg-ds-primary px-6 py-2.5 text-ds-text-inverse transition-colors hover:bg-ds-primary-saturated disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    >
                        {isPending && <Loader2 className="size-4 animate-spin" />}
                        {t('checkout')}
                        <ArrowRight
                            size={16}
                            className={locale === 'ar' ? 'rotate-180' : undefined}
                        />
                    </button>
                </div>
            )}
        </div>
    );
}
