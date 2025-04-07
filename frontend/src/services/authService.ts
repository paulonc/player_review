import api from './api';
import { LoginResponse } from '../types/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

export const authService = {
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await api.post('/login', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await api.post('/users', data);
    return response.data;
  },

  async logout(): Promise<void> {
  }
};
