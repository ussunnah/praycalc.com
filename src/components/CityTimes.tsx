// src/components/CityTimes.tsx
import React, { useMemo } from 'react';
import { DateTime } from 'luxon';
import { CityTimesProps, PrayerTimes } from '../types/city';
import { getActivePrayer } from '../utils/getActivePrayer';

const mainPrayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const CityTimes: React.FC<CityTimesProps> = ({ prayerTimes, currentTime }) => {
  const activePrayer = useMemo(() => {
    const active = getActivePrayer(prayerTimes, currentTime, mainPrayers);
    return active;
  }, [prayerTimes, currentTime]);

  const formatTime = (time: string | undefined, seconds = true) => {
    return typeof time === 'string' ? DateTime.fromISO(time).toFormat(seconds ? 'HH:mm:ss' : 'HH:mm') : '';
  };

  return (
    <div className="w-full max-w-full p-4">
      <h2 className="font-papyrus font-medium text-xl mb-12">
        <span>{currentTime.toFormat('MMMM d, yyyy :: HH:mm:ss')}</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mainPrayers.map(prayer => {
          const time = prayerTimes[prayer as keyof PrayerTimes] as string;
          const isActive = prayer === activePrayer;

          const tileClasses = `border rounded-lg p-4 h-24 flex flex-col justify-between text-center ${
            isActive
              ? (prayer === 'Sunrise' ? 'border-gray-500 bg-gray-300' : 'border-green-500 bg-green-200')
              : (prayer === 'Sunrise' ? 'border-gray-300 bg-gray-100' : 'border-gray-300 bg-white')
          }`;

          return (
            <div key={prayer} className={tileClasses}>
              <div className="font-bold">{prayer}</div>
              <div>{formatTime(time)}</div>
            </div>
          );
        })}
      </div>

      <div className="flex mt-2 pb-5 text-xs">
        <p>Qiyam: {formatTime(prayerTimes['Qiyam'] as string)}</p>
        <span className="mx-2">|</span>
        <p>Fajr Angle: {(prayerTimes['Angles'] as number[])[0].toFixed(4)}°</p>
        <span className="mx-2">|</span>
        <p>Isha Angle: {(prayerTimes['Angles'] as number[])[1].toFixed(4)}°</p>
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-4 text-gray-600">
        <h3 className="text-sm font-semibold mb-2 col-span-2 md:col-span-5">Other Methods</h3>
        {Object.entries(prayerTimes['Methods'] as Record<string, [string, string]>).map(([method, times]) => (
          <div key={method} className="p-2 bg-gray-100 rounded-md">
            <p className="text-sm font-semibold text-center">{method}</p>
            {times.map((time, index) => (
              <p key={index} className="text-xs text-center">
                {index === 0 ? 'Fajr: ' : 'Isha: '}
                {formatTime(time)}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CityTimes);
