import mysql from "mysql2/promise";

export class Connection {
    constructor(config) {
        this.config = config;
        this.pool = mysql.createPool(this.config)
    }

    async getConnection() {
        return this.pool.getConnection();
    }

    async query(sql, values) {
        let connection;
        try {
            connection = await this.getConnection();
            const resp = await connection.query(sql, values);
            const [rows] = resp;
            return rows;
        } catch (error) {
            console.error('Error en la consulta:', error);
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    async execute(sql, values) {
        let connection;
        try {
            connection = await this.getConnection();
            const [rows] = await connection.execute(sql, values);
            return rows;
        } catch (error) {
            console.error('Error en la ejecucion:', error);
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    async close() {
        return this.pool.end();
    }
}