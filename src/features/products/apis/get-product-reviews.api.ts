import IProductReviews, { IMetadata } from "../types/product";

export default async function getProductReviews(productId?: string) {
  // Get reviews Data
  const response = await fetch(`${process.env.API_URL}/reviews?productId=${productId}`);

  const data: ApiResponse<{ data: IProductReviews[]; metadata: IMetadata }> =
    await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to fetch Product reviews');
  }

  return data.payload;
}
