'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Link } from '@/src/i18n/navigation';
import { cn } from '@/src/shared/lib/utils';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/src/shared/components/ui/field';
import { Input } from '@/src/shared/components/ui/input';
import { Textarea } from '@/src/shared/components/ui/textarea';
import { Button } from '@/src/shared/components/ui/button';
import useAddReview from '../../../hooks/add-review';
import { FormReviewValue } from '../../../types/product';
import { formReviewSchema } from '../../../schema/form-review.schema';

export default function FormReview({ productId }: { productId: string }) {
  //   Translations
  const t = useTranslations('product.product-reviews.form-review-validation');

  // Navigation
  const router = useRouter();

  // State
  const [rating, setRating] = useState(0);

  // Get Session
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  //   Add Review Hook
  const { error, addProductReview, isPending } = useAddReview();

  //   Form
  const form = useForm<FormReviewValue>({
    resolver: zodResolver(formReviewSchema),
    defaultValues: {
      headline: '',
      content: '',
      rating: 0,
    },
  });

  //   Handle submit
  const onSubmit = (data: FormReviewValue) => {
    if (rating === 0) {
      return;
    }

    const reviewData = {
      ...data,
      productId: productId,
      rating,
    };

    addProductReview(reviewData, {
      onSuccess: () => {
        toast.success('Review added successfully');
        form.reset();
        setRating(0);
        router.refresh();
      },
    });
  };

  return (
    <div className="form-review relative w-full lg:w-2/5 flex flex-col gap-2.75 pt-5 lg:pt-0 border-t lg:border-t-0 lg:p-5 lg:border-s border-ds-border-muted dark:border-ds-border-subtle rounded-xl overflow-hidden">
      {/* Overlay Form when not Authenticated */}
      {!isAuthenticated && (
        <div className="absolute w-full h-full flex items-center justify-center top-0 bottom-0 inset-s-0 inset-e-0 bg-white/20 backdrop-blur-[2px] z-20">
          <Link
            href={'/login'}
            className="font-semibold text-base text-ds-text-plain px-4 py-3.5 rounded-lg"
          >
            {t('form-login-link')}
          </Link>
        </div>
      )}

      {/* Rating */}
      <div className="flex flex-col gap-1 py-2.5">
        <div className="flex items-center gap-2.5 font-medium text-base text-ds-text-plain">
          {t('form-rating')}
          <span className="review-rating flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                onClick={() => {
                  setRating(i + 1);
                  form.setValue('rating', i + 1);
                  form.clearErrors('rating');
                }}
                className={cn(
                  'size-5 cursor-pointer',
                  i < rating ? 'text-orange-500 fill-orange-500' : 'text-orange-500'
                )}
              />
            ))}
          </span>
        </div>

        {/* Rating Error */}
        {form.formState.errors.rating && (
          <p className="text-ds-text-danger text-sm">
            {t(form.formState.errors.rating.message as never)}
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-2.75">
          {/* Review Input */}
          <Controller
            name="headline"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {/* Label */}
                <FieldLabel>{t('form-title')}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder={t('form-title-placeholder')}
                  autoComplete="off"
                />

                {/* Error Message */}
                {fieldState.invalid && (
                  <FieldError errors={[{ message: t(fieldState.error?.message as never) }]} />
                )}
              </Field>
            )}
          />

          {/* Review Textarea */}
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {/* Label */}
                <FieldLabel>{t('form-review')}</FieldLabel>
                <Textarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder={t('form-review-placeholder')}
                />

                {/* Error Message */}
                {fieldState.invalid && (
                  <FieldError errors={[{ message: t(fieldState.error?.message as never) }]} />
                )}
              </Field>
            )}
          />

          {/* Api Error Message */}
          {error && <p className="text-ds-text-danger text-sm">{error.message}</p>}

          {/* Button */}
          <Button
            // isLoading={isPending}
            type="submit" className={`cursor-pointer`}>
            {t('form-button')}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
