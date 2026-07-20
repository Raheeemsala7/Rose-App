import type { Metadata } from 'next';
import { Sarabun, Tajawal } from 'next/font/google';
import { hasLocale, Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Providers } from '@/src/shared/context/providers';
import { routing } from '@/src/i18n/routing';
import localFont from 'next/font/local';

const sarabun = Sarabun({
  variable: '--font-sarabun',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  display: 'swap',
});
const edwardian = localFont({
  src: [
    {
      path: '../../../public/fonts/Edwardian.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-edwardian',
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: LocaleLayoutProps['params'];
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return {
    title: t('app-title'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const fontClass = locale === 'ar' ? tajawal.variable : sarabun.variable;

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={`${sarabun.variable} ${tajawal.variable}  ${edwardian.variable} ${fontClass}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-ds-sans">
        <Providers locale={locale}>
          {children}
          </Providers>
      </body>
    </html>
  );
}
