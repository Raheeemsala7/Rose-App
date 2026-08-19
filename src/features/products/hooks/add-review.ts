import { useMutation } from '@tanstack/react-query';
import addProductReview from '../apis/add-review.api';

export default function useAddReview() {
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: addProductReview,
  });
  return { data, error, isPending, addProductReview: mutate };
}
