'use client';

import { useId, useState, type ComponentProps } from 'react';

import { Eye, EyeOff, Search } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';

interface InputFieldProps extends Omit<
  ComponentProps<'input'>,
  'aria-invalid'
> {
  label: string;
  isError?: boolean;
  hasSearch?: boolean;
}

export default function InputField({
  id,
  label,
  className,
  onChange,
  placeholder,
  disabled = false,
  isError = false,
  type = 'text',
  hasSearch = false,
  required = true,
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputId = id ?? generatedId;
  const isPassword = type === 'password';
  const inputType = isPassword && isPasswordVisible ? 'text' : type;
  const PasswordIcon = isPasswordVisible ? EyeOff : Eye;
  const passwordToggleLabel = isPasswordVisible
    ? 'Hide password'
    : 'Show password';

    console.log(type , isError)

  return (
    <div className="flex flex-col justify-start gap-y-1.5">
      <Label htmlFor={inputId} className={cn(`${isError && '!text-red-600 dark:!text-red-500' }` , "text-zinc-800 dark:text-zinc-50")}>
        {label}
      </Label>
      <div className="relative">
        {hasSearch && (
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
            aria-hidden="true"
          />
        )}

        <Input
          className={cn(hasSearch && 'pl-8', isPassword && 'ltr:pr-10 rtl:pl-10', className)}
          id={inputId}
          placeholder={placeholder}
          // required={required}
          disabled={disabled}
          aria-invalid={isError}
          type={inputType}
          onChange={onChange}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-1 rtl:left-1 rtl:right-auto top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            aria-label={passwordToggleLabel}
            aria-pressed={isPasswordVisible}
            title={passwordToggleLabel}
            disabled={disabled}
          >
            <PasswordIcon size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
