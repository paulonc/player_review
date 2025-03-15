import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { loginLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/', loginLimiter, AuthController.login);

export default router;
