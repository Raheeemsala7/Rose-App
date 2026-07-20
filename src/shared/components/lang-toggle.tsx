'use client';

import { Link, usePathname } from '@/src/i18n/navigation';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function LangToggle() {
  const pathName = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const href = queryString ? `${pathName}?${queryString}` : pathName;

  const language = locale === 'ar' ? 'English' : 'العربية';

  return (
    <div className="flex justify-end">
      <Link
        href={href}
        locale={locale === 'ar' ? 'en' : 'ar'}
        prefetch={false}
        className={
          locale === 'en' ? 'font-[family-name:var(--font-tajawal)] ' : ''
        }
      >
        {language}
      </Link>
    </div>
  );
}
