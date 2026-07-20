'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

interface OtpFieldProps {
  id?: string;
  disabled?: boolean;
  isError?: boolean;
}

export function OtpField({
  id,
  disabled = false,
  isError = false,
}: OtpFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <InputOTP
      id={inputId}
      maxLength={6}
      validationType="numeric"
      disabled={disabled}
      containerClassName="w-full"
      aria-invalid={isError}
    >
      <InputOTPGroup className="w-full flex items-center gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className={cn(
              'size-12 rounded-xl border-[1.5px] border-ds-border-default text-base shadow-xs hover:border-ds-border-primary-fade data-[active=true]:border-ds-border-primary data-[active=true]:shadow-[var(--shadow-ds-subtle-sm)] data-[active=true]:ring-0 first:rounded-2xl first:border-[1.5px] last:rounded-xl',
              isError &&
                'border-danger ring-3 ring-danger/20 data-[active=true]:border-danger',
              disabled && 'border-0 bg-ds-muted first:border-0'
            )}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
