import type { Metadata } from 'next';
import { Sarabun, Tajawal } from 'next/font/google';
import { hasLocale, Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Providers } from '@/src/shared/context/providers';
import { routing } from '@/src/i18n/routing';
import Header from '@/src/shared/components/header';

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
      className={`${sarabun.variable} ${tajawal.variable} ${fontClass}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-ds-sans">
        <Providers locale={locale}>
          <Header />
          {children}</Providers>
      </body>
    </html>
  );
}
