'use client';

import * as React from 'react';
import { Field } from '@base-ui/react/field';

import { cn } from '../../lib/utils';

function Label({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Field.Label>, 'className'> & {
  className?: string;
}) {
  return (
    <Field.Root render={<div className="contents" />}>
      <Field.Label
        data-slot="label"
        className={cn(
          'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          className
        )}
        {...props}
      />
    </Field.Root>
  );
}

export { Label };
