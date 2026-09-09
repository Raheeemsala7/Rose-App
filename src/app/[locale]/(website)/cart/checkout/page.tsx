import {
    CheckoutStepper,
    CheckoutStep,
    ShippingStep,
    PaymentStep,
    type StepConfig,
} from '@/src/features/checkout/components';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const buildSteps = (t: ReturnType<typeof useTranslations<'checkout'>>): StepConfig[] => [
    { step: 1, title: t('steps.shipping') },
    { step: 2, title: t('steps.payment') },
];

interface CheckoutPageProps {
    params: Promise<{ locale: 'en' | 'ar' }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { locale } = await params;
    const t = await getTranslations('checkout');

    const steps = buildSteps(t as any);

    return (
        <div className="px-4 py-8 sm:px-8 sm:py-12">
            <CheckoutStepper steps={steps} defaultValue={1}>
                <CheckoutStep value={1}>
                    <ShippingStep locale={locale} />
                </CheckoutStep>
                <CheckoutStep value={2}>
                    <PaymentStep />
                </CheckoutStep>
            </CheckoutStepper>
        </div>
    );
}
