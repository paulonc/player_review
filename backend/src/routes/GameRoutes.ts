import { Router } from "express";
import GameController from "../controllers/GameController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Endpoints for game management
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of games
 *     description: Returns all registered games.
 *     tags:
 *       - Games
 *     responses:
 *       200:
 *         description: Successfully retrieved game list.
 */
router.get("/", GameController.getAllGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     description: Returns a game by its unique identifier.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the game.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved game.
 *       404:
 *         description: Game not found.
 */
router.get("/:id", GameController.getGame);

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     description: Adds a new game to the system.
 *     tags:
 *       - Games
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Witcher 3: Wild Hunt"
 *               description:
 *                 type: string
 *                 example: "The Witcher 3: Wild Hunt is a role-playing game with a complex story and a vast open world."
 *               companyId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               releaseDate:
 *                 type: string
 *                 example: "2015-05-19T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Game created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post("/", GameController.create);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game by ID
 *     description: Updates a game's information by its unique identifier.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the game.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Witcher 3: Wild Hunt"
 *               description:
 *                 type: string
 *                 example: "The Witcher 3: Wild Hunt is a role-playing game with a complex story and a vast open world."
 *               companyId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               releaseDate:
 *                 type: string
 *                 example: "2015-05-19T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Game updated successfully.
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", GameController.update);

/**
 * @swagger
 * /games/{id}:
 *   patch:
 *     summary: Update a game's release date by ID
 *     description: Updates a game's release date by its unique identifier.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the game.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               releaseDate:
 *                 type: string
 *                 example: "2015-05-19T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Release date updated successfully.
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/:id", GameController.updateReleaseDate);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     description: Deletes a game by its unique identifier.
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the game.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Game deleted successfully.
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", GameController.delete);

export default router;
