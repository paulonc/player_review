import prisma from '../config/prisma';
import { Game } from '../models/Game';
import { TopRatedGame } from '../models/RatedGame';

class GameRepository {
  async create(game: Omit<Game, 'id' | 'created_at'>): Promise<Game> {
    return await prisma.game.create({ data: game });
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

  async getTopRatedGames(): Promise<TopRatedGame[]> {
    const topRatings = await prisma.review.groupBy({
      by: ['gameId'],
      _avg: { rating: true },
      orderBy: { _avg: { rating: 'desc' } },
      take: 10,
    });

    const gameIds = topRatings.map((item) => item.gameId);

    const games = await prisma.game.findMany({
      where: { id: { in: gameIds } },
    });

    return topRatings.map((item) => {
      const game = games.find((g) => g.id === item.gameId);
      return {
        game: game!,
        avgRating: item._avg.rating ?? 0,
      };
    });
  }
}

export default new GameRepository();
