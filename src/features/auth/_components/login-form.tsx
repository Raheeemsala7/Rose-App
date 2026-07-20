"use client"
import React from 'react'
import AuthSideImage from './auth-side-image'
import { Checkbox } from '@/src/shared/components/ui/checkbox'
import { Controller } from 'react-hook-form'
import InputField from '@/src/shared/components/shared/input-field'
import { FieldError } from '@/src/shared/components/ui/field'
import { useLogin } from '../hooks/auth-login'
import { Link } from '@/src/i18n/navigation'
import { Button } from '@/src/shared/components/ui/button'

const LoginForm = () => {
  const { handleSubmit, control, errors, isSubmitting, onSubmit, t, tButton } =
    useLogin();
  return (
    <div>
        <AuthSideImage />

        <div className="flex justify-center flex-col m-20 gap-3">
      <div>
        <form
          className="flex flex-col gap-5 "
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.root && (
            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md text-center">
              {errors.root.message}
            </div>
          )}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <InputField
                  {...field}
                  type="text"
                  label={t('email')}
                  placeholder={t('email')}
                  isError={fieldState.invalid}
                  
                  id="input-field-email"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
              </div>
            )}
          />
          <div>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <InputField
                    {...field}
                    type="password"
                    label={t('password')}
                    placeholder="********"
                    isError={fieldState.invalid}
                    
                    id="input-field-password"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-red-500" errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />

            <div className="flex items-center justify-between mt-2">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 cursor-pointer"
                    >
                      {t('rememberMe')}
                    </label>
                  </div>
                )}
              />
              <Link
                href="/forget-password"
                className="text-sm font-semibold text-red-800 hover:underline"
              >
                {t('forgotPassword')}
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer mt-10"
          >
            {isSubmitting ? tButton('loading') : t('login')}
          </Button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default LoginForm