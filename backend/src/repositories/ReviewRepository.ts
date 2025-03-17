import prisma from '../config/prisma';
import { Review } from '../models/Review';

class ReviewRepository {
  async create(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    return await prisma.review.create({ data: review });
  }

  async findById(id: string): Promise<Review | null> {
    return await prisma.review.findUnique({ where: { id } });
  }

  async findAll(offset: number, limit: number): Promise<Review[]> {
    const totalCount = await prisma.review.count();

    if (offset > 0 && offset >= totalCount) {
      return [];
    }

    return await prisma.review.findMany({ skip: offset, take: limit });
  }

  async update(
    id: string,
    reviewData: Partial<Omit<Review, 'id' | 'createdAt'>>,
  ): Promise<Review> {
    return await prisma.review.update({
      where: { id },
      data: reviewData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.review.delete({
      where: { id },
    });
  }
}

export default new ReviewRepository();
