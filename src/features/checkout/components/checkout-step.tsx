'use client';
import { StepperContent } from '@/shared/components/ui/stepper';
import { useCheckoutStepper } from '@/features/checkout/components/checkout-stepper';

interface CheckoutStepProps {
  value: number;
  children: React.ReactNode;
}

export function CheckoutStep({ value, children }: CheckoutStepProps) {
  const { currentStep } = useCheckoutStepper();

  if (currentStep !== value) {
    return null;
  }

  return <StepperContent value={value}>{children}</StepperContent>;
}
