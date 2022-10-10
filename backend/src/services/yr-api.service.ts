import axios from 'axios';
import * as dateFns from 'date-fns';
import { IWeatherCache, WeatherCache } from '../models/weather-cache.model.';

// A third-party service for getting weather forecast
export namespace YRApiService {
    export async function getForecast(lat: string, lng: string, areaName: string) {
        let cache: IWeatherCache | null = null;

        // initialize header for request
        const headers: {
            "user-agent": string,
            "if-modified-since"?: string;
        } = {
            'user-agent': "MyDemoApp/1.0.0 (me@jhakeinson.com)",
        };

        try {
            // Check if the given areaName has a cached record
            cache = await WeatherCache.findOne({
                areaName
            }).lean().exec();

            if (cache) { // If cached,
                // Check if the cache expired
                if(!dateFns.isFuture(cache?.expiresAt)) {
                    // If cache expired, set If-Modified-Since header
                    // according to this documentation: https://developer.yr.no/doc/locationforecast/HowTO/
                    const ifModifiedSince = dateFns.formatRFC7231(cache.lastModified);
                    headers["if-modified-since"] = ifModifiedSince;
                } else {
                    console.log('Returning cached data...');

                    // Return the retrieved cache if not expired
                    return summarizeForecast(cache.forecast, areaName);
                }
            }
        } catch (err) {
            throw err;
        }

         // Round off coordinates to 4 decimals as yr.no API required
         // More info: https://developer.yr.no/doc/locationforecast/HowTO/
         const rndLat = Number(lat).toFixed(4);
         const rndLng = Number(lng).toFixed(4);

        const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact.json`

        try {
            const response = await axios.get(url, {
                params: {
                    lat: rndLat,
                    lon: rndLng
                },
                headers: headers,
                validateStatus: function (status) {
                    return status < 400; // Resolve only if the status code is less than 400
                }
            });

            if (response.status === 304) {
                console.log('Returning cached data...');
                return summarizeForecast(cache, areaName);
            }

            if (response.status === 200) {
                const forecast = response.data;
                const resHeaders = response.headers;

                WeatherCache.findOneAndUpdate({
                    areaName: areaName
                }, {
                    lastModified: new Date(resHeaders["last-modified"] as string),
                    expiresAt: new Date(resHeaders["expires"] as string),
                    forecast: forecast
                }, {
                    upsert: true
                }).exec().then(() => {
                    console.log("Caching successful!")
                })

                return summarizeForecast(forecast, areaName);
            }
        } catch (err) {
            throw err;
        }
    }

    // A function for standardizing and summarizing the forecast data
    function summarizeForecast(forecast: any, areaName: string) {
        const latestData = forecast.properties.timeseries[0];
        const units = forecast.properties.meta.units;

         return {
            areaName,
            time: latestData.time,
            windSpeed: {
                value: latestData.data.instant.details.wind_speed,
                unit: units.wind_speed
            },
            humidity: {
                value: latestData.data.instant.details.relative_humidity,
                unit: units.relative_humidity
            },
            airTemperature: {
                value: latestData.data.instant.details.air_temperature,
                unit: units.air_temperature === 'celsius'? '° C': '° F'
            },
            forecastSummary: latestData.data.next_1_hours.summary.symbol_code
        };
    }
}
