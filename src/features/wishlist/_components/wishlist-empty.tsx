import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/components/ui/button';

export default function WishlistEmpty() {
    const t = useTranslations('wishlist');

    return (
        <div className="flex h-80 w-full flex-col items-center justify-center gap-4 rounded-2xl border border-ds-border-muted bg-ds-subtle p-8 text-center">
            <Heart className="size-16 text-ds-text-muted" strokeWidth={1.2} />
            <p className="text-lg font-medium text-ds-text-muted">{t('empty')}</p>
            <Link href="/products">
                <Button variant="outline">{t('browse')}</Button>
            </Link>
        </div>
    );
}
