import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.register(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(req.params.id);

      if (!user) return res.status(404).json({ error: "User not found" });
      return res.status(200).json(user);
    } catch (error: Error | any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  
}

export default new UserController();
