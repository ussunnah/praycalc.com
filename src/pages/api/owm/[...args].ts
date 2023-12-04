// src/pages/api/owm/[...args].ts
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
