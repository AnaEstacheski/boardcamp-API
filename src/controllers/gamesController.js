import { connectionDB } from "../database/db.js";

export async function insertGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connectionDB.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`,
            [name, image, stockTotal, categoryId, pricePerDay]
        );
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getGames(req, res) {
    const { name } = req.query
    try {
       const games = await connectionDB.query(
            "SELECT * FROM games;"
        );
        res.status(200).send(games);
    } catch (err) {
        res.sendStatus(500).send(err.message);
    }
}