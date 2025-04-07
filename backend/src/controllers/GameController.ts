import { Request, Response, NextFunction } from 'express';
import GameService from '../services/GameService';
import logger from '../config/logger';
class GameController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const game = await GameService.createGame(req.body);
      return res.status(201).json(game);
    } catch (error) {
      logger.error('Error creating game', error);
      next(error);
    }
  }

  async getGame(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const game = await GameService.getGameById(req.params.id);
      return res.status(200).json(game);
    } catch (error) {
      logger.error('Error getting game', error);
      next(error);
    }
  }

  async getAllGames(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { games, total } = await GameService.getAllGames(page, limit);
      return res.status(200).json({
        data: games,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      logger.error('Error getting all games', error);
      next(error);
    }
  }

  async getTopRatedGames(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const topRatedGames = await GameService.getTopRatedGames(limit);
      return res.status(200).json(topRatedGames);
    } catch (error) {
      logger.error('Error getting top rated games', error);
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const updatedGame = await GameService.updateGame(req.params.id, req.body);
      return res.status(200).json(updatedGame);
    } catch (error) {
      logger.error('Error updating game', error);
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      await GameService.deleteGame(req.params.id);
      return res.status(204).send();
    } catch (error) {
      logger.error('Error deleting game', error);
      next(error);
    }
  }

  async updateReleaseDate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { releaseDate } = req.body;
      const updatedGame = await GameService.updateReleaseDate(
        id,
        new Date(releaseDate),
      );
      return res.status(200).json(updatedGame);
    } catch (error) {
      logger.error('Error updating release date', error);
      next(error);
    }
  }

  async getGameDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const gameDetails = await GameService.getGameDetails(req.params.id);
      return res.status(200).json(gameDetails);
    } catch (error) {
      logger.error('Error getting game details', error);
      next(error);
    }
  }

  async getTopRatedGamesByCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const similarGames = await GameService.getTopRatedGamesByCategory(req.params.id);
      return res.status(200).json(similarGames);
    } catch (error) {
      logger.error('Error getting top rated games by category', error);
      next(error);
    }
  }
}

export default new GameController();
