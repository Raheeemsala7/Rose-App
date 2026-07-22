export type SortBy = 'title' | 'price' | 'rating' | 'createdAt' | 'bestSelling' | 'mostPopular';
export type SortOrder = 'asc' | 'desc';

export const SORT_BY_OPTIONS: SortBy[] = [
  'title',
  'price',
  'rating',
  'createdAt',
  'bestSelling',
  'mostPopular',
];
export const SORT_ORDER_OPTIONS: SortOrder[] = ['asc', 'desc'];