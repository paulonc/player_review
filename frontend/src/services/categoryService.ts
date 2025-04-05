import api from './api';
import { ApiResponse, Category } from '../types/api';

export const categoryService = {
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await api.get('/categories');
    return response;
  },

  async getCategory(id: string): Promise<ApiResponse<Category>> {
    const response = await api.get(`/categories/${id}`);
    return response;
  },

  async createCategory(name: string): Promise<ApiResponse<Category>> {
    const response = await api.post('/categories', { name });
    return response;
  },

  async updateCategory(id: string, name: string): Promise<ApiResponse<Category>> {
    const response = await api.put(`/categories/${id}`, { name });
    return response;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  }
};
