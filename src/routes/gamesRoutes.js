import { Router } from "express";
import { gameValidation } from "../middlewares/gameValidation.js";
import { insertGame, getGames  } from "../controllers/gamesController.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", gameValidation, insertGame);

export default router;