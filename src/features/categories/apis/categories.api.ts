import { Category } from "../types/categories";

interface GetOccasionsParams {
  page?: number;
  limit?: number;
}

export async function getCategoriesApi({ ...params }: GetOccasionsParams) {
  const response = await fetch(
    `${process.env.API_URL}/categories?${new URLSearchParams(params as Record<string, string>).toString()}`
  );
  const data: ApiResponse<{
    data: Category[];
    metadata: { page: string; limit: string; total: string; totalPages: string };
  }> = await response.json();

  if (!data.status) {
    throw new Error(data.message || 'Failed to fetch occasions');
  }

  return data;
}
