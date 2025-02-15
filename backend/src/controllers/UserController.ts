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
}

export default new UserController();
