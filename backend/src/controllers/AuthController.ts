import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import logger from '../config/logger';

class AuthController {
  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, password } = req.body;
    try {
      const { token } = await AuthService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      logger.error('Erro no login', error);
      next(error);
    }
  }
}

export default new AuthController();
