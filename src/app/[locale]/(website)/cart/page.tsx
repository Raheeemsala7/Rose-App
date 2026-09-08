import CartBody from "@/src/features/cart/_components/cart-body";
import CartButtonClear from "@/src/features/cart/_components/cart-button-clear";
import CartQuantities from "@/src/features/cart/_components/cart-quantities";
import CartTotalPrise from "@/src/features/cart/_components/cart-total-prise";
import { Link } from "@/src/i18n/navigation";
import { Button } from "@/src/shared/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CartPage() {

  // Translations
  const t = useTranslations('cart-list');

  return (
    <>
      {/* Cart Head */}
      <div className="cart-head flex items-center justify-between  ">
        <h1 className="font-bold text-5xl text-ds-text-plain ">
          {t('cart-title')}

          {/* Cart Quantities */}
          <CartQuantities />
        </h1>

        {/* Clear Button */}
        <CartButtonClear />
      </div>

      {/* Cart Total Prise */}
      <CartTotalPrise />

      {/* Cart Body */}
      <CartBody />

      {/* Continue Shoping Button */}
      <Link href={'/products'}>
        <Button className="w-53.25 flex items-center gap-2.5 cursor-pointer mt-6">
          <MoveLeft className="size-5 rtl:rotate-180" /> {t('cart-button')}
        </Button>
      </Link>
    </>
  );
}
