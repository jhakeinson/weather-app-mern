import * as dotenv from 'dotenv';
dotenv.config()
import express, { NextFunction, Request, Response } from 'express';
import WeatherRouter from './routes/weather.route';
import cors from 'cors';

class Server {
    public express: express.Application;
    private weatherRouter: WeatherRouter;

    constructor() {
        this.express =  express();
        this.weatherRouter = new WeatherRouter();
        this.express.use(cors());

        this.routes();
        this.catchAllUnknownRoutes();
    }

    // Setup routes
    private routes() {
        this.express.use('/api', this.weatherRouter.router);
    }

    // Catch all middleware for catching unknown routes
    private catchAllUnknownRoutes() {
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).send("Route not found!");
        });
    }
}

export default new Server().express;