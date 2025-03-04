import { z } from "zod";
import ReviewRepository from "../repositories/ReviewRepository";
import { Review } from "../models/Review";
import { NotFoundError, ValidationError } from "../errors/AppError";
import UserRepository from "../repositories/UserRepository";
import GameRepository from "../repositories/GameRepository";

const reviewSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  gameId: z.string().min(1, "Game ID is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  review: z
    .string()
    .optional()
    .transform((val) => val ?? null),
});

class ReviewService {
  async create(review: Omit<Review, "id" | "createdAt">): Promise<Review> {
    const parsedReview = reviewSchema.parse(review);
    const userExists = await UserRepository.findById(parsedReview.userId);
    if (!userExists) {
      throw new NotFoundError("User not found");
    }
    const gameExists = await GameRepository.findById(parsedReview.gameId);
    if (!gameExists) {
      throw new NotFoundError("Game not found");
    }
    return await ReviewRepository.create(parsedReview);
  }

  async getReviewById(id: string): Promise<Review> {
    if (!id) throw new ValidationError("Review ID is required");
    const review = await ReviewRepository.findById(id);
    if (!review) throw new NotFoundError("Review not found");
    return review;
  }

  async getAllReviews(): Promise<Review[]> {
    return await ReviewRepository.findAll();
  }

  async update(
    id: string,
    reviewData: Partial<Omit<Review, "id" | "createdAt">>
  ): Promise<Review> {
    if (!id) throw new ValidationError("Review ID is required");
    return await ReviewRepository.update(id, reviewData);
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new ValidationError("Review ID is required");
    await ReviewRepository.delete(id);
  }
}

export default new ReviewService();
