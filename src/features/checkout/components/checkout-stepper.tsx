'use client';

import { createContext, useContext, useState } from 'react';
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperNav,
    StepperPanel,
    StepperSeparator,
} from '@/src/shared/components/ui/stepper';
import { Check } from 'lucide-react';
import { cn } from '@/src/shared/lib/utils';

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

export function useCheckoutStepper() {
    const ctx = useContext(CheckoutStepperContext);
    if (!ctx) throw new Error('useCheckoutStepper must be used within CheckoutStepper');
    return ctx;
}

interface CheckoutStepperProps {
    steps: StepConfig[];
    children: React.ReactNode;
    defaultValue?: number;
}

export function CheckoutStepper({ steps, children, defaultValue }: CheckoutStepperProps) {
    const [currentStep, setCurrentStep] = useState(defaultValue ?? steps[0].step);

    const goToStep = (step: number) => setCurrentStep(step);
    const goToNextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
    const goToPreviousStep = () => setCurrentStep((s) => Math.max(s - 1, 1));
    const isLastStep = currentStep === steps.length;
    const isFirstStep = currentStep === 1;

    return (
        <CheckoutStepperContext.Provider
            value={{ currentStep, goToStep, goToNextStep, goToPreviousStep, isLastStep, isFirstStep }}
        >
            <Stepper value={currentStep}>
                {/* Step nav */}
                <StepperNav className="mb-8">
                    {steps.map((step) => {
                        const isCompleted = step.step < currentStep;
                        const isActive = step.step === currentStep;

                        return (
                            <StepperItem key={step.step} step={step.step} completed={isCompleted}>
                                <StepperSeparator position="prev" />

                                <div className="flex flex-col items-center gap-2">
                                    <StepperIndicator
                                        className={cn(
                                            'size-10 text-base font-semibold transition-colors',
                                            isCompleted && 'bg-ds-primary text-white',
                                            isActive && 'bg-ds-primary text-white ring-4 ring-ds-primary-faint',
                                            !isCompleted && !isActive && 'bg-ds-muted text-ds-text-muted'
                                        )}
                                    >
                                        {isCompleted ? <Check className="size-5" /> : step.step}
                                    </StepperIndicator>

                                    <span className={cn(
                                        'hidden text-xs font-medium sm:block',
                                        isActive ? 'text-ds-text-primary' : 'text-ds-text-muted'
                                    )}>
                                        {step.title}
                                    </span>
                                </div>

                                <StepperSeparator position="next" />
                            </StepperItem>
                        );
                    })}
                </StepperNav>

                <StepperPanel>{children}</StepperPanel>
            </Stepper>
        </CheckoutStepperContext.Provider>
    );
}
