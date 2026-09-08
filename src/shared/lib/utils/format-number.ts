export function formatLocaleNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    numberingSystem: locale === 'ar' ? 'arab' : 'latn',
  }).format(value);
}
