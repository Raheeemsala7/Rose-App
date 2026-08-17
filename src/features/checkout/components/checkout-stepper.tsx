'use client';

import { createContext, useContext, useState } from 'react';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
} from '@/shared/components/ui/stepper';

export interface StepConfig {
  step: number;
  title: string;
}

interface CheckoutStepperContextValue {
  currentStep: number;
  goToStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

const CheckoutStepperContext = createContext<CheckoutStepperContextValue | undefined>(undefined);

function useCheckoutStepper() {
  const context = useContext(CheckoutStepperContext);
  if (!context) {
    throw new Error('useCheckoutStepper must be used within CheckoutStepper');
  }
  return context;
}

interface CheckoutStepperProps {
  steps: StepConfig[];
  children: React.ReactNode;
  defaultValue?: number;
}

export function CheckoutStepper({ steps, children, defaultValue }: CheckoutStepperProps) {
  // State
  const [currentStep, setCurrentStep] = useState(defaultValue ?? steps[0].step);

  // Functions
  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    const nextStep = Math.min(currentStep + 1, steps.length);
    goToStep(nextStep);
  };

  const goToPreviousStep = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    goToStep(prevStep);
  };

  // Derived values
  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;

  return (
    <CheckoutStepperContext.Provider
      value={{ currentStep, goToStep, goToNextStep, goToPreviousStep, isLastStep, isFirstStep }}
    >
      <Stepper value={currentStep}>
        <StepperNav>
          {steps.map((step) => (
            <StepperItem key={step.step} step={step.step}>
              <StepperSeparator position="prev" />
              <StepperIndicator>{step.step}</StepperIndicator>
              <StepperSeparator position="next" />
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel>{children}</StepperPanel>
      </Stepper>
    </CheckoutStepperContext.Provider>
  );
}

export { useCheckoutStepper };
