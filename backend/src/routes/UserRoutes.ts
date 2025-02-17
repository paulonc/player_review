import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.register);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.patch("/:id/password", UserController.changePassword);
router.delete("/:id", UserController.deleteUser);


export default router;
