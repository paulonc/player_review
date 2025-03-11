import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/AppError';

interface JwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const authenticate = (
  req: Request,
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

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return next(new UnauthorizedError('Invalid token'));
    req.user = decoded as JwtPayload;
    next();
  });
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
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
