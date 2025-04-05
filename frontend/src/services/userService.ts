import api from './api';
import { User } from '../types/api';
export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },
};
