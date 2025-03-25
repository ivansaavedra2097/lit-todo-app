import express from "express";
import authRoutes from "./src/routes/auth.js"
import cors from "cors";

const app = express();

const port = 5000;

app.use( cors() )
app.use( express.json() );

app.use("/api/auth", authRoutes ); 

app.get('/', (req, res) => {
    res.send('Todo app');
});

app.listen( port, () => {
    console.log(process.env.APP_ENVIRONMENT)
    console.log(`app listening on port ${port}`)
})