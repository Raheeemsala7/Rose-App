'use client';

import { useCheckoutStepper } from '@/src/features/checkout/components/checkout-stepper';
import { StepperContent } from '@/src/shared/components/ui/stepper';

interface CheckoutStepProps {
    value: number;
    children: React.ReactNode;
}

export function CheckoutStep({ value, children }: CheckoutStepProps) {
    const { currentStep } = useCheckoutStepper();

    if (currentStep !== value) return null;

    return <StepperContent value={value}>{children}</StepperContent>;
}
