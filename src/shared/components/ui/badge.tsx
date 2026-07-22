'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';


const badgeVariants = cva(
  'inline-flex h-6 items-center justify-center rounded-full border px-2.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-ds-primary-faint text-ds-text-primary border-ds-border-primary-faint',

        success:
          'bg-ds-success-faint text-ds-text-success border-ds-border-success-faint',

        warning:
          'bg-ds-warning-faint text-ds-text-warning border-ds-border-warning-faint',

        error:
          'bg-ds-danger-faint text-ds-text-danger border-ds-border-danger-faint',

        info: 'bg-ds-info-faint text-ds-text-info border-ds-border-info-faint',

        outline: 'bg-transparent text-ds-text-default border-ds-border-default',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',

    props: mergeProps<'span'>(
      {
        className: cn(
          badgeVariants({
            variant,
          }),
          className
        ),
      },
      props
    ),

    render,

    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
