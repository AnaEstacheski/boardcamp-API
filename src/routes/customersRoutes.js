import { Router } from "express";
import { customerValidation } from "../middlewares/customerValidation.js"
import { insertCustomer, getCustomers, getCustomerById, updateCustomer } from "../controllers/customersController.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", customerValidation, insertCustomer);
router.put("/customers/:id", customerValidation, updateCustomer);

export default router;