import { Router } from "express";
import GameController from "../controllers/GameController";

const router = Router();

router.post("/", GameController.create);
router.get("/:id", GameController.getGame);
router.get("/", GameController.getAllGames);
router.put("/:id", GameController.update);
router.patch("/:id", GameController.updateReleaseDate);
router.delete("/:id", GameController.delete);

export default router;
