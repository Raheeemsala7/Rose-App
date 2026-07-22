import MostPopularProductsGrid from './most-popular-products-grid';
import {
  getDefaultActiveOccasionId,
  OccasionProductGroup,
} from '../../lib/utils/most-popular-data';
import {
  DefaultActiveTabSync,
  MostPopularTabList,
  MostPopularTabPanel,
} from './most-popular-shared-tabs';

export async function MostPopularTabListSlot({
  occasionProductsPromise,
}: {
  occasionProductsPromise: Promise<OccasionProductGroup[]>;
}) {
  const occasionProducts = await occasionProductsPromise;

  if (occasionProducts.length === 0) {
    return null;
  }

  const occasions = occasionProducts.map(({ occasion }) => occasion);
  const defaultActiveId = getDefaultActiveOccasionId(occasionProducts);

  return (
    <>
      <DefaultActiveTabSync defaultActiveId={defaultActiveId} />
      <MostPopularTabList occasions={occasions} />
    </>
  );
}

export async function MostPopularProductPanelsSlot({
  occasionProductsPromise,
}: {
  occasionProductsPromise: Promise<OccasionProductGroup[]>;
}) {
  const occasionProducts = await occasionProductsPromise;

  if (occasionProducts.length === 0) {
    return null;
  }

  return (
    <>
      {occasionProducts.map(({ occasion, products }) => (
        <MostPopularTabPanel key={occasion.id} occasionId={occasion.id}>
          <MostPopularProductsGrid products={products} />
        </MostPopularTabPanel>
      ))}
    </>
  );
}
