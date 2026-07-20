'use client';

import {
  useEffect,
  useId,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { ImageIcon, Upload } from 'lucide-react';

interface UploadFieldProps extends Omit<
  ComponentProps<'input'>,
  'aria-invalid' | 'type' | 'value'
> {
  label: string;
  isError?: boolean;
  uploadLabel?: string;
}

export default function UploadField({
  id,
  label,
  className,
  disabled = false,
  isError = false,
  uploadLabel = 'Upload file',
  required = true,
  onChange,
  ...props
}: UploadFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const reviewHref = selectedFileUrl || null;
  const reviewLabel = selectedFileUrl
    ? 'Review uploaded file'
    : 'Review current image(s)';

  useEffect(() => {
    return () => {
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl);
      }
    };
  }, [selectedFileUrl]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    setSelectedFileUrl(selectedFile ? URL.createObjectURL(selectedFile) : '');

    onChange?.(event);
  }

  return (
    <div className="flex flex-col justify-start gap-y-1.5">
      {/* input label */}
      <Label
        htmlFor={inputId}
        className={cn(
          disabled && 'text-muted-foreground',
          isError && 'text-ds-danger'
        )}
      >
        {label}
      </Label>

      <div className="relative">
        <Input
          id={inputId}
          className="peer sr-only"
          type="file"
          disabled={disabled}
          required={required}
          aria-invalid={isError}
          onChange={handleChange}
          {...props}
        />

        <div
          className={cn(
            'flex h-12 w-full min-w-0 items-center gap-4 rounded-lg border-[1.5px] border-ds-border-default bg-transparent px-7 py-1 text-base shadow-xs transition-[color,box-shadow] hover:border-ds-border-primary-fade peer-focus-visible:border-ds-border-primary peer-focus-visible:shadow-[var(--shadow-ds-subtle-sm)] md:text-sm',
            isError && 'border-danger ring-3 ring-danger/20',
            disabled &&
              'pointer-events-none cursor-not-allowed border-0 bg-ds-muted opacity-50',
            className
          )}
        >
          {/* review image link to open after entered */}
          {reviewHref && (
            <a
              href={reviewHref}
              target="_blank"
              rel="noreferrer"
              className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-sm text-ds-info hover:underline"
            >
              <ImageIcon className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{reviewLabel}</span>
            </a>
          )}

          {/* label & icon upload file */}
          <label
            htmlFor={inputId}
            className={cn(
              'ml-auto flex shrink-0 cursor-pointer items-center gap-3 text-sm font-medium text-ds-text-primary',
              disabled &&
                'pointer-events-none cursor-not-allowed text-muted-foreground'
            )}
          >
            <Upload className="size-4" aria-hidden="true" />
            <span>{uploadLabel}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
