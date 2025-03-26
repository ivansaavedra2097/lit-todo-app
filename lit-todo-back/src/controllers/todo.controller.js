import { config } from "../config/config.db.js";
import { Connection } from "../config/connection.db.js";

const pool = new Connection(config);

export class TodoController {

    static async allFrom(id) {
        try {
            const todos = await pool.query(`SELECT * FROM todos WHERE user_id = ?`, [id]);
            return todos;
        } catch (error) {
            throw new Error( error.message );
        }
    }

    static async create({ title, description, user_id }) {
        try {
            const [ result ] = await pool.query(`INSERT INTO todos (title, description, user_id, completed) VALUES (?,?,?,?)`,[
                title,
                description,
                user_id,
                false
            ]);
            const todo = await pool.query(`SELECT * FROM todos WHERE id = ?`, [ result.insertId ]);
            return todo;
        } catch (error) {
            throw new Error( error.message );
        }
    }

}