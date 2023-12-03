// src/pages/api/geo/[...args].ts
import { NextApiRequest, NextApiResponse } from 'next';
import rawData from '../../../../data/geo.json';

interface GeoDataItem {
  i?: string | number; // ID (Airport IATA code or Zipcode)
  n: string; // Name
  p?: number; // Population (only for cities)
  e: number; // Elevation
  y: number; // Latitude
  x: number; // Longitude
  t: string; // Timezone
}

// Explicitly assert the type of geoData as GeoDataItem[]
const geoData: GeoDataItem[] = rawData as GeoDataItem[];

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const args = req.query.args as string[];
  if (args.length === 2) {
    const latitude = parseFloat(args[0]);
    const longitude = parseFloat(args[1]);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      const result = geoData.reduce((prev, curr) => {
        const prevDist = Math.sqrt(
          Math.pow(prev.y - latitude, 2) + Math.pow(prev.x - longitude, 2)
        );
        const currDist = Math.sqrt(
          Math.pow(curr.y - latitude, 2) + Math.pow(curr.x - longitude, 2)
        );

        return prevDist < currDist ? prev : curr;
      });

      return res.status(200).json(result);
    } else {
      return res.status(400).json({ error: 'Invalid latitude or longitude values' });
    }
  } else if (args.length === 1) {
    const searchTerm = args[0].toLowerCase();

    // Check for exact airport code match first
    const exactAirportMatch = geoData.find(item => item.i?.toString().toLowerCase() === searchTerm);
    if (exactAirportMatch) {
      return res.status(200).json(exactAirportMatch);
    }

    // If not an exact airport code, proceed to find possible city matches
    let possibleMatches = geoData.filter(item => 
      item.n.toLowerCase().startsWith(searchTerm) ||
      (item.i?.toString().toLowerCase().startsWith(searchTerm))
    );

    // Sort possible matches by population, if available, or by name
    possibleMatches.sort((a, b) => (b.p || 0) - (a.p || 0) || a.n.localeCompare(b.n));

    if (possibleMatches.length > 0) {
      return res.status(200).json(possibleMatches[0]);
    } else {
      return res.status(404).json({ error: 'Location data not found' });
    }
  } else {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }
};

export default handler;
