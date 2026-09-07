import { getOccasionsApi } from '@/src/features/occasions/apis/occasions.api';
import { FilterOccasion } from './filter-occasion';

export async function OccasionFilterSection({ occasionId }: { occasionId: string }) {
  try {
    const occasions = await getOccasionsApi({});
    return <FilterOccasion occasions={occasions.payload.data} occasionId={occasionId} />;
  } catch {
    return null;
  }
}
