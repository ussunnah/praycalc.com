// src/components/CityWeather.tsx
import React from 'react';
import { DateTime } from 'luxon';
import { WeatherData, CityWeatherProps } from '../types/city';

const CityWeather: React.FC<CityWeatherProps> = ({ weatherData }) => {
  return (
    <div className="mt-4 bg-yellow-100 rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <p className="text-s text-gray-800">Temperature: {weatherData.main.temp}°C</p>
        <p className="text-xs text-gray-400">Weather: {weatherData.weather[0].description}</p>
        <p className="text-xs text-gray-400">Feels Like: {weatherData.main.feels_like}°C</p>
        <p className="text-xs text-gray-400">Pressure: {weatherData.main.pressure} hPa</p>
        <p className="text-xs text-gray-400">Humidity: {weatherData.main.humidity}%</p>
        <p className="text-xs text-gray-400">Clouds: {weatherData.clouds.all}%</p>
        <p className="text-xs text-gray-400">Wind Speed: {weatherData.wind.speed} m/s</p>
        <p className="text-xs text-gray-400">Wind Direction: {weatherData.wind.deg}°</p>
        {weatherData.rain && <p className="text-xs text-gray-400">Rain: {weatherData.rain['3h']} mm</p>}
        {weatherData.snow && <p className="text-xs text-gray-400">Snow: {weatherData.snow['3h']} mm</p>}
        <br/>
        <p className="text-xs text-gray-400">Forecast: {DateTime.fromMillis(weatherData.dt * 1000).toFormat('HH:mm')}</p>
      </div>
    </div>
  );
};

export default CityWeather;
