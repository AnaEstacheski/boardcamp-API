import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const { originalPrice } = req.rentalObj;

    try {
        const rentDate = dayjs(Date.Now).format("YYYY-MM-DD");
        let returnDate = null;
        let delayFee = null;

        await connectionDB.query(
            `INSERT INTO rentals 
            ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")  
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]
        );
        return res.sendStatus(201);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
