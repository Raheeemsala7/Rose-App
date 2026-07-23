'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { cn } from '../../lib/utils';


function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger> & {
  asChild?: boolean;
}) {
  const render = asChild
    ? (React.Children.only(children) as React.ReactElement)
    : undefined;

  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      render={render}
      {...props}
    >
      {asChild ? undefined : children}
    </PopoverPrimitive.Trigger>
  );
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  side,
  ...props
}: Omit<React.ComponentProps<typeof PopoverPrimitive.Popup>, 'className'> &
  Pick<
    React.ComponentProps<typeof PopoverPrimitive.Positioner>,
    'align' | 'side' | 'sideOffset'
  > & {
    className?: string;
  }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            'flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-md bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({ ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="popover-anchor" {...props} />;
}

function PopoverClose({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close> & {
  asChild?: boolean;
}) {
  const render = asChild
    ? (React.Children.only(children) as React.ReactElement)
    : undefined;

  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      render={render}
      {...props}
    >
      {asChild ? undefined : children}
    </PopoverPrimitive.Close>
  );
}

function PopoverTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PopoverPrimitive.Title>, 'className'> & {
  className?: string;
}) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      render={<div />}
      className={cn('font-medium', className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverPrimitive.Description>,
  'className'
> & {
  className?: string;
}) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-header"
      className={cn('flex flex-col gap-1 text-sm', className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
