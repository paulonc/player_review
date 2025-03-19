import { Request, Response, NextFunction } from 'express';
import CategoryService from '../services/CategoryService';
import logger from '../config/logger';

class CategoryController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const category = await CategoryService.createCategory(req.body);
      return res.status(201).json(category);
    } catch (error) {
      logger.error('Error creating category', error);
      next(error);
    }
  }

  async getCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      return res.status(200).json(category);
    } catch (error) {
      logger.error('Error getting category', error);
      next(error);
    }
  }

  async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const categories = await CategoryService.getAllCategories(page, limit);
      return res.status(200).json(categories);
    } catch (error) {
      logger.error('Error getting all categories', error);
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const updatedCategory = await CategoryService.updateCategory(
        req.params.id,
        req.body,
      );
      return res.status(200).json(updatedCategory);
    } catch (error) {
      logger.error('Error updating category', error);
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      await CategoryService.deleteCategory(req.params.id);
      return res.status(204).send();
    } catch (error) {
      logger.error('Error deleting category', error);
      next(error);
    }
  }

  async getTopRatedCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const topRatedCategories = await CategoryService.getTopRatedCategories(limit);
      return res.status(200).json(topRatedCategories);
    } catch (error) {
      logger.error('Error getting top rated categories', error);
      next(error);
    }
  }
}

export default new CategoryController();
