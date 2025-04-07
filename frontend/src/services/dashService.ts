import api from "./api";
import { DashCounts, RecentActivity } from "@/types/api";
export const dashService = {
  async getCounts(): Promise<DashCounts> {
    const response = await api.get('/dash/counts');
    return response.data;
  },    

  async getRecentActivities(): Promise<RecentActivity[]> {
    const response = await api.get('/dash/activities');
    return response.data;
  }
}
