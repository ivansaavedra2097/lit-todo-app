import { config } from "../config/config.db.js";
import { Connection } from "../config/connection.db.js";

const userKeys = ['id', 'email', 'username'];

const pool = new Connection(config);

export class UserController {

    /**
     * @param {String|number} value 
     * @param {@'id'|'email'|'username'} key
     */
    static async find(value, key = "id") {
        try {

            if (!userKeys.includes(key)) throw new Error("Invalid user key");

            const [user] = await pool.query(
                `SELECT * FROM users WHERE ${key} = ? LIMIT 1`,
                [value]
            );
            return user;
        } catch (error) {
            console.error("Error finding user:", error);
            throw error;
        }
    }
}