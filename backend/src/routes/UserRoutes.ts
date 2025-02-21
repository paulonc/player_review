import { Router } from "express";
import UserController from "../controllers/UserController";

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
 *     responses:
 *       200:
 *         description: Successfully retrieved user list.
 */ 
router.get("/", UserController.getAllUsers);

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
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               type:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post("/", UserController.register);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Returns a user by their unique identifier.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved user.
 */
router.get("/:id", UserController.getUser);

router.put("/:id", UserController.updateUser);
router.patch("/:id/password", UserController.changePassword);
router.delete("/:id", UserController.deleteUser);
router.patch("/:id", UserController.updatePassword);


export default router;
