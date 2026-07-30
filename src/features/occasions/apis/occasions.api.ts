import { Occasion } from '../types/occasions';

interface GetOccasionsParams {
  page?: number;
  limit?: number;
}

export async function getOccasionsApi({ ...params }: GetOccasionsParams) {
  const response = await fetch(
    `${process.env.API_URL}/occasions?${new URLSearchParams(params as Record<string, string>).toString()}`
  );
  const data: ApiResponse<{
    data: Occasion[];
    metadata: { page: string; limit: string; total: string; totalPages: string };
  }> = await response.json();

  if (!response.ok || !data.status || !data.payload) {
    throw new Error(data.message || 'Failed to fetch occasions');
  }

  return data;
}
