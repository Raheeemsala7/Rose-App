'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/src/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/shared/components/ui/dialog';
import { useCart } from '../hooks/cart.hooks';
import { useGuestCartStore } from '../store/cart.store';
import { useRemoveAllCart } from '../hooks/add-cart.hook';

export default function CartButtonClear() {
  const t = useTranslations('cart-list');
  const locale = useLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const [open, setOpen] = useState(false);

  const {isEmpty} = useCart()

  const { mutate: clearCart, isPending } = useRemoveAllCart();

  if (isEmpty) return null;

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Trash2 className="size-4" />
        {t('cart-clear')}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          dir={dir}
          className="bg-ds-subtle border border-ds-border-muted text-ds-text-plain"
        >
          <DialogHeader className={dir === 'rtl' ? 'items-end text-right' : 'items-start text-left'}>
            <DialogTitle>{t('cart-clear')}</DialogTitle>
            <DialogDescription>{t('cart-clear-info')}</DialogDescription>
          </DialogHeader>

          <DialogFooter className={`gap-2 ${dir === 'rtl' ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              {t('cart-clear-cancle')}
            </Button>
            <Button
              variant="destructive"
              onClick={() => clearCart()}
              disabled={isPending}
            >
              {isPending ? t('cart-clearing') : t('cart-clear-confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
