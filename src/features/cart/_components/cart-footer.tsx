import { useLocale, useTranslations } from "next-intl";
import { useCart } from "../hooks/cart.hooks";
import { formatLocaleNumber } from "@/src/shared/lib/utils/format-number";
import { Button } from "@/src/shared/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/src/shared/components/ui/input";
import { CartItem } from "../types/cart";
import { useGuestCartStore } from "../store/cart.store";
import { useupdateItemCart } from "../hooks/add-cart.hook";
import { toast } from "sonner";


export default function CartFooter({ item }: { item: CartItem }) {

  const { product, quantity } = item;
  // Translations
  const t = useTranslations('cart-list');

  const locale = useLocale();


  // Get Item Quantity — read live from Zustand for guest, from query for auth
  const guestItems = useGuestCartStore((state) => state.items);
  const { isAuthenticated, products } = useCart();

  const quantityCount = isAuthenticated
    ? products?.find((item) => item.product.id === product.id)?.quantity ?? quantity
    : guestItems.find((item) => item.productId === product.id)?.quantity ?? quantity;

  // Update User Cart Item
  const { isPending, mutateAsync } = useupdateItemCart();

  // Stock Quanity Condition
  const isMaxStock = quantityCount >= product.stock;


  // Quanitity Change
  async function quantityChange(num: number) {
    if (num < 0 && quantityCount === 1) return
    if (num > 0 && isMaxStock) return

    const newQuantity = quantityCount + num;

    try {
      await mutateAsync({ cartItem: item.cartId ?? item.product.id, quantity: newQuantity })
    } catch (error) {
      toast.error("فشل التحديث")
    }
  }


  return (
    <div className="footer flex justify-between">
      {/* Price */}
      <div className="price flex h-fit mt-auto gap-1">
        <span className="font-medium h-fit mt-auto text-sm text-ds-text-primary">
          {t('cart-item-quantity', { quantity: quantityCount })}
        </span>
        <h5 className="font-bold h-fit mt-auto text-2xl text-ds-text-plain">
          {formatLocaleNumber(Number(product.price) * quantityCount, locale)}
        </h5>
        <span className="font-medium h-fit mt-auto text-base text-ds-text-plain">
          {t('cart-currency')}
        </span>
      </div>

      {/* Quantity */}
      <div className="quantity flex items-center gap-2 h-12.25">
        {/* Decrease Button */}
        <Button
          onClick={() => quantityChange(-1)}
          variant={'secondary'}
          disabled={quantityCount <= 1 || isPending}
          className="minus w-12.25 h-full cursor-pointer"
        >
          <Minus className="size-5" />
        </Button>

        {/* Quantity Input */}
        <Input
          value={quantityCount}
          readOnly
          type="text"
          inputMode="numeric"
          className="w-25.75 h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Increase Button */}
        <Button
          onClick={() => quantityChange(1)}
          variant={'secondary'}
          disabled={isMaxStock || isPending}
          className="plus w-12.25 h-full cursor-pointer"
        >
          <Plus className="size-5" />
        </Button>
      </div>
    </div>
  );
}
