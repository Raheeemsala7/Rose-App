"use client"
import { Checkbox } from '@/src/shared/components/ui/checkbox'
import { Controller } from 'react-hook-form'
import InputField from '@/src/shared/components/shared/input-field'
import { FieldError } from '@/src/shared/components/ui/field'
import { useLogin } from '../hooks/auth-login'
import { Link } from '@/src/i18n/navigation'
import { Button } from '@/src/shared/components/ui/button'
import { Separator } from '@/src/shared/components/ui/separator'
import SeparatorIcon from '@/public/icons/separator-icon'
import ThemeToggle from '@/src/shared/components/theme-toggle'

const LoginForm = () => {
  const { handleSubmit, control, errors, isSubmitting, onSubmit, t, tButton } =
    useLogin();
  return (
    <div>
      <ThemeToggle />
      <div className='flex justify-center items-center flex-col gap-6 mb-4'>
        <SeparatorIcon />
        <h3
          className={`font-[family-name:var(--font-edwardian)] text-5xl   text-ds-text-primary`}
        >
          Welcome back
        </h3>
      </div>

      <div className="flex justify-center flex-col max-w-sm mx-auto gap-3">
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
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <InputField
                    {...field}
                    type="text"
                    label={t('username')}
                    placeholder={t('username')}
                    isError={fieldState.invalid}
                      className='dark:text-zinc-50' 
                    id="input-field-email"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-600 dark:text-red-500"
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
                      className='dark:text-zinc-50'
                      id="input-field-password"
                    />
                    {fieldState.invalid && (
                      <FieldError  className="text-red-600 dark:text-red-500" errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />

              <div className="flex items-center justify-between mt-4">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={"border-maroon-700 rounded-lg "}
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-800 dark:text-zinc-50  cursor-pointer"
                      >
                        {t('rememberMe')}
                      </label>
                    </div>
                  )}
                />
                <Link
                  href="/forget-password"
                  className="text-sm font-semibold text-maroon-700 dark:text-soft-pink-300 hover:underline"
                >
                  {t('forgotPassword')}
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer mt-10 bg-maroon-600 text-white dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 dark:text-zinc-800 rounded-xl"
            >
              {isSubmitting ? tButton('loading') : t('login')}
            </Button>

            <Separator className='mt-3 bg-zinc-200 dark:bg-zinc-600' />

            <p className="text-center text-sm font-semibold text-zinc-800 dark:text-zinc-50">
              {t('noAccount')} <Link href="/register" className="text-maroon-700 dark:text-soft-pink-300 hover:underline">
                {t('createAccount')}
              </Link>
            </p>
          </form>
          <div className="flex justify-center mt-6">
            {/* <Image
              src={"/separator.png"}
              alt="Separator"
              width={280}
              height={40}
              className={`object-center object-cover rotate-180`}
            /> */}

            <SeparatorIcon rotate={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm