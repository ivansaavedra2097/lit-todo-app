import express from "express";

const app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('Todo app');
});

app.listen( port, () => {
    console.log(process.env.APP_ENVIRONMENT)
    console.log(`app listening on port ${port}`)
})