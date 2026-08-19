import { z } from 'zod';

export const formReviewSchema = z.object({
  headline: z.string().nonempty({ message: 'required' }),
  content: z.string().nonempty({ message: 'required' }),
  rating: z.number().min(1, { message: 'rating-required' }),
});

export type FormReviewValue = z.infer<typeof formReviewSchema>;
