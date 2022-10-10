import { Request, Response } from "express";
import Geonames from 'geonames.js';
import { GeonamesService } from "../services/geonames.service";
import { YRApiService } from "../services/yr-api.service";



class WeatherController {
    
    async getWeather(req: Request, res: Response): Promise<Response> {
        let q = (req.query?.location || '') as string | number;
        
        try {
            const geocodeData = await GeonamesService.getGeocode(q);
            if (geocodeData) {
                const forecast = await YRApiService.getForecast(geocodeData.lat, geocodeData.long, geocodeData.name);
                return res.status(200).json(forecast);
            }
        } catch (err: any) {
            console.error(err);
            return res.status(500).send('Something went wrong with your request.');
        }

        return res.status(404).send("We cannot find that address in the database.");
    }
}

export default WeatherController;
