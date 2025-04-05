import { Request, Response, NextFunction } from "express";
import DashService from "../services/DashService";

class DashController {
  async getCounts(req: Request, res: Response, next: NextFunction) {
    try {   
      const counts = await DashService.getCounts();
      res.status(200).json(counts);
    } catch (error) {
      next(error);
    }
  }

  async getRecentActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const activities = await DashService.getRecentActivities();
      res.status(200).json(activities);
    } catch (error) {
      next(error);  
    }
  }
}

export default new DashController();
