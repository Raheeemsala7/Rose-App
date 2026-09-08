import { Link } from '@/src/i18n/navigation';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/cart.hooks';



export function CartButton() {

  const { products } = useCart()

  const count = products?.length || 0

  console.log(count);
  
  return (
    <Link href={'/cart'} className='relative'>
      {/* <button className="relative text-ds-text-default cursor-pointer"> */}
        <ShoppingCart className="size-5   text-burgundy-700 dark:text-blush-200" />
        {count > 0 && (
          <span className="absolute -end-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ds-announce text-[10px] font-semibold text-white opacity-100">
            {count}
          </span>
        )}
      {/* </button> */}
    </Link>
  );
}
