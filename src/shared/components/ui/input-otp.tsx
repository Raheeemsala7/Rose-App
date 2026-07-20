'use client';

import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { OTPField } from '@base-ui/react/otp-field';

import { cn } from '@/lib/utils';
import { MinusIcon } from 'lucide-react';

function InputOTP({
  className,
  containerClassName,
  maxLength,
  length,
  ...props
}: Omit<React.ComponentProps<typeof OTPField.Root>, 'className' | 'length'> & {
  className?: string;
  containerClassName?: string;
  maxLength?: number;
  length?: number;
}) {
  const otpLength = length ?? maxLength ?? 6;

  return (
    <Field.Root render={<div className="contents" />}>
      <OTPField.Root
        data-slot="input-otp"
        length={otpLength}
        className={cn(
          'cn-input-otp flex items-center has-disabled:opacity-50 [&:has(:disabled)_[data-slot=input-otp-slot]]:bg-muted [&:has(:disabled)_[data-slot=input-otp-slot]]:text-muted-foreground',
          containerClassName,
          className
        )}
        {...props}
      />
    </Field.Root>
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        'flex items-center rounded-md has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
        className
      )}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: Omit<React.ComponentProps<typeof OTPField.Input>, 'className'> & {
  index: number;
  className?: string;
}) {
  return (
    <OTPField.Input
      data-slot="input-otp-slot"
      className={cn(
        'relative flex size-9 items-center justify-center border-y border-r border-input bg-transparent text-center text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:border-ds-primary focus:ring-0 focus:ring-ring/50 aria-invalid:border-destructive focus:aria-invalid:border-destructive focus:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:focus:aria-invalid:ring-destructive/40',
        className
      )}
      aria-label={`Character ${index + 1}`}
      {...props}
    />
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
