import { connectionDB } from "../database/db.js";
import customerSchema from "../models/customerSchema.js";

export async function customerValidation(req, res, next) {
    const { cpf } = req.body;

    const { error } = customerSchema.validate(req.customerObj, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details.map(detail => detail.message))
    }

    try {
        const cpfExists = await connectionDB.query(
            `SELECT * FROM customers WHERE cpf=$1;`,
            [cpf]
        );
        if (cpfExists.rows.length > 0) {
            return res.sendStatus(409);
        }
    } catch (error) {
        console.log(err)
        res.status(500).send(err.message);
    }

    next();
}