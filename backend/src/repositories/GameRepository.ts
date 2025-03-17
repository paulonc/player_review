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

  async getTopRatedGames(limit: number = 10): Promise<TopRatedGame[]> {
    const grouped = await prisma.review.groupBy({
      by: ['gameId'],
      _avg: { rating: true },
      orderBy: {
        _avg: { rating: 'desc' },
      },
      take: limit,
    });

    const gameIds = grouped.map((g) => g.gameId);

    const games = await prisma.game.findMany({
      where: { id: { in: gameIds } },
    });

    const result: TopRatedGame[] = grouped.map((group) => {
      const game = games.find((g) => g.id === group.gameId);
      return {
        game: game!,
        avgRating: group._avg.rating ? Number(group._avg.rating.toFixed(2)) : 0,
      };
    });

    return result;
  }
}

export default new GameRepository();
