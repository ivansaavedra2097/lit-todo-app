import express, { Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Connection } from '../config/connection.db';
import { config } from '../config/config.db';

const connection = new Connection(config);

const router = express.Router();

router.post('/register', async (req = Request, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta de Inicio de Sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [
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
            'tu_secreto_jwt', // Reemplaza con tu secreto
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta de Logout (ejemplo, se puede implementar de varias maneras)
router.post('/logout', (req, res) => {
    // En un logout sin tokens guardados en el cliente no hay acciones que hacer en el backend.
    res.json({ message: 'Sesión cerrada' });
});