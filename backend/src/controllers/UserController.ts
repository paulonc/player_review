import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import logger from '../config/logger';

class UserController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const user = await UserService.register(req.body);
      return res.status(201).json(user);
    } catch (error) {
      logger.error('Error registering user', error);
      next(error);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const user = await UserService.getUserById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      logger.error('Error getting user', error);
      next(error);
    }
  }

  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      logger.error('Error getting all users', error);
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
      const updatedUser = await UserService.update(id, {
        username,
        email,
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      logger.error('Error updating user', error);
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    try {
      await UserService.deleteUser(id);
      return res.status(204).send();
    } catch (error) {
      logger.error('Error deleting user', error);
      next(error);
    }
  }

  async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
      await UserService.changePassword(id, oldPassword, newPassword);
      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      logger.error('Error changing password', error);
      next(error);
    }
  }
}

export default new UserController();
