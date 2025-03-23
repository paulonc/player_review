import api from './api';
import { ApiResponse, Category } from '../types/api';

export const categoryService = {
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await api.get('/categories');
    return response;
  },

  async createCategory(name: string): Promise<ApiResponse<Category>> {
    const response = await api.post('/categories', { name });
    return response;
  }
};
