import prisma from '../config/prisma';
import { Category } from '../models/Category';

class CategoryRepository {
  async create(category: Omit<Category, 'id' | 'createdAt' | 'games'>): Promise<Category> {
    return await prisma.category.create({ data: category });
  }

  async findById(id: string): Promise<Category | null> {
    return await prisma.category.findUnique({ where: { id } });
  }

  async findAll(offset: number, limit: number): Promise<Category[]> {
    const totalCount = await prisma.category.count();

    if (offset > 0 && offset >= totalCount) {
      return [];
    }

    return await prisma.category.findMany({ skip: offset, take: limit });
  }

  async update(
    id: string,
    categoryData: Partial<Omit<Category, 'id' | 'createdAt' | 'games'>>,
  ): Promise<Category | null> {
    return await prisma.category.update({
      where: { id },
      data: categoryData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }

  async getTopRatedCategories(limit: number = 10): Promise<{ category: Category, avgRating: number }[]> {
    const categories = await prisma.category.findMany({
      include: {
        games: {
          include: {
            reviews: true
          }
        }
      }
    });
  
    const categoryRatings = categories.map((category) => {
      let totalRating = 0;
      let reviewCount = 0;
  
      category.games?.forEach((game) => {
        game.reviews.forEach((review) => {
          totalRating += review.rating;
          reviewCount++;
        });
      });
  
      const avgRating = reviewCount > 0 ? totalRating / reviewCount : 0;
  
      return {
        category,
        avgRating: Number(avgRating.toFixed(2))
      };
    });
  
    categoryRatings.sort((a, b) => b.avgRating - a.avgRating);

    return categoryRatings.slice(0, limit);
  }
}

export default new CategoryRepository();
