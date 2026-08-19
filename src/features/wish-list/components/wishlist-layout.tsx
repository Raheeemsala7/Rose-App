
import { Heart } from 'lucide-react';
import { EmptyWishlist } from './empty-wishlist';
import { ContinueShoppingButton } from './continue-shopping-button';

interface WishlistLayoutProps {
  title: string;
  itemsCountLabel: string;
  count: number;
  clearAction: React.ReactNode;
  children: React.ReactNode;
}

export function WishlistLayout({
  title,
  itemsCountLabel,
  count,
  clearAction,
  children,
}: WishlistLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="size-6" />
          <h1 className="text-2xl font-bold text-ds-text-default">{title}</h1>
          <span className="text-sm text-ds-text-muted">{itemsCountLabel}</span>
        </div>
        {clearAction}
      </div>

      {count === 0 ? (<EmptyWishlist />) :(
        <>
        <div className="mt-6 flex flex-col">{children}</div>
        <ContinueShoppingButton/>
        </>
      ) }
    </div>
  );
}