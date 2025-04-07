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

  async count(): Promise<number> {
    return await prisma.review.count();
  }

  async findRecent(): Promise<{
      game: string; review: Review; userName: string 
}[]> {
    const recentReviews = await prisma.review.findMany({
      include: {
        user: true,
        game: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return recentReviews.map(review => ({
      review,
      userName: review.user.username,
      game: review.game.title,
    }));
  }
}

export default new ReviewRepository();
