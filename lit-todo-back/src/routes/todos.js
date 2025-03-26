import express from "express";
import { JWT } from "../utils/jtw.js";
import { TodoController } from "../controllers/todo.controller.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { id } = await JWT.verify( req.headers.authorization );
        const todos = await TodoController.allFrom( id );
        res.status(200).json({ todos });
    } catch (error) {
        const errorMessage = error.message;
        if( errorMessage === "invalid signature" ) return  res.status(401).json({
            error: errorMessage 
        });
        res.status(500).json({ error: errorMessage })
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    try {
        const { id } = await JWT.verify( req.headers.authorization );
        const todo = await TodoController.create({
            title,
            description,
            user_id: id
        });
        res.status(200).json({ todo });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

export default router;