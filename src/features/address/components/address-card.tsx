'use client';

import { IAddress } from '../types/address';
import { cn } from '@/src/shared/lib/utils';
import { Check, Phone } from 'lucide-react';

interface AddressCardProps {
    address: IAddress;
    isSelected?: boolean;
    onSelect?: (address: IAddress) => void;
}

export function AddressCard({ address, isSelected = false, onSelect }: AddressCardProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect?.(address)}
            className={cn(
                'relative w-full text-start rounded-2xl border-2 px-4 py-3.5 transition-all cursor-pointer',
                isSelected
                    ? 'border-ds-border-primary bg-ds-primary shadow-ds-soft-lg ring-2 ring-ds-border-primary-faint'
                    : 'border-ds-border-muted bg-ds-subtle hover:border-ds-border-primary hover:bg-ds-primary-fade'
            )}
        >
            {/* Selected checkmark badge */}
            {isSelected && (
                <span className="absolute top-3 end-3 flex size-6 items-center justify-center rounded-full bg-white">
                    <Check className="size-4 text-ds-text-primary" strokeWidth={3} />
                </span>
            )}

            <div className="flex items-start justify-between gap-3 pe-8">
                {/* Title + street */}
                <div className="flex flex-col gap-1 min-w-0">
                    <h3 className={cn(
                        'font-bold text-lg leading-tight truncate',
                        isSelected ? 'text-white' : 'text-ds-text-plain'
                    )}>
                        {address.title || address.city}
                    </h3>
                    <p className={cn(
                        'text-sm truncate',
                        isSelected ? 'text-white/80' : 'text-ds-text-muted'
                    )}>
                        {address.street}, {address.city}
                    </p>
                </div>

                {/* Phone */}
                <div className={cn(
                    'flex items-center gap-1.5 shrink-0 text-sm',
                    isSelected ? 'text-white/90' : 'text-ds-text-default'
                )}>
                    <span className={cn(
                        'flex size-7 items-center justify-center rounded-full',
                        isSelected ? 'bg-white/20' : 'bg-ds-primary-faint'
                    )}>
                        <Phone className={cn('size-4', isSelected ? 'text-white' : 'text-ds-text-primary')} />
                    </span>
                    <span dir="ltr">{address.phone}</span>
                </div>
            </div>

            {/* Primary badge */}
            {address.isPrimary && (
                <span className={cn(
                    'mt-2 inline-block text-xs font-semibold px-3 py-0.5 rounded-full',
                    isSelected ? 'bg-white/20 text-white' : 'bg-ds-primary-faint text-ds-text-primary'
                )}>
                    ★ Primary
                </span>
            )}
        </button>
    );
}
