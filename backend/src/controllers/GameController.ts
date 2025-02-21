import { Request, Response } from "express";
import GameService from "../services/GameService";
import logger from "../config/logger";

class GameController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const game = await GameService.createGame(req.body);
      return res.status(201).json(game);
    } catch (error) {
      logger.error("Error creating game", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getGame(req: Request, res: Response): Promise<Response> {
    try {
      const game = await GameService.getGameById(req.params.id);
      if (!game) {
        logger.warn(`Game with id ${req.params.id} not found`);
        return res.status(404).json({ error: `Game with id ${req.params.id} not found` });
      }
      return res.status(200).json(game);
    } catch (error) {
      logger.error("Error fetching game", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllGames(req: Request, res: Response): Promise<Response> {
    try {
      const games = await GameService.getAllGames();
      return res.status(200).json(games);
    } catch (error) {
      logger.error("Error fetching all games", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedGame = await GameService.updateGame(req.params.id, req.body);
      if (!updatedGame)
        return res.status(404).json({ error: `Game with id ${req.params.id} not found` });
      return res.status(200).json(updatedGame);
    } catch (error) {
      logger.error("Error updating game", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await GameService.deleteGame(req.params.id);
      return res.status(204).send();
    } catch (error) {
      logger.error("Error deleting game", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateReleaseDate(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { releaseDate } = req.body;

      if (!releaseDate || isNaN(new Date(releaseDate).getTime())) {
        return res.status(400).json({ error: "Valid release date is required" });
      }

      const updatedGame = await GameService.updateReleaseDate(id, new Date(releaseDate));
      if (!updatedGame) {
        return res.status(404).json({ error: `Game with id ${id} not found` });
      }
      return res.status(200).json(updatedGame);
    } catch (error) {
      logger.error("Error updating release date", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new GameController();
