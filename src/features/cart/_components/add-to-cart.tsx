'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/src/shared/components/ui/button';
import { useCart } from '../hooks/cart.hooks';

interface AddToCartProps {
  variant?: 'card' | 'details';
  productId: string;
  stock?: number;
}

export default function AddToCart({
  variant = 'card',
  productId,
  stock = 1,
}: AddToCartProps) {
  const { addItem, isLoading } = useCart();

  const [isAdded, setIsAdded] = useState(false);

  const isOut = stock === 0;

  const handleAddToCart = async () => {
    if (isOut || isLoading || isAdded) return;

    try {
      await addItem(productId, 1);

      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch {
      // هنا بعدين ممكن نعرض toast/error
    }
  };

  if (variant === 'details') {
    return (
      <Button
        type="button"
        disabled={isOut || isLoading}
        onClick={handleAddToCart}
        className="flex-1 h-11 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 dark:bg-burgundy-700 dark:hover:bg-burgundy-600 text-cream-50 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAdded ? (
          <>
            <Check size={18} className="me-2" />
            Added
          </>
        ) : (
          <>
            <ShoppingCart size={18} className="me-2" />
            {isOut ? 'Out of Stock' : 'Add to Cart'}
          </>
        )}
      </Button>
    );
  }

  return (
    <button
      type="button"
      disabled={isOut || isLoading}
      onClick={handleAddToCart}
      aria-label={isAdded ? 'Added to cart' : 'Add to cart'}
      className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 cursor-pointer flex-shrink-0
        ${
          isOut
            ? 'bg-cream-200 dark:bg-burgundy-800 text-burgundy-300 cursor-not-allowed'
            : isAdded
              ? 'bg-green-600 text-white'
              : 'bg-burgundy-800 dark:bg-blush-600 text-cream-50 hover:bg-burgundy-700 dark:hover:bg-blush-500'
        }`}
    >
      {isAdded ? (
        <Check
          size={17}
          className="animate-in zoom-in-50 duration-200"
        />
      ) : (
        <ShoppingCart size={16} />
      )}
    </button>
  );
}