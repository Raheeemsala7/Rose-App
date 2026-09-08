'use client';

import { useTranslations } from "next-intl";
import { useCart } from "../hooks/cart.hooks";
import Image from "next/image";
import CartEmpty from "./cart-empty";
import CartSkeleton from "./skeleton/cart-skeleton";
import { Button } from "@/src/shared/components/ui/button";
import { Loader2, Star, Trash2 } from "lucide-react";
import { useGuestCartStore } from "../store/cart.store";
import { id } from "zod/v4/locales";
import CartFooter from "./cart-footer";
import { useRemoveItemCart } from "../hooks/add-cart.hook";
import { useState } from "react";
import { cn } from "@/src/shared/lib/utils";
import { toast } from "sonner";


export default function CartBody() {
  // Translations
  const t = useTranslations('cart-list');

  // State
  const [removingId, setRemovingId] = useState<string | null>(null);


  // Cart Hook
  const {
    isEmpty,
    // refreshCart,
    products,
    isLoading,
    isAuthenticated,

  } = useCart();

  // Cart Store
  const removeGuestItem = useGuestCartStore(state => state.removeItem)


  // Delete Hook
  const { mutateAsync, isPending } = useRemoveItemCart();

  // Remove Cart Item Function
  async function removeItem(productId?: string) {
    if (!productId) return;

    setRemovingId(productId)

    try {
      await mutateAsync(productId)
    } catch (error) {
      toast.error("فشل الحذف من السلة")
    } finally {
      setRemovingId(null)
    }
  }

  // Loading State
  if (isLoading) return <CartSkeleton />;

  // Cart Empty Condition
  if (isEmpty) return <CartEmpty />;

  console.log(products);


  return (
    <div className="cart-body relative flex flex-col gap-5 p-5 mt-6 border border-ds-border-muted rounded-lg h-150 overflow-y-auto">
      {/* Item */}
      {products?.map((product) => (
        <div key={product?.product.id} className="item pb-5 border-b border-ds-border-muted flex gap-4">
          {/* Image Box */}
          <div className="image w-29.25 h-35 rounded-lg overflow-hidden">
            <Image
              src={product?.product.cover}
              width={117}
              height={140}
              className="w-full h-full object-cover"
              alt="product-image"
            />
          </div>

          {/* Content */}
          <div className="content grow flex flex-col justify-between gap-2.5">
            {/* Details */}
            <div className="details flex items-center gap-1.5">
              <div className="left grow flex flex-col gap-1.5">
                {/* Title */}
                <h3 className="font-semibold text-xl text-ds-text-primary">{product?.product.title}</h3>

                {/* Item Rating */}
                <h4 className="flex items-center gap-1.5">
                  {/* Star Icon */}
                  <Star className="size-5 text-orange-500 fill-orange-500" />

                  {/* Rating Details */}
                  <p className="font-normal text-base text-black dark:text-white">
                    {t.rich('cart-rating', {
                      rating: Number(product?.product.rating.toFixed(1)),
                      bold: (chunks) => <span className="font-medium">{chunks}</span>,
                    })}
                  </p>

                  <span className="font-medium text-base text-blue-600">
                    ({t('cart-rating-count', { count: Number(product?.product.ratings) })})
                  </span>
                </h4>
              </div>

              {/* Remove Item Button */}
              <Button
                onClick={() => removeItem(product?.cartId ?? product.product.id)}
                variant={'destructive'}
                disabled={removingId === product.product.id}
                className={cn("flex items-center gap-1.5 cursor-pointer", removingId === product.product.id && "opacity-200")}
              >
                {removingId === product.product.id ? <>
                  <Loader2 className="animate-spin transition-all size-5" />
                  <Trash2 className="size-5" />
                  {t('cart-remove')}
                </> : <>
                  <Trash2 className="size-5" />
                  {t('cart-remove')}</>}
              </Button>
            </div>

            {/* Footer */}
            <CartFooter item={product} />
          </div>
        </div>
      ))}
    </div>
  );
}
