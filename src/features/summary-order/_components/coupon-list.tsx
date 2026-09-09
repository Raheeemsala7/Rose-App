import { Badge } from '@/src/shared/components/ui/badge';
import { X } from 'lucide-react';
import { ICoupon } from '../types/copons';
import { useTranslations } from 'next-intl';

interface CouponListProps {
    coupons: ICoupon[];
    onRemove?: (id: string) => void;
}

export function CouponList({ coupons, onRemove }: CouponListProps) {
    const t = useTranslations('order-summary');

    if (coupons.length === 0) {
        return (
            <p className="flex w-full items-center justify-center rounded-md border border-ds-border-muted py-4 text-center text-sm text-ds-text-muted">
                {t('no-coupon')}
            </p>
        );
    }

    return (
        <ul className="space-y-2">
            {coupons.map((coupon) => (
                <li key={coupon.id}>
                    <Badge className="flex w-full items-center justify-between gap-2 px-4 py-2">
                        <span className="truncate font-medium">{coupon.code}</span>
                        <button
                            type="button"
                            aria-label="Remove coupon"
                            onClick={() => onRemove?.(coupon.id)}
                            className="shrink-0 rounded-full p-0.5 hover:bg-white/20 transition-colors"
                        >
                            <X className="size-4 cursor-pointer" />
                        </button>
                    </Badge>
                </li>
            ))}
        </ul>
    );
}
