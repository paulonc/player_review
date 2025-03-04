import { Router } from 'express';
import ReviewController from '../controllers/ReviewController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints for managing reviews
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Returns all registered reviews.
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: List of reviews.
 *       500:
 *         description: Internal server error.
 */
router.get('/', ReviewController.getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     description: Returns a review by its unique identifier.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review found.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', ReviewController.getReview);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     description: Adds a new review.
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - gameId
 *               - rating
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user-uuid"
 *               gameId:
 *                 type: string
 *                 example: "game-uuid"
 *               rating:
 *                 type: number
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: "Great game!"
 *     responses:
 *       201:
 *         description: Review created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/', ReviewController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review
 *     description: Updates a review by its ID.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               review:
 *                 type: string
 *                 example: "Good experience, but could improve."
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', ReviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Partially update a review
 *     description: Partially updates a review by its ID. Only the fields provided will be modified.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 3
 *               review:
 *                 type: string
 *                 example: "Partial comment updated."
 *     responses:
 *       200:
 *         description: Review partially updated successfully.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', ReviewController.patchReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: Removes a review by its ID.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted successfully.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', ReviewController.deleteReview);

export default router;
