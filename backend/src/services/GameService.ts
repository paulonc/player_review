import GameRepository from '../repositories/GameRepository';
import CompanyService from './CompanyService';
import { Game } from '../models/Game';
import { NotFoundError, ValidationError } from '../errors/AppError';
import { z } from 'zod';

const gameSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  releaseDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid release date format')
    .transform((val) => new Date(val)),
  companyId: z.string().uuid('Invalid company ID format'),
});

class GameService {
  async createGame(game: Omit<Game, 'id' | 'created_at'>): Promise<Game> {
    const parsedGame = gameSchema.parse(game);

    const { companyId } = parsedGame;
    const company = await CompanyService.getCompanyById(companyId);
    if (!company) throw new NotFoundError('Company not found');
    return await GameRepository.create(game);
  }

  async getGameById(id: string): Promise<Game | null> {
    if (!id) throw new ValidationError('Game ID is required');
    const game = await GameRepository.findById(id);
    if (!game) throw new NotFoundError('Game not found');
    return game;
  }

  async getAllGames(): Promise<Game[]> {
    return await GameRepository.findAll();
  }

  async updateGame(
    id: string,
    gameData: Partial<Omit<Game, 'id' | 'created_at'>>,
  ): Promise<Game | null> {
    if (!id) throw new ValidationError('Game ID is required');
    const existingGame = await GameRepository.findById(id);
    if (!existingGame) throw new NotFoundError('Game not found');
    return await GameRepository.update(id, gameData);
  }

  async deleteGame(id: string): Promise<void> {
    if (!id) throw new ValidationError('Game ID is required');
    const game = await GameRepository.findById(id);
    if (!game) throw new NotFoundError('Game not found');
    await GameRepository.delete(id);
  }

  async updateReleaseDate(id: string, releaseDate: Date): Promise<Game | null> {
    if (!id) throw new ValidationError('Game ID is required');
    const game = await GameRepository.findById(id);
    if (!game) throw new NotFoundError('Game not found');
    if (isNaN(releaseDate.getTime()))
      throw new ValidationError('Invalid release date');
    return await GameRepository.update(id, { releaseDate });
  }
}

export default new GameService();
