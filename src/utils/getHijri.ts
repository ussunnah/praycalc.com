// src/utils/getHijri.ts
import { DateTime } from 'luxon';
import { toHijri, formatHijriDate } from 'luxon-hijri';

/**
 * Converts a Gregorian date to a Hijri date with a specified format.
 * @param currentTime - The DateTime object to convert.
 * @param format - The string format for the Hijri date (optional).
 * @returns The formatted Hijri date.
 */
export const getHijri = (currentTime: DateTime, format: string = 'iYYYY-iMM-iDD'): string => {
  const useDate = currentTime.toJSDate();
  const hijriDate = toHijri(useDate);

  return hijriDate ? formatHijriDate(hijriDate, format) : '';
};
