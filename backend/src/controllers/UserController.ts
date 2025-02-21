import { Request, Response } from "express";
import UserService from "../services/UserService";
import logger from "../config/logger";

class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.register(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      logger.error("Error registering user", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(req.params.id);

      if (!user) {
        logger.warn(`User with id ${req.params.id} not found`);
        return res.status(404).json({ error: `User with id ${req.params.id} not found` });
      }
      return res.status(200).json(user);
    } catch (error: Error | any) {
      logger.error("Error fetching user", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      logger.error("Error fetching all users", error);
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
        return res.status(404).json({ message: `User with id ${id} not found` });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      logger.error("Error updating user", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);

      if (!user) return res.status(404).json({ error: `User with id ${id} not found` });

      await UserService.deleteUser(id);
      return res.status(204).send();
    } catch (error) {
      logger.error("Error deleting user", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updatePassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
      const user = await UserService.getUserById(id);

      if (!user) return res.status(404).json({ error: `User with id ${id} not found` });

      const isPasswordUpdated = await UserService.updatePassword(id, newPassword);
      if (!isPasswordUpdated) {
        return res.status(400).json({ error: "Invalid password" });
      }

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      logger.error("Error updating password", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
