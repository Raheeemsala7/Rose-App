'use client';

import { Button } from '@/src/shared/components/ui/button';
import { Input } from '@/src/shared/components/ui/input';
import { TicketPercent } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface CouponFormProps {
  onApply: (code: string) => void;
  isPending?: boolean;
}

export function CouponForm({ onApply, isPending = false }: CouponFormProps) {
  const t = useTranslations('order-summary');

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    const code = couponCode.trim();

    if (!code) {
      toast.error(t('coupon-empty'));
      return;
    }

    onApply(code);
  };

  return (
    <div className="grid w-full grid-cols-[1fr_auto] gap-2">
      <Input
        className="w-full uppercase"
        placeholder={t('coupon-Placeholder')}
        value={couponCode}
        onChange={(event) => {
          setCouponCode(event.target.value.toUpperCase());
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleApplyCoupon();
          }
        }}
      />

      <Button
        type="button"
        disabled={isPending || !couponCode.trim()}
        onClick={handleApplyCoupon}
        className="flex h-full items-center justify-center gap-2"
      >
        <TicketPercent className="size-5" />

        {isPending ? t('loading') : t('apply-button')}
      </Button>
    </div>
  );
}
