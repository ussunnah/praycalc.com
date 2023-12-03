// src/pages/api/omw/[...args].ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface CacheEntry {
  data: any;  // Define a more specific type for your data as needed
  timestamp: number;
}

let cache: Record<string, CacheEntry> = {};
let currentKeyIndex = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const args = req.query.args as string[];
  const lat = args[0];
  const lng = args[1];

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const truncatedLat = parseFloat(lat).toFixed(2);
  const truncatedLng = parseFloat(lng).toFixed(2);
  const cacheKey = `${truncatedLat},${truncatedLng}`;

  if (cache[cacheKey] && cache[cacheKey].timestamp > Date.now() - 24 * 60 * 60 * 1000) {
    return res.status(200).json(cache[cacheKey].data);
  }

  const apiKey = getNextApiKey();
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${truncatedLat}&lon=${truncatedLng}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`Failed to fetch weather data: ${response.statusText}`);

    const data = await response.json();
    cache[cacheKey] = { data, timestamp: Date.now() };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

function getNextApiKey(): string {
  const keys = process.env.OWM_API_KEYS?.split(',') || [];
  const key = keys[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % keys.length;
  return key;
}

/*
NYC coordinates: 40.7127837, -74.0059413
https://api.openweathermap.org/data/2.5/forecast?lat=40.71&lon=-74.00&appid=c042d642dc34a3178eb51337bad170a4

{"cod":"200","message":0,"cnt":40,"list":[{"dt":1699790400,"main":{"temp":2.3,"feels_like":-1.61,"temp_min":2.3,"temp_max":3.75,"pressure":1033,"sea_level":1033,"grnd_level":1033,"humidity":67,"temp_kf":-1.45},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.25,"deg":16,"gust":5.82},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2023-11-12 12:00:00"},{"dt":1699801200,"main":{"temp":3.3,"feels_like":-0.02,"temp_min":3.3,"temp_max":5.29,"pressure":1033,"sea_level":1033,"grnd_level":1033,"humidity":59,"temp_kf":-1.99},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":29},"wind":{"speed":3.67,"deg":18,"gust":4.13},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2023-11-12 15:00:00"},{"dt":1699812000,"main":...
*/
