import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UserRoutes';
import gameRoutes from './routes/GameRoutes';
import companyRoutes from './routes/CompanyRoutes';
import reviewRoutes from './routes/ReviewRoutes';
import authRoutes from './routes/AuthRoutes';
import { setupSwagger } from './config/swagger';
import logger from './config/logger';
import errorHandler from './middlewares/errorHandler';
import { apiLimiter } from './middlewares/rateLimiter';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));

app.use('/login', authRoutes);
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/companies', companyRoutes);
app.use('/reviews', reviewRoutes);

app.use(errorHandler);
app.use(apiLimiter);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});

export default app;
