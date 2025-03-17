import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for user management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Returns all registered users.
 *     tags:
 *       - Users
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
 *         description: Successfully retrieved user list.
 *       500:
 *          description: Internal server error.
 */
router.get('/', authenticate, UserController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Returns a user by their unique identifier.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user.
 *       404:
 *         description: User not found.
 *       500:
 *          description: Internal server error.
 */
router.get('/:id', authenticate, UserController.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 enum: ["USER", "ADMIN"]
 *                 example: "ADMIN"
 *     responses:
 *       201:
 *         description: User created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/', UserController.register);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates a user's information by their unique identifier.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ["USER", "ADMIN"]
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', authenticate, UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user's password by ID
 *     description: Updates a user's password by their unique identifier.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', authenticate, UserController.updatePassword);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user by their unique identifier.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  UserController.deleteUser,
);

export default router;
