import GameRepository from '../repositories/GameRepository';
import CompanyService from './CompanyService';
import { Game } from '../models/Game';
import { ConflictError, NotFoundError, ValidationError } from '../errors/AppError';
import { z } from 'zod';
import { TopRatedGame } from '../models/RatedGame';
import CategoryService from './CategoryService';

const gameSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  releaseDate: z
    .preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      z.date(),
    )
    .refine((val) => !isNaN(val.getTime()), 'Invalid release date format')
    .transform((val) => val.toISOString()),
  companyId: z.string().uuid('Invalid company ID format'),
  categoryId: z.string().uuid('Invalid category ID format'),
  imageUrl: z.string().nullable().optional().transform(val => val ?? null),
});

class GameService {
  async createGame(game: Omit<Game, 'id' | 'created_at'>): Promise<Game> {
    const parsedGame = gameSchema.parse(game);

    const { companyId, categoryId } = parsedGame;
    const company = await CompanyService.getCompanyById(companyId);
    if (!company) throw new NotFoundError('Company not found');
    const category = await CategoryService.getCategoryById(categoryId);
    if (!category) throw new NotFoundError('Category not found');
    return await GameRepository.create(game);
  }

  async getGameById(id: string): Promise<Game | null> {
    if (!id) throw new ValidationError('Game ID is required');
    const game = await GameRepository.findById(id);
    if (!game) throw new NotFoundError('Game not found');
    return game;
  }

  async getAllGames(page: number, limit: number): Promise<Game[]> {
    if (page < 1) throw new ValidationError('Page must be greater than 0');
    if (limit < 1) throw new ValidationError('Limit must be greater than 0');

    const offset = (page - 1) * limit;

    return await GameRepository.findAll(offset, limit);
  }

  async getTopRatedGames(limit: number): Promise<TopRatedGame[]> {
    const topRatedGames = await GameRepository.getTopRatedGames(limit);
    if (!topRatedGames || topRatedGames.length === 0) {
      throw new NotFoundError('No games with ratings found');
    }
    return topRatedGames;
  }

  async getGameDetails(id: string) {
    if (!id) throw new ValidationError('Game ID is required');
    const gameDetails = await GameRepository.getGameDetails(id);
    if (!gameDetails) throw new NotFoundError('Game not found');
    return gameDetails;
  }

  async getTopRatedGamesByCategory(gameId: string) {
    if (!gameId) throw new ValidationError('Game ID is required');
    const game = await GameRepository.findById(gameId);
    if (!game) throw new NotFoundError('Game not found');
    const similarGames = await GameRepository.getTopRatedGamesByCategory(gameId, game.categoryId);
    if (!similarGames || similarGames.length === 0) {
      throw new ConflictError('No similar games found');
    }
    return similarGames;
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
