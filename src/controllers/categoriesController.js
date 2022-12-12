import { connectionDB } from "../database/db.js";

export async function insertCategory(req, res) {
    const { name } = req.body;

    try {
        await connectionDB.query(
            "INSERT INTO categories (name) VALUES ($1);",
            [name]
        );
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getCategories(req, res) {
    try {
       const categories = await connectionDB.query(
            "SELECT * FROM categories;"
        );
        res.status(200).send(categories);
    } catch (err) {
        res.sendStatus(500).send(err.message);
    }
}