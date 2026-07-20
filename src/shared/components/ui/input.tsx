import * as React from 'react';

import { cn } from '../../lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-12 w-full min-w-0 rounded-md border-[1.5px] border-ds-border-default bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-ds-border-primary-fade focus:border-ds-border-primary focus-visible:border-ds-border-primary focus-visible:shadow-[var(--shadow-ds-subtle-sm)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-0 disabled:bg-ds-muted disabled:opacity-50 aria-invalid:border-danger aria-invalid:border-ds-border-danger aria-invalid:ring-danger/20 md:text-sm',
        className
      )}
      {...props}
    />
  );
}

export { Input };
