'use client';

import { useTranslations } from "next-intl";
import { useCart } from "../hooks/cart.hooks";
import Image from "next/image";
import CartEmpty from "./cart-empty";
import CartSkeleton from "./skeleton/cart-skeleton";
import { Button } from "@/src/shared/components/ui/button";
import { Star, Trash2 } from "lucide-react";
import { useGuestCartStore } from "../store/cart.store";
import { id } from "zod/v4/locales";


export default function CartBody() {
  // Translations
  const t = useTranslations('cart-list');

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
  // const { isPending, deleteUserCart } = useDeleteCartItem();

  // Remove Cart Item Function
  async function removeItem(productId?: string) {
    if (!productId) return;

    if (!isAuthenticated) {
      removeGuestItem(productId)
      return
    }

    // Authenticated
    // const cartItem = userData?.find((item) => item.productId === productId);
    // if (!cartItem) return;

    // deleteUserCart(cartItem!.id, {
    //   onSuccess: () => {
    //     refreshCart();
    //   },
    // });
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
                onClick={() => removeItem(product?.product.id)}
                variant={'destructive'}
                disabled={isLoading}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="size-5" />
                {t('cart-remove')}
              </Button>
            </div>

            {/* Footer */}
            {/* <CartFooter product={product} /> */}
          </div>
        </div>
      ))}
    </div>
  );
}
