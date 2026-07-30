
import { FilterCategory } from './filter-category'
import { getOccasionsApi } from '@/src/features/occasions/apis/occasions.api'
import { FilterOccasion } from './filter-occasion'

export async function OccasionFilterSection({occasionId} :{occasionId:string}) {
    const occasions = await getOccasionsApi({})

    return (
        <FilterOccasion occasions={occasions.payload.data} occasionId={occasionId}  />
    )
}
