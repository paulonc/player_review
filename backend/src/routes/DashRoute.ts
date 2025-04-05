import { Router } from "express";
import DashController from "../controllers/DashController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authMiddleware";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dash
 *   description: Endpoints for dashboard
 */

/**
 * @swagger
 * /dash/counts:
 *   get:
 *     summary: Get counts of games, reviews, and users
 *     tags:
 *       - Dash
 *     responses:
 *       200:
 *         description: Successfully retrieved counts
 *         schema:
 *           type: object
 *           properties:
 *             games:
 *               type: number
 *             reviews:
 *               type: number
 *             users:
 *               type: number
 */ 
router.get('/counts', authenticate, authorize(['ADMIN']), DashController.getCounts);

/**
 * @swagger
 * /dash/activities:
 *   get:
 *     summary: Get recent activities
 *     tags:
 *       - Dash
 *     responses:
 *       200:
 *         description: Successfully retrieved recent activities
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               title:
 *                 type: string 
 *               timestamp:
 *                 type: string
 */
router.get('/activities', authenticate, authorize(['ADMIN']), DashController.getRecentActivities);

export default router;