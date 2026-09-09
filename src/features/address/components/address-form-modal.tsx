'use client';

import { useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/src/shared/components/ui/dialog';
import { Button } from '@/src/shared/components/ui/button';
import { Input } from '@/src/shared/components/ui/input';
import { createAddressAction } from '../actions/address.action';

// Mirror the server schema on the client so RHF can validate before submitting
const schema = z.object({
    title: z.string().min(2),
    city: z.string().min(2),
    street: z.string().min(5),
    phone: z.string().min(7),
});

type FormValues = z.infer<typeof schema>;

interface AddressFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Called after the address is successfully created */
    onCreated: () => void;
}

export function AddressFormModal({ open, onOpenChange, onCreated }: AddressFormModalProps) {
    const t = useTranslations('address.form');
    const locale = useLocale();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    function onSubmit(values: FormValues) {
        startTransition(async () => {
            try {
                await createAddressAction(values);
                toast.success(t('success'));
                reset();
                onOpenChange(false);
                onCreated();
            } catch (err) {
                toast.error(err instanceof Error ? err.message : t('error'));
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                dir={dir}
                className="bg-ds-subtle border border-ds-border-muted text-ds-text-plain sm:max-w-lg"
            >
                <DialogHeader className={dir === 'rtl' ? 'items-end text-right' : 'items-start text-left'}>
                    <DialogTitle className="text-lg font-bold text-ds-text-plain">
                        {t('title')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Title */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-ds-text-default">
                            {t('labelField')}
                        </label>
                        <Input
                            {...register('title')}
                            placeholder={t('labelPlaceholder')}
                            aria-invalid={!!errors.title}
                        />
                        {errors.title && (
                            <p className="text-xs text-ds-text-danger">{errors.title.message}</p>
                        )}
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-ds-text-default">
                            {t('city')}
                        </label>
                        <Input
                            {...register('city')}
                            placeholder={t('cityPlaceholder')}
                            aria-invalid={!!errors.city}
                        />
                        {errors.city && (
                            <p className="text-xs text-ds-text-danger">{errors.city.message}</p>
                        )}
                    </div>

                    {/* Street */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-ds-text-default">
                            {t('street')}
                        </label>
                        <Input
                            {...register('street')}
                            placeholder={t('streetPlaceholder')}
                            aria-invalid={!!errors.street}
                        />
                        {errors.street && (
                            <p className="text-xs text-ds-text-danger">{errors.street.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-ds-text-default">
                            {t('phone')}
                        </label>
                        <Input
                            {...register('phone')}
                            placeholder={t('phonePlaceholder')}
                            inputMode="tel"
                            dir="ltr"
                            aria-invalid={!!errors.phone}
                        />
                        {errors.phone && (
                            <p className="text-xs text-ds-text-danger">{errors.phone.message}</p>
                        )}
                    </div>

                    <DialogFooter className={`gap-2 ${dir === 'rtl' ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => { reset(); onOpenChange(false); }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="size-4 animate-spin me-2" />}
                            {t('submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
