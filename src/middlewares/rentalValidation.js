import { connectionDB } from "../database/db.js";
import { rentalSchema } from "../models/rentalSchema.js"

export async function rentalValidation(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    const { error } = rentalSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details.map(detail => detail.message))
    }

    let originalPrice = 0;
    try {
        const findGame = await connectionDB.query(
            `SELECT * FROM games WHERE id=$1`,
            [gameId]
        );
        if (findGame.rows.length === 0) {
            return res.sendStatus(400);
        }
        const originalPrice = daysRented * findGame.rows[0].pricePerDay;
        const findCustomer = await connectionDB.query(
            `SELECT * FROM customers WHERE id=$1`,
            [customerId]
        );
        if (findCustomer.rows.length === 0) {
            return res.sendStatus(400);
        }

        const rentedGames = await connectionDB.query(
            `SELECT * FROM rentals WHERE id=$1`,
            [gameId]
        );
        const availableGame = rentedGames.rows.filter(
            (rental) => rental.returnDate === null
        );
        if (daysRented <= 0 || availableGame.length >= findGame.rows[0].stockTotal) {
            return res.sendStatus(400);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
    req.rentalObj = { originalPrice }
    next();
}