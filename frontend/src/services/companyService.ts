import api from './api';
import { ApiResponse, Company } from '../types/api';

export const companyService = {
  async getCompanies(page: number, limit: number): Promise<ApiResponse<Company[]>> {
    const response = await api.get(`/companies?page=${page}&limit=${limit}`);
    return response;
  },

  async getCompany(id: string): Promise<ApiResponse<Company>> {
    const response = await api.get(`/companies/${id}`);
    return response;
  },

  async createCompany(data: { name: string; country: string; logoUrl: string }): Promise<ApiResponse<Company>> {
    const response = await api.post('/companies', data);
    return response;
  },

  async updateCompany(id: string, data: { name: string; country: string; imageUrl: string }): Promise<ApiResponse<Company>> {
    const response = await api.put(`/companies/${id}`, data);
    return response;
  },

  async deletePublisher(id: string): Promise<void> {
    await api.delete(`/companies/${id}`);
  }
};
