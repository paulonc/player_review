import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/register", UserController.register);
router.get("/:id", UserController.getUser);
router.get("/", UserController.getAllUsers);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);


export default router;
