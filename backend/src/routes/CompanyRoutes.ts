import { Router } from "express";
import CompanyController from "../controllers/CompanyController";

const router = Router();

router.post("/", CompanyController.create);
router.get("/:id", CompanyController.getCompany);
router.get("/", CompanyController.getAllCompanies);
router.put("/:id", CompanyController.update);
router.patch("/:id", CompanyController.update);
router.delete("/:id", CompanyController.delete);

export default router;
