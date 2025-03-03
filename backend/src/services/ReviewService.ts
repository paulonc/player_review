import { z } from "zod";
import ReviewRepository from "../repositories/ReviewRepository";
import { Review } from "../models/Review";

const reviewSchema = z.object({
  userId: z.string(),
  gameId: z.string(),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  review: z.string().optional().transform(val => val ?? null),
});

class ReviewService {
  async create(review: Omit<Review, "id" | "createdAt">): Promise<Review> {
    const parsedReview = reviewSchema.parse(review);
    return await ReviewRepository.create(parsedReview);
  }

  async getReviewById(id: string): Promise<Review> {
    if (!id) throw new Error("Review ID is required");
    const review = await ReviewRepository.findById(id);
    if (!review) throw new Error("Review not found");
    return review;
  }

  async getAllReviews(): Promise<Review[]> {
    return await ReviewRepository.findAll();
  }

  async update(
    id: string,
    reviewData: Partial<Omit<Review, "id" | "createdAt">>
  ): Promise<Review> {
    if (!id) throw new Error("Review ID is required");
    return await ReviewRepository.update(id, reviewData);
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new Error("Review ID is required");
    await ReviewRepository.delete(id);
  }
}

export default new ReviewService();
