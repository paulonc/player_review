import api from './api';
import { ApiResponse, Company } from '../types/api';

export const companyService = {
  async getCompanies(): Promise<ApiResponse<Company[]>> {
    const response = await api.get('/companies');
    return response;
  },

  async createCompany(data: { name: string; country: string; logoUrl: string }): Promise<ApiResponse<Company>> {
    const response = await api.post('/companies', data);
    return response;
  },

  async deletePublisher(id: string): Promise<void> {
    await api.delete(`/companies/${id}`);
  }
};
