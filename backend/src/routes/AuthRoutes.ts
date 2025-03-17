import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { loginLimiter } from '../middlewares/rateLimiter';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for authentication
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/', loginLimiter, AuthController.login);

export default router;
