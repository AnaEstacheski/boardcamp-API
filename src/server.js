import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import categoriesRoutes from "./routes/categoriesRoutes.js";
import gamesRoutes from "./routes/gamesRoutes.js";
import customersRoutes from "./routes/customersRoutes.js";
import rentalsRoutes from "./routes/rentalsRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customersRoutes);
app.use(rentalsRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));