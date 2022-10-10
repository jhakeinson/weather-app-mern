import { Router } from 'express';
import WeatherController from '../controllers/weather.controller';

class WeatherRouter {
    public router: Router;
    private weatherController: WeatherController;

    constructor() {
        this.router = Router();
        this.weatherController  = new WeatherController();

        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/', this.weatherController.getWeather);
    }
}

export default WeatherRouter;