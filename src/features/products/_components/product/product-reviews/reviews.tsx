import IProductReviews from '../../../types/product-reviews';
import FormReview from './form-review';
import { ReviewsList } from './reviews-list';

export interface IReviewsListProps {
  reviews: IProductReviews[] | undefined;
  productId: string;
}

export default function ReviewsItem({ productId, reviews }: IReviewsListProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Reviews */}
      <div className="review w-full lg:w-3/5 h-92 flex flex-col gap-2.5 overflow-y-auto py-2 px-1.75">
        <ReviewsList productId={productId} reviews={reviews} />
      </div>

      {/* Review Form */}
      <FormReview productId={productId} />
    </div>
  );
}
