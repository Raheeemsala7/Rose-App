'use client';

import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Loader2, MapPin } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/src/shared/components/ui/dialog';
import { Button } from '@/src/shared/components/ui/button';
import { Input } from '@/src/shared/components/ui/input';
import { useCreateAddress } from '../hooks/address.hook';

// Lazy-load Leaflet — uses browser APIs unavailable during SSR
const MapPicker = dynamic(() => import('./map-picker'), {
    ssr: false,
    loading: () => (
        <div className="flex h-56 w-full items-center justify-center rounded-xl border border-ds-border-muted bg-ds-muted text-sm text-ds-text-muted">
            <Loader2 className="size-4 animate-spin me-2" />
            Loading map…
        </div>
    ),
});

const schema = z.object({
    title: z.string().min(2),
    city: z.string().min(2),
    street: z.string().min(5),
    phone: z.string().min(7),
    isPrimary: z.boolean().default(false),
    latitude: z.number(),
    longitude: z.number(),
});

type FormValues = z.infer<typeof schema>;

const DEFAULT_LAT = 30.0444; // Cairo
const DEFAULT_LNG = 31.2357;
const DEFAULT_VALUES: FormValues = {
    title: '', city: '', street: '', phone: '',
    isPrimary: false, latitude: DEFAULT_LAT, longitude: DEFAULT_LNG,
};

interface AddressFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreated: () => void;
}

export function AddressFormModal({ open, onOpenChange, onCreated }: AddressFormModalProps) {
    const t = useTranslations('address.form');
    const locale = useLocale();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    const { mutate: createAddress, isPending } = useCreateAddress();

    const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } =
        useForm(
            { resolver: zodResolver(schema), defaultValues: DEFAULT_VALUES }
        );

    const lat = watch('latitude');
    const lng = watch('longitude');

    function onSubmit(values: FormValues) {
        createAddress(values, {
            onSuccess: () => {
                reset(DEFAULT_VALUES);
                onOpenChange(false);
                onCreated();
            },
        });
    }

    function handleClose() {
        reset(DEFAULT_VALUES);
        onOpenChange(false);
    }

    const submitHandler = handleSubmit(onSubmit);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                dir={dir}
                className="bg-ds-subtle border border-ds-border-muted text-ds-text-plain sm:max-w-xl max-h-[90vh] overflow-y-auto"
            >
                <DialogHeader className={dir === 'rtl' ? 'items-end text-right' : 'items-start text-left'}>
                    <DialogTitle className="text-lg font-bold text-ds-text-plain">
                        {t('title')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <Field label={t('labelField')} error={errors.title?.message}>
                        <Input {...register('title')} placeholder={t('labelPlaceholder')} aria-invalid={!!errors.title} />
                    </Field>

                    <Field label={t('city')} error={errors.city?.message}>
                        <Input {...register('city')} placeholder={t('cityPlaceholder')} aria-invalid={!!errors.city} />
                    </Field>

                    <Field label={t('street')} error={errors.street?.message}>
                        <Input {...register('street')} placeholder={t('streetPlaceholder')} aria-invalid={!!errors.street} />
                    </Field>

                    <Field label={t('phone')} error={errors.phone?.message}>
                        <Input {...register('phone')} placeholder={t('phonePlaceholder')} inputMode="tel" dir="ltr" aria-invalid={!!errors.phone} />
                    </Field>

                    {/* isPrimary checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" {...register('isPrimary')} className="size-4 accent-ds-primary" />
                        <span className="text-sm text-ds-text-default">{t('setPrimary')}</span>
                    </label>

                    {/* Map picker */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-1.5 text-sm font-medium text-ds-text-default">
                            <MapPin className="size-4" />
                            {t('location')}
                        </label>
                        <p className="text-xs text-ds-text-muted">{t('locationHint')}</p>

                        <Controller
                            control={control}
                            name="latitude"
                            render={() => (
                                <MapPicker
                                    lat={lat}
                                    lng={lng}
                                    onChange={(newLat, newLng) => {
                                        setValue('latitude', newLat, { shouldValidate: true });
                                        setValue('longitude', newLng, { shouldValidate: true });
                                    }}
                                />
                            )}
                        />
                        <p className="text-xs text-ds-text-muted" dir="ltr">
                            {lat.toFixed(5)}, {lng.toFixed(5)}
                        </p>
                    </div>

                    <DialogFooter className={`gap-2 ${dir === 'rtl' ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                        <Button type="button" variant="outline" disabled={isPending} onClick={handleClose}>
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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-ds-text-default">{label}</label>
            {children}
            {error && <p className="text-xs text-ds-text-danger">{error}</p>}
        </div>
    );
}
