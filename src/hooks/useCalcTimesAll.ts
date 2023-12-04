// src/hooks/useCalcTimesAll.ts
import { useEffect, useState, useRef } from 'react';
import { calcTimesAll } from 'pray-calc';
import { PrayerTimes } from '../types/city';
import getOffset from '../utils/getOffset';
import { DateTime } from 'luxon';
import { WeatherApiData } from '../types/weather';

const useCalcTimesAll = (cityData: any, weatherData: WeatherApiData | undefined, currentDate: Date) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const lastCalcDate = useRef<DateTime>(DateTime.fromJSDate(currentDate));

  useEffect(() => {
    if (!cityData || !weatherData || !currentDate) {
      //console.log('Missing data for calculation:', { cityData, weatherData, currentDate });
      return;
    }

    const currentDateTime = DateTime.fromJSDate(currentDate);
    if (lastCalcDate.current.hasSame(currentDateTime, 'day') && prayerTimes) {
      //console.log('Skipping prayer times calculation: Same day and prayer times already calculated');
      return;
    }

    lastCalcDate.current = currentDateTime;

    const lat = cityData.originalLat || cityData.y;
    const lng = cityData.originalLng || cityData.x;
    const elevation = cityData.e;
    const timezone = cityData.t;
    const tz = timezone ? getOffset(timezone) : 0;

    const currentWeatherIndex = weatherData.list.findIndex((w: any) => new Date(w.dt_txt) <= currentDate);
    const currentWeather = weatherData.list[currentWeatherIndex >= 0 ? currentWeatherIndex : 0];
    const temp = currentWeather ? currentWeather.main.temp : 0;
    const pressure = currentWeather ? currentWeather.main.pressure : 0;

    const calculatedTimes = calcTimesAll(currentDate, lat, lng, tz, elevation, temp, pressure);
    setPrayerTimes(calculatedTimes as unknown as PrayerTimes);
  }, [cityData, weatherData, currentDate, prayerTimes]);

  return prayerTimes;
};

export default useCalcTimesAll;
