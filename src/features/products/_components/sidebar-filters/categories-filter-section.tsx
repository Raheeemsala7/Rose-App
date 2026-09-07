import { getCategoriesApi } from '../../../categories/apis/categories.api';
import { FilterCategory } from './filter-category';

export async function CategoriesFilterSection({ categoryId }: { categoryId: string }) {
  try {
    const categories = await getCategoriesApi({});
    return <FilterCategory categories={categories.payload.data} categoryId={categoryId} />;
  } catch {
    return null;
  }
}
