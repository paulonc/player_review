import { Request, Response } from "express";
import ReviewService from "../services/ReviewService";
import logger from "../config/logger";

class ReviewController {
  async createReview(req: Request, res: Response): Promise<Response> {
    try {
      const review = await ReviewService.create(req.body);
      return res.status(201).json(review);
    } catch (error: any) {
      logger.error("Error creating review", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getReview(req: Request, res: Response): Promise<Response> {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      return res.status(200).json(review);
    } catch (error: any) {
      logger.error("Error fetching review", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

  async getAllReviews(req: Request, res: Response): Promise<Response> {
    try {
      const reviews = await ReviewService.getAllReviews();
      return res.status(200).json(reviews);
    } catch (error: any) {
      logger.error("Error fetching reviews", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateReview(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const updatedReview = await ReviewService.update(id, req.body);
      return res.status(200).json(updatedReview);
    } catch (error: any) {
      logger.error("Error updating review", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

  async patchReview(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const updatedReview = await ReviewService.update(id, req.body);
      return res.status(200).json(updatedReview);
    } catch (error: any) {
      logger.error("Error updating review", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }


  async deleteReview(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await ReviewService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      logger.error("Error deleting review", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}

export default new ReviewController();
