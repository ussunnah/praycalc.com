// src/hooks/useWeather.ts
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { WeatherApiData } from '../types/weather';

const useWeather = (lat: string, lng: string, currentTime: DateTime): { weather: WeatherApiData | null, isLoading: boolean, error: string | null } => {
  const [weather, setWeather] = useState<WeatherApiData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const truncatedLat = parseFloat(lat).toFixed(2);
        const truncatedLng = parseFloat(lng).toFixed(2);
        const response = await fetch(`/api/owm/${truncatedLat}/${truncatedLng}`);
        
        if (!response.ok) {
          throw new Error(`Weather data fetch failed: ${response.statusText}`);
        }

        const data = await response.json() as WeatherApiData;
        setWeather(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng]);

  return { weather, isLoading, error };
};

export default useWeather;
