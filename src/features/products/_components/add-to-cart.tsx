import { Button } from '@/src/shared/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function AddToCart() {
  return (
    <Button className="w-10.5 h-10.5 !px-0 rounded-full bg-ds-bg-primary text-ds-bg-subtle hover:bg-ds-bg-primary cursor-pointer flex items-center justify-center">
      <ShoppingCart className="w-6 h-6" />
    </Button>
  );
}
