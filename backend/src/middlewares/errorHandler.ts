import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import logger from '../config/logger';
import { ZodError } from 'zod';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof ZodError) {
    const errorDetails = err.errors.map((e) => ({
      field: e.path[0],
      message: e.message,
    }));
    return res.status(400).json({ error: errorDetails });
  }

  logger.error('Unexpected error', err);
  return res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;
