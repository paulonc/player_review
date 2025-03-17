import { Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/AppError';
import { verifyToken } from '../config/jwt';
import { UserAuthenticatedRequest } from '../types/express';

interface JwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const authenticate = (
  req: UserAuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new UnauthorizedError('Token not provided'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new UnauthorizedError('Invalid token format'));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as JwtPayload;
    next();
  } catch {
    return next(new UnauthorizedError('Invalid token'));
  }
};

export const authorize = (roles: string[]) => {
  return (req: UserAuthenticatedRequest, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user) {
      return next(new UnauthorizedError('User not authenticated'));
    }
    if (!roles.includes(user.role)) {
      return next(new UnauthorizedError('User not authorized'));
    }
    next();
  };
};
