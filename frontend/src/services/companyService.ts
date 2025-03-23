import api from './api';
import { ApiResponse, Company } from '../types/api';

export const companyService = {
  async getCompanies(): Promise<ApiResponse<Company[]>> {
    const response = await api.get('/companies');
    return response;
  }
};
