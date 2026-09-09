import { Badge } from '@/src/shared/components/ui/badge';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCouponStore } from '../store/coupon.store';

interface CouponListProps {
    onRemove?: (id: string) => void;
}

export function CouponList({ onRemove }: CouponListProps) {
    const t = useTranslations('order-summary');
    const coupon = useCouponStore((state) => state.coupon);

    if (!coupon) {
        return (
            <p className="flex w-full items-center justify-center rounded-md border border-ds-border-muted py-4 text-center text-sm text-ds-text-muted">
                {t('no-coupon')}
            </p>
        );
    }

    return (
        <ul className="space-y-2">
            <li>
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
        </ul>
    );
}
