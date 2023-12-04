// src/components/City.tsx
import React from 'react';
import Image from 'next/image';
import { useCity } from '../context/CityContext';
import useCurrentTime from '../hooks/useCurrentTime';
import useCalcTimesAll from '../hooks/useCalcTimesAll';
import useWeather from '../hooks/useWeather';

import CityInfo from './CityInfo';
import CityWeather from './CityWeather';
import CityMoon from './CityMoon';
import CityTimes from './CityTimes';

const City: React.FC = () => {
  const { cityData } = useCity();
  const timezone = cityData?.t ?? null; // Get timezone from cityData
  const currentTime = useCurrentTime(timezone);


  const lat = cityData?.y?.toString() ?? '0';
  const lng = cityData?.x?.toString() ?? '0';
  const { weather, isLoading: isWeatherLoading, error: weatherError } = useWeather(lat, lng, currentTime);
  const weatherData = weather !== null ? weather : undefined;

  const prayerTimes = useCalcTimesAll(cityData, weatherData, currentTime.startOf('day').toJSDate());

  if (isWeatherLoading || !weather || !prayerTimes) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/loading.gif" alt="Loading" width={128} height={128} />
      </div>
    );
  }

  if (weatherError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>
          <Image src="/error.webp" alt="Error" width={64} height={64} />
          Unable to connect to server. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64 w-full px-4 pt-1">
        <CityInfo cityData={cityData ?? {}} />
        <CityWeather weatherData={weather.list[0]} currentTime={currentTime} />
        <CityMoon sunsetTime={prayerTimes?.Maghrib ?? ''} currentTime={currentTime}  />
      </div>
      <div className="flex-1">
        <CityTimes prayerTimes={prayerTimes} currentTime={currentTime} />
      </div>
    </div>
  );
};

export default React.memo(City);
