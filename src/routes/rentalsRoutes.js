import { Router } from "express";
import { insertRental } from "../controllers/rentalsController.js";
import { rentalValidation } from "../middlewares/rentalValidation.js";

const router = Router();

router.post("/rentals", rentalValidation, insertRental);
// router.get("/rentals", );
// router.post("/rentals/:id/return", );
// router.delete("/rentals/:id", );

export default router;