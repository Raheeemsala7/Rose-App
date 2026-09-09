'use client';
import { IAddress } from '../types/address';
import { cn } from '@/src/shared/lib/utils';
import { Phone } from 'lucide-react';

interface AddressCardProps {
  address: IAddress;
  isSelected?: boolean;
  onSelect?: (address: IAddress) => void;
}

export function AddressCard({ address, isSelected = false, onSelect }: AddressCardProps) {
  return (
    <div
      onClick={() => onSelect?.(address)}
      className={cn(
        'relative py-3.5 px-4 rounded-2xl cursor-pointer border-2 border-ds-border-soft',
        isSelected ? 'bg-ds-bg-primary' : 'border-ds-border-subtle bg-ds-bg-plain'
      )}
    >
      {/* Display address information */}
      <div className="flex items-center justify-between">
        {/* Address title */}
        <h3
          className={cn(
            'font-semibold text-2xl text-ds-text-plain',
            isSelected && 'text-ds-text-inverse'
          )}
        >
          {address.city}
        </h3>

        {/* Phone number */}
        <p
          className={cn(
            'flex items-center gap-2',
            isSelected ? 'text-zinc-50' : 'text-ds-text-muted'
          )}
        >
          <span
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              isSelected ? 'bg-white text-ds-text-primary' : 'bg-ds-bg-primary text-ds-text-inverse'
            )}
          >
            <Phone className="w-5 h-5" />
          </span>
          <span dir="ltr">{address.phone}</span>
        </p>
      </div>

      {/* Address details */}
      <p
        className={cn(
          'text-ds-text-plain font-medium text-base bg-ds-bg-muted w-fit px-4 py-1 rounded-full mt-3',
          isSelected && 'bg-ds-bg-inverse text-ds-text-inverse'
        )}
      >
        {address.street}, {address.city}
      </p>
    </div>
  );
}
