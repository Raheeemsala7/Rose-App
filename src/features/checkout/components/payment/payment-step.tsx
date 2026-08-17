'use client';
import { useCheckoutStepper } from '@/features/checkout/components/checkout-stepper';

export function PaymentStep() {
  const { goToPreviousStep, isLastStep } = useCheckoutStepper();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <p>Enter your payment details here.</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={goToPreviousStep}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Shipping
        </button>
        {isLastStep && (
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Complete Order
          </button>
        )}
      </div>
    </div>
  );
}
