'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { ReactNode } from 'react';

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
