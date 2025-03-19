import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import { authorize } from '../middlewares/authMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints for category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get a list of categories
 *     description: Returns all registered categories.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved category list.
 *       500:
 *          description: Internal server error.
 */
router.get('/', authenticate, CategoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Returns a category by its unique identifier.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the category.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Successfully retrieved category.
 *       404:
 *         description: Category not found.
 *       500:
 *          description: Internal server error.
 */
router.get('/:id', authenticate, CategoryController.getCategory);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Adds a new category to the system.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Action"
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticate, authorize(['ADMIN']), CategoryController.create);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: Updates a category's information by its unique identifier.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the category.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Action"
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  CategoryController.update,
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Deletes a category by its unique identifier.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the category.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       204:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  CategoryController.delete,
);

/**
 * @swagger
 * /categories/top-rated:
 *   get:
 *     summary: Get top-rated categories
 *     description: Returns a list of top-rated categories.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: The number of top-rated categories to return
 *     responses:
 *       200:
 *         description: Successfully retrieved top-rated categories.
 *       500:
 *          description: Internal server error.
 */
router.get('/top-rated', authenticate, CategoryController.getTopRatedCategories);

export default router;
