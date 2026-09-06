import { Occasion } from '@/src/features/occasions/types/occasions';
// import { getProducts } from '@/src/features/products/apis/products';
import { Product } from '@/src/features/products/types/product';


const OCCASIONS_LIMIT = 4;
const PRODUCTS_PER_OCCASION = 12;

export interface OccasionProductGroup {
  occasion: Occasion;
  products: Product[];
}

export function getDefaultActiveOccasionId(occasionProducts: OccasionProductGroup[]): string {
  const firstWithProducts = occasionProducts.find((group) => group.products.length > 0);
  return firstWithProducts?.occasion.id ?? occasionProducts[0]?.occasion.id ?? '';
}

// export const getMostPopularOccasionProducts = cache(async (): Promise<OccasionProductGroup[]> => {
//   const occasions = await getOccasions({ limit: OCCASIONS_LIMIT });

//   if (!Array.isArray(occasions) || occasions.length === 0) {
//     return [];
//   }

//   const productsByOccasion = await Promise.all(
//     occasions.map((occasion) =>
//       getProducts({ occasionId: occasion.id, limit: PRODUCTS_PER_OCCASION, sortBy: 'mostPopular' })
//     )
//   );

//   return occasions.map((occasion, index) => ({
//     occasion,
//     products: productsByOccasion[index],
//   }));
// });
