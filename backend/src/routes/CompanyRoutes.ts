import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';
import { authorize } from '../middlewares/authMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Endpoints for company management
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get a list of companies
 *     description: Returns all registered companies.
 *     tags:
 *       - Companies
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
 *         description: Successfully retrieved company list.
 *       500:
 *          description: Internal server error.
 */
router.get('/', authenticate, CompanyController.getAllCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     description: Returns a company by its unique identifier.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the company.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Successfully retrieved company.
 *       404:
 *         description: Company not found.
 *       500:
 *          description: Internal server error.
 */
router.get('/:id', authenticate, CompanyController.getCompany);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     description: Adds a new company to the system.
 *     tags:
 *       - Companies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "CD Projekt Red"
 *               country:
 *                 type: string
 *                 example: "Poland"
 *     responses:
 *       201:
 *         description: Company created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticate, authorize(['ADMIN']), CompanyController.create);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company by ID
 *     description: Updates a company's information by its unique identifier.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the company.
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
 *                 example: "CD Projekt Red"
 *               country:
 *                 type: string
 *                 example: "Poland"
 *     responses:
 *       200:
 *         description: Company updated successfully.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  CompanyController.update,
);

/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     summary: Update a company's name by ID
 *     description: Updates a company's name by its unique identifier.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the company.
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
 *                 example: "CD Projekt Red"
 *     responses:
 *       200:
 *         description: Company information updated successfully.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  CompanyController.updateCompanyName,
);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     description: Deletes a company by its unique identifier.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the company.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       204:
 *         description: Company deleted successfully.
 *       404:
 *         description: Company not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  CompanyController.delete,
);

export default router;
