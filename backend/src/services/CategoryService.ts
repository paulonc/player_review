import CategoryRepository from '../repositories/CategoryRepository';
import { Category } from '../models/Category';
import { NotFoundError, ValidationError } from '../errors/AppError';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

class CategoryService {
  async createCategory(
    category: Omit<Category, 'id' | 'createdAt'>,
  ): Promise<Category> {
    const parsedCategory = categorySchema.parse(category);
    return await CategoryRepository.create(parsedCategory);
  }

  async getCategoryById(id: string): Promise<Category | null> {
    if (!id) throw new ValidationError('Category ID is required');
    const category = await CategoryRepository.findById(id);
    if (!category) throw new NotFoundError('Category not found');
    return category;
  }

  async getAllCategories(page: number, limit: number): Promise<Category[]> {
    if (page < 1) throw new ValidationError('Page must be greater than 0');
    if (limit < 1) throw new ValidationError('Limit must be greater than 0');

    const offset = (page - 1) * limit;

    return await CategoryRepository.findAll(offset, limit);
  }

  async updateCategory(
    id: string,
    categoryData: Partial<Omit<Category, 'id' | 'createdAt'>>,
  ): Promise<Category | null> {
    if (!id) throw new ValidationError('Category ID is required');
    const existingCategory = await CategoryRepository.findById(id);
    if (!existingCategory) throw new NotFoundError('Category not found');
    const parsedCategoryData = categorySchema.partial().parse(categoryData);
    return await CategoryRepository.update(id, parsedCategoryData);
  }

  async deleteCategory(id: string): Promise<void> {
    if (!id) throw new ValidationError('Category ID is required');
    const category = await CategoryRepository.findById(id);
    if (!category) throw new NotFoundError('Category not found');
    await CategoryRepository.delete(id);
  }

  async getTopRatedCategories(limit: number = 10): Promise<{ category: Category, avgRating: number }[]> {
    return await CategoryRepository.getTopRatedCategories(limit);
  }
}

export default new CategoryService();
