import { connectionDB } from "../database/db.js";
import gameSchema from "../models/gameSchema.js";

export async function gameValidation(req, res, next) {
    const { name, categoryId } = req.body;

    const { error } = gameSchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message))
        return
    }

    try {
        const categoryExist = await connectionDB.query("SELECT * FROM categories WHERE id=$1", [categoryId]);
        if (!categoryExist.rows[0]) {
            return res.sendStatus(400);
        }
        const categoryName = await connectionDB.query("SELECT * FROM categories WHERE name=$1", [name]);
        if(categoryName.rows[0]) {
            return res.sendStatus(409);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }

    next();
}