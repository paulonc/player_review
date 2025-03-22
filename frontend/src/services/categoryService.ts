import api from './api';
import { ApiResponse, Category } from '../types/api';

export const categoryService = {
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await api.get('/categories');
    return response.data;
  }
};
