import { Router } from "express";
import { categoryValidation } from "../middlewares/categoryValidation.js";
import { insertCategory, getCategories  } from "../controllers/categoriesController.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", categoryValidation, insertCategory);

export default router;