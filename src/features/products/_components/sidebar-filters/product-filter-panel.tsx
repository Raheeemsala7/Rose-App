import { CategoriesFilterSection } from './categories-filter-section';
import { OccasionFilterSection } from './occasion-filter-section';
import FilterRating from './filter-rating';
import FilterPrice from './filter-price';
import ResetAllFilters from './reset-filters';

interface ProductFilterPanelProps {
  categoryId?: string;
  occasionId?: string;
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
}

export default function ProductFilterPanel({
  categoryId = '',
  occasionId = '',
  minRating = 0,
  minPrice,
  maxPrice,
}: ProductFilterPanelProps) {
  return (
    <div className="space-y-6">
      <CategoriesFilterSection categoryId={categoryId} />
      <div className="h-px bg-cream-300 dark:bg-burgundy-800" />
      <OccasionFilterSection occasionId={occasionId} />
      <div className="h-px bg-cream-300 dark:bg-burgundy-800" />
      <FilterRating minRating={minRating} />
      <div className="h-px bg-cream-300 dark:bg-burgundy-800" />
      <FilterPrice minPrice={minPrice} maxPrice={maxPrice} />
      <ResetAllFilters />
    </div>
  );
}
