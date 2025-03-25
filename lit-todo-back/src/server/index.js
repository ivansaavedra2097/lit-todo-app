import express from "express"

export class Server {
    constructor() {
        this.app = express();
        // this.middleware();
        this.routes();
    }

    // middleware() {

    // }

    routes() {
        this.app.use()
    }
}