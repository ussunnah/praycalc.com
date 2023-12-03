// src/utils/getActivePrayer.ts
import { DateTime } from 'luxon';
import { PrayerTimes } from '../types/city';

export const getActivePrayer = (
  prayerTimes: PrayerTimes, 
  currentTime: DateTime, 
  mainPrayers: string[]
): string | null => {
  const adjustedPrayerTimes = Object.fromEntries(
    Object.entries(prayerTimes).map(([key, value]) => {
      const time = DateTime.fromISO(value as string);
      return [key, time.set({ year: currentTime.year, month: currentTime.month, day: currentTime.day })];
    })
  );

  const fajrTime = adjustedPrayerTimes['Fajr'] as DateTime;
  const ishaTime = adjustedPrayerTimes['Isha'] as DateTime;

  if (currentTime >= ishaTime || currentTime < fajrTime) {
    return 'Isha';
  }

  for (let i = 0; i < mainPrayers.length; i++) {
    const currentPrayer = mainPrayers[i];
    if (currentPrayer === 'Isha') continue;

    const currentPrayerTime = adjustedPrayerTimes[currentPrayer as keyof PrayerTimes] as DateTime;
    if (!currentPrayerTime) continue;

    const nextPrayer = mainPrayers[(i + 1) % mainPrayers.length];
    const nextPrayerTime = adjustedPrayerTimes[nextPrayer as keyof PrayerTimes] as DateTime;

    if (currentTime >= currentPrayerTime && currentTime < nextPrayerTime) {
      return currentPrayer;
    }
  }

  return null;
};
