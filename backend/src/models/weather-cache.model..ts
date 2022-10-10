import mongoose, { Schema } from "mongoose";

export interface IWeatherCache {
    areaName: string;
    lastModified: Date;
    expiresAt: Date;
    forecast: object;
}

export const WeatherCache = mongoose.model<IWeatherCache>(
    'weather_cache',
    new Schema<IWeatherCache>({
        areaName: {type: String, required: true, index: true},
        lastModified: {type: Date, required: true},
        expiresAt: {type: Date, required: true, expires: 0},
        forecast: {type: Object, required: true}
    })
);
