import { connectionDB } from "../database/db.js";
import categorySchema from "../models/categorySchema.js";

export async function categoryValidation(req, res, next) {
    const { name } = req.body

    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message))
        return
    }

    try {
        const categoryName = await connectionDB.query("SELECT * FROM categories WHERE name=$1", [name]);
        if(categoryName[0]) {
            return res.sendStatus(409);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }

    next();
}