import { Request, Response, NextFunction } from 'express';
import ReviewService from '../services/ReviewService';
import logger from '../config/logger';

class ReviewController {
  async createReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const review = await ReviewService.create(req.body);
      return res.status(201).json(review);
    } catch (error) {
      logger.error('Error creating review', error);
      next(error);
    }
  }

  async getReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      return res.status(200).json(review);
    } catch (error) {
      logger.error('Error fetching review', error);
      next(error);
    }
  }

  async getAllReviews(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const reviews = await ReviewService.getAllReviews(page, limit);
      return res.status(200).json(reviews);
    } catch (error) {
      logger.error('Error fetching reviews', error);
      next(error);
    }
  }

  async updateReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    try {
      const updatedReview = await ReviewService.update(id, req.body);
      return res.status(200).json(updatedReview);
    } catch (error) {
      logger.error('Error updating review', error);
      next(error);
    }
  }

  async patchReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    try {
      const updatedReview = await ReviewService.update(id, req.body);
      return res.status(200).json(updatedReview);
    } catch (error) {
      logger.error('Error updating review', error);
      next(error);
    }
  }

  async deleteReview(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    try {
      await ReviewService.delete(id);
      return res.status(204).send();
    } catch (error) {
      logger.error('Error deleting review', error);
      next(error);
    }
  }
}

export default new ReviewController();
