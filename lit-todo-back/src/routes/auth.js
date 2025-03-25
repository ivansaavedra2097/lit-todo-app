import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Connection } from '../config/connection.db.js';
import { config } from '../config/config.db.js';
import { UserController } from '../controllers/user.controller.js';

const connection = new Connection(config);

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const resp = await connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        console.log({ resp })
        const [result] = resp;
        console.log({ result })
        res.json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta de Inicio de Sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await connection.query('SELECT * FROM users WHERE email = ?', [
            email,
        ]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.SECRET_JWT, // Reemplaza con tu secreto
            { expiresIn: '8h' }
        );

        delete user.password;

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/current-user', async (req, res) => {
    const bearerToken = req.headers.authorization ?? null;

    try {
        if (!bearerToken || bearerToken.includes("null")) throw new Error("No token sended");

        const token = bearerToken.split(" ")[1];
        console.log({ token })

        jwt.verify(
            token,
            process.env.SECRET_JWT,
            async (err, decoded) => {
                console.log('error', {err })
                if (err) throw new Error(err);
                const user = await UserController.find( decoded?.id );
                if( !user ) throw new Error("Invalid token");

                res.status(200).json({ user });
            }
        );

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

// Ruta de Logout (ejemplo, se puede implementar de varias maneras)
router.post('/logout', (req, res) => {
    // En un logout sin tokens guardados en el cliente no hay acciones que hacer en el backend.
    res.json({ message: 'Sesión cerrada' });
});

export default router;