import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-ds-base font-medium transition-colors focus-visible:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-ds-primary text-ds-text-inverse hover:bg-ds-primary-saturated',

        secondary: 'bg-ds-secondary text-ds-text-default hover:opacity-90',

        outline:
          'border border-ds-border-primary bg-transparent text-ds-border-primary hover:bg-ds-primary-fade',

        subtle:
          'bg-ds-muted border border-ds-border-soft text-ds-plain hover:bg-ds-soft',
        ghost: 'bg-transparent text-ds-text-default hover:bg-ds-soft',

        destructive:
          'bg-ds-danger text-ds-text-inverse hover:bg-ds-danger-saturated',
      },

      size: {
        default: 'h-10 px-4 gap-2',

        sm: 'h-9 px-3 gap-2',

        lg: 'h-11 px-6 gap-2',

        icon: 'size-10',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

type ButtonProps = Omit<
  React.ComponentProps<typeof BaseButton>,
  'className' | 'render'
> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    asChild?: boolean;

    loading?: boolean;

    leftIcon?: React.ReactNode;

    rightIcon?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,

  loading = false,

  leftIcon,
  rightIcon,

  children,

  disabled,

  ...props
}: ButtonProps) {
  const t = useTranslations('button');

  const render = asChild
    ? (React.Children.only(children) as React.ReactElement)
    : undefined;

  return (
    <BaseButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      render={render}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? undefined : (
        <>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin transition-all" />
              {t('loading')}
            </>
          ) : (
            <>
              {leftIcon}
              {children}
              {rightIcon}
            </>
          )}
        </>
      )}
    </BaseButton>
  );
}

export { Button, buttonVariants };
