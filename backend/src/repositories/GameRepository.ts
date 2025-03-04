import prisma from '../config/prisma';
import { Game } from '../models/Game';

class GameRepository {
  async create(game: Omit<Game, 'id' | 'created_at'>): Promise<Game> {
    return await prisma.game.create({ data: game });
  }

  async findById(id: string): Promise<Game | null> {
    return await prisma.game.findUnique({ where: { id } });
  }

  async findAll(): Promise<Game[]> {
    return await prisma.game.findMany();
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
}

export default new GameRepository();
