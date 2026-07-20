'use client';

import { usePathname, useRouter } from '@/src/i18n/navigation';
import { useLocale } from 'next-intl';

import { ReactNode } from 'react';
import { Button } from './ui/button';

export default function LanguageSwitcher({
  children,
}: {
  children: ReactNode;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';

    router.replace(pathname, {
      locale: nextLocale,
    });
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleLocale}
      className="border-s border-zinc-200 dark:border-zinc-700 rounded-none hover:bg-transparent"
    >
      {children}
    </Button>
  );
}
