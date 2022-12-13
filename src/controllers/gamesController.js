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
    if (name) {
        try {
            const gamesQuery = await connectionDB.query(
                `SELECT games.*, categories.name AS "categoryName" 
                FROM games JOIN categories ON games."categoryId" = categories.id 
                WHERE LOWER(games.name) LIKE LOWER($1)`,
                [`%${name}%`]
            );
            return res.send(gamesQuery.rows);
        } catch (err) {
            return res.sendStatus(400).send(err.message);
        }
    }
    try {
        const games = await connectionDB.query(
            `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;`
        );
        return res.send(games.rows);
    } catch (error) {
        return res.sendStatus(500).send(err.message);
    }
}