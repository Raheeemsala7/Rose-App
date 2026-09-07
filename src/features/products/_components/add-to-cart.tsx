import { Button } from '@/src/shared/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface AddToCartProps {
  variant?: 'card' | 'details';
  productId?: string;
  stock?: number;
}

export default function AddToCart({ variant = 'card', stock = 1 }: AddToCartProps) {
  const isOut = stock === 0;

  if (variant === 'details') {
    return (
      <Button
        disabled={isOut}
        className="flex-1 h-11 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 dark:bg-burgundy-700 dark:hover:bg-burgundy-600 text-cream-50 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingCart size={18} className="me-2" />
        {isOut ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    );
  }

  return (
    <button
      disabled={isOut}
      aria-label="Add to cart"
      className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors cursor-pointer flex-shrink-0
        ${isOut
          ? 'bg-cream-200 dark:bg-burgundy-800 text-burgundy-300 cursor-not-allowed'
          : 'bg-burgundy-800 dark:bg-blush-600 text-cream-50 hover:bg-burgundy-700 dark:hover:bg-blush-500'
        }`}
    >
      <ShoppingCart size={16} />
    </button>
  );
}
