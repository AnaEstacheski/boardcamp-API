import { connectionDB } from "../database/db.js";

export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        await connectionDB.query(
            `INSERT INTO 
            customers ("name", "phone", "cpf", "birthday" ) VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]
        );
        return res.sendStatus(201);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

export async function getCustomers(req, res) {
    const { cpf } = req.query;
    if (cpf) {
        try {
            const findCustomers = await connectionDB.query(
                `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'yyyy-mm-dd') AS "birthday" FROM customers 
                WHERE LOWER(customers.cpf) LIKE ($1);`,
                [`${findCustomers}%`]
            );
            return res.send(findCustomers.rows);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
    try {
        const customers = await connectionDB.query(
            `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'yyyy-mm-dd') AS "birthday" FROM customers;`
        );
        return res.send(customers.rows);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;
    if (id) {
        try {
            const customerId = await connectionDB.query(
                `SELECT * FROM customers
                WHERE id = $1 ;`,
                [id]
            );
            res.status(200).send(customerId.rows[0]);
            if (customerId.rows.length === 0) {
                return res.sendStatus(404);
            }
            return
        } catch (err) {
            return res.status(400).send(err.message);
        }
    }
}

export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    try {
        await connectionDB.query(
            `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`,
            [name, phone, cpf, birthday, id]
        );
        return res.sendStatus(200);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}