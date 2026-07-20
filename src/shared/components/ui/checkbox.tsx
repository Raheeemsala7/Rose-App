'use client';

import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';

import { cn } from '../../lib/utils';

type CheckboxProps = CheckboxPrimitive.Root.Props & {
  indeterminate?: boolean;
};

function Checkbox({
  className,
  indeterminate = false,
  checked,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      disabled={disabled}
      className={cn(
        'peer flex size-5 shrink-0 items-center justify-center rounded-ds-sm border transition-colors duration-200',
        'border-ds-border-default bg-ds-plain text-ds-text-inverse',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-checked:bg-ds-primary data-checked:border-ds-border-primary',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        {indeterminate ? (
          <MinusIcon className="size-3.5" strokeWidth={3} />
        ) : (
          <CheckIcon className="size-3.5 text-white" strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
