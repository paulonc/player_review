import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.register(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: "Internal server error" });
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

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
      const updatedUser = await UserService.update(id, {
        username,
        email,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
      
      await UserService.changePassword(id, oldPassword, newPassword);
      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);

      if (!user) return res.status(404).json({ error: "User not found" });

      await UserService.deleteUser(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
