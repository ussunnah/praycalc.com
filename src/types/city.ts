// src/types/city.ts
import { DateTime } from 'luxon';

export interface CityInfoProps {
  cityData: {
    n?: string; // City name
    p?: number; // Population
    e?: number; // Elevation
    y?: number; // Latitude
    x?: number; // Longitude
    t?: string; // Timezone
    originalLat?: number; // Original Latitude
    originalLng?: number; // Original Longitude
  };
  currentTime?: DateTime; // currentTime is optional
}

export interface CityWeatherProps {
    weatherData: WeatherData;
    currentTime: DateTime;
  }

export interface WeatherData {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: { all: number };
    wind: { speed: number; deg: number };
    rain?: { '3h': number };
    snow?: { '3h': number };
  }
  
  export interface CityTimesProps {
    prayerTimes: PrayerTimes;
    currentTime: DateTime;
  }

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Qiyam: string;
  Angles: number[];
  Methods: { [key: string]: string[] };
}

/* export interface PrayerTimes {
    Qiyam: string;
    Fajr: string;
    Sunrise: string;
    Noon: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    Methods: Record<string, [string, string]>;
    Angles: number[];
  } */