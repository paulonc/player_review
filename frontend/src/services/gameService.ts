import api from './api';
import { ApiResponse, Game, PaginatedResponse } from '../types/api';

interface CreateGameData {
  title: string;
  description: string;
  releaseDate: string;
  companyId: string;
  categoryId: string;
  imageUrl?: string;
}

type UpdateGameData = Partial<CreateGameData>;

interface GetGamesParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  companyId?: string;
  search?: string;
}

export const gameService = {
  async getGames(params: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
  }): Promise<PaginatedResponse<Game>> {
    const { page = 1, limit = 10, search, categoryId } = params;
    const response = await api.get<PaginatedResponse<Game>>("/games", {
      params: { page, limit, search, categoryId },
    });
    return response.data;
  },

  async getGame(id: string): Promise<ApiResponse<Game>> {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },

  async createGame(data: CreateGameData): Promise<ApiResponse<Game>> {
    const response = await api.post('/games', data);
    return response.data;
  },

  async updateGame(id: string, data: UpdateGameData): Promise<ApiResponse<Game>> {
    const response = await api.put(`/games/${id}`, data);
    return response.data;
  },

  async deleteGame(id: string): Promise<void> {
    await api.delete(`/games/${id}`);
  },

  async getTopRatedGames(limit: number = 10): Promise<ApiResponse<Game[]>> {
    const response = await api.get('/games/top-rated', {
      params: { limit }
    });
    return { data: response.data };
  },

  async getNewReleases(limit: number = 10): Promise<ApiResponse<Game[]>> {
    const response = await api.get('/games/top-rated', {
      params: { limit }
    });
    return { data: response.data };
  },

  async getGameDetails(id: string): Promise<ApiResponse<{
    game: Game;
    avgRating: number;
    reviewCount: number;
    companyName: string;
    categoryName: string;
  }>> {
    const response = await api.get(`/games/${id}/details`);
    return response;
  },

  async getTopRatedGamesByCategory(id: string): Promise<ApiResponse<{
    id: string;
    title: string;
    imageUrl: string;
    avgRating: number;
    reviewCount: number;
  }[]>> {
    const response = await api.get(`/games/${id}/similar`);
    return response;
  }
}; 