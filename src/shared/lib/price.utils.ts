export function formatPrice(value: number, currency: string = 'EGP'): string {
  return `${value.toFixed(2)} ${currency}`;
}

export function calculateOriginalPrice(
  currentPrice: number,
  discountType: 'PERCENT' | 'FIXED',
  discountValue: number
): number {
  if (discountType === 'PERCENT') {
    return currentPrice / (1 - discountValue / 100);
  }
  return currentPrice + discountValue;
}
