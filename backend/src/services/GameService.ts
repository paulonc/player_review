import GameRepository from "../repositories/GameRepository";
import { Game } from "../models/Game";

class GameService {
  async createGame(game: Omit<Game, "id" | "created_at">): Promise<Game> {
    return await GameRepository.create(game);
  }

  async getGameById(id: string): Promise<Game | null> {
    return await GameRepository.findById(id);
  }

  async getAllGames(): Promise<Game[]> {
    return await GameRepository.findAll();
  }

  async updateGame(id: string, gameData: Partial<Omit<Game, "id" | "created_at">>): Promise<Game | null> {
    return await GameRepository.update(id, gameData);
  }

  async deleteGame(id: string): Promise<void> {
    await GameRepository.delete(id);
  }
}

export default new GameService();