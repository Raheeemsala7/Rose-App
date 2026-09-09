import CartBody from '@/src/features/cart/_components/cart-body';
import CartButtonClear from '@/src/features/cart/_components/cart-button-clear';
import CartQuantities from '@/src/features/cart/_components/cart-quantities';
import CartTotalPrise from '@/src/features/cart/_components/cart-total-prise';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CartPage() {
    const t = useTranslations('cart-list');

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="flex flex-wrap items-baseline gap-2 text-3xl font-bold text-ds-text-plain sm:text-4xl lg:text-5xl">
                    {t('cart-title')}
                    <CartQuantities />
                </h1>
                <CartButtonClear />
            </div>

            {/* Subtotal row */}
            <CartTotalPrise />

            {/* Items list */}
            <CartBody />

            {/* Continue shopping */}
            <Link href="/products" className="mt-2 self-start">
                <Button className="flex items-center gap-2 cursor-pointer">
                    <MoveLeft className="size-4 rtl:rotate-180" />
                    {t('cart-button')}
                </Button>
            </Link>
        </div>
    );
}
