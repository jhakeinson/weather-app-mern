import Geonames from 'geonames.js';

// A third-party service for getting latitude and longitude coordinates
export namespace GeonamesService {
    export interface Geocode {
        lat: string;
        long: string;
        name: string;
    }

    const geo = Geonames({
        username: 'jhakeinson',
        lan: 'en',
        encoding: 'JSON'
    });

    // Get coordinates of queried place
    export async function getGeocode(query: string | number): Promise<Geocode | null> {
        let data: Geocode | null = null;

        try {
            data = await geo.search({
                q: query
            }).then((result) => {
                if (!result) {
                    return null;
                }

                if (result.totalResultsCount == 0) {
                    return null
                }

                const geonameRes = result.geonames[0];

                return {
                    lat: geonameRes.lat,
                    long: geonameRes.lng,
                    name: geonameRes.adminName1
                }
            });

            return data;
        } catch (err: any) {
            throw Error("Failed fetching geocode: " + err.message);
        }
    }
}

