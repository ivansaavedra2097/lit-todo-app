import express from "express"

export class Server {
    constructor() {
        this.app = express();
        this.port = 5000;
    }
}