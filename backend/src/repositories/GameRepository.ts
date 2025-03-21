import prisma from '../config/prisma';
import { Game } from '../models/Game';
import { TopRatedGame } from '../models/RatedGame';

class GameRepository {
  async create(game: Omit<Game, 'id' | 'created_at'>): Promise<Game> {
    const createdGame = await prisma.game.create({ data: game });

    await prisma.category.update({
      where: { id: game.categoryId },
      data: {
        games: {
          connect: { id: createdGame.id },
        },
      },
    });

    return createdGame;
  }

  async findById(id: string): Promise<Game | null> {
    return await prisma.game.findUnique({ where: { id } });
  }

  async findAll(offset: number, limit: number): Promise<Game[]> {
    const totalCount = await prisma.game.count();

    if (offset > 0 && offset >= totalCount) {
      return [];
    }

    return await prisma.game.findMany({ skip: offset, take: limit });
  }

  async update(
    id: string,
    gameData: Partial<Omit<Game, 'id' | 'created_at'>>,
  ): Promise<Game | null> {
    return await prisma.game.update({ where: { id }, data: gameData });
  }

  async delete(id: string): Promise<void> {
    await prisma.game.delete({ where: { id } });
  }

  async getTopRatedGames(limit: number): Promise<TopRatedGame[]> {
    const recentReviews = await prisma.review.groupBy({
      by: ['gameId'],
      _avg: { rating: true },
      _count: { gameId: true },
      _max: { createdAt: true },
      orderBy: {
        _max: { createdAt: 'desc' },
      },
      take: limit,
    });
  
    const gameIds = recentReviews.map((r) => r.gameId);
  
    const games = await prisma.game.findMany({
      where: { id: { in: gameIds } },
      include: { category: true }
    });
  
    const result: TopRatedGame[] = recentReviews.map((group) => {
      const game = games.find((g) => g.id === group.gameId);
      return {
        game: game!,
        avgRating: group._avg.rating ? Number(group._avg.rating.toFixed(2)) : 0,
        reviewCount: group._count.gameId,
        categoryName: game?.category?.name || "Unknown",
      };
    });
  
    return result;
  } 



  
}

export default new GameRepository();
