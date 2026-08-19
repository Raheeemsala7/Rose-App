'use server';

import { getNextAuthToken } from "@/src/shared/lib/utils/auth.utils";

interface IReviewData {
  productId: string;
  headline: string;
  content: string;
  rating: number;
}

export default async function addProductReview(reviewData: IReviewData) {
  // Get Token
  const jwt = await getNextAuthToken();

  // Submit new review
  const response = await fetch(`${process.env.API_URL}/reviews`, {
    body: JSON.stringify(reviewData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message ?? 'Failed to submit product review');
  }

  return data;
}
