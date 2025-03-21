import api from './api';
import { ApiResponse, Review, PaginatedResponse } from '../types/api';

interface CreateReviewData {
  content: string;
  rating: number;
  gameId: string;
}

type UpdateReviewData = Partial<CreateReviewData>;

interface GetReviewsParams {
  page?: number;
  limit?: number;
  gameId?: string;
  userId?: string;
}

export const reviewService = {
  async getReviews(params: GetReviewsParams = {}): Promise<PaginatedResponse<Review>> {
    const response = await api.get<PaginatedResponse<Review>>('/reviews', { params });
    return response.data;
  },

  async getReview(id: string): Promise<ApiResponse<Review>> {
    const response = await api.get<ApiResponse<Review>>(`/reviews/${id}`);
    return response.data;
  },

  async createReview(data: CreateReviewData): Promise<ApiResponse<Review>> {
    const response = await api.post<ApiResponse<Review>>('/reviews', data);
    return response.data;
  },

  async updateReview(id: string, data: UpdateReviewData): Promise<ApiResponse<Review>> {
    const response = await api.put<ApiResponse<Review>>(`/reviews/${id}`, data);
    return response.data;
  },

  async deleteReview(id: string): Promise<void> {
    await api.delete(`/reviews/${id}`);
  },

  async getUserReviews(userId: string, params: Omit<GetReviewsParams, 'userId'> = {}): Promise<PaginatedResponse<Review>> {
    const response = await api.get<PaginatedResponse<Review>>(`/users/${userId}/reviews`, { params });
    return response.data;
  },

  async getGameReviews(gameId: string, params: Omit<GetReviewsParams, 'gameId'> = {}): Promise<PaginatedResponse<Review>> {
    const response = await api.get<PaginatedResponse<Review>>(`/games/${gameId}/reviews`, { params });
    return response.data;
  }
}; 