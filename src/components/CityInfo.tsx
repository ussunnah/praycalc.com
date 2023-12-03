// src/components/CityInfo.tsx
import React from 'react';
import { DateTime } from 'luxon';
import { CityInfoProps } from '../types/city'; // Importing CityInfoProps from types

const CityInfo: React.FC<CityInfoProps> = ({ cityData }) => {
  return (
    <div className="bg-green-200 rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-medium">{cityData.n}</h2>
        {cityData.p && <p className="text-sm text-gray-500">Population: {cityData.p.toLocaleString()}</p>}
        {cityData.e && <p className="text-sm text-gray-500">Elevation: {cityData.e}m</p>}
        <p className="text-xs text-gray-400">{cityData.t}</p>
      </div>
    </div>
  );
};

export default CityInfo;


{/*
  <Map latitude={cityData.y} longitude={cityData.x} originalLat={cityData.originalLat} originalLng={cityData.originalLng} />

  const formatCurrentTime = (format: string) => {
    return currentTime ? currentTime.toFormat(format) : '';
  };
  
  <p className="text-sm text-center font-medium mt-5">{formatCurrentTime('MMMM d, yyyy')}</p>
  <p className="text-sm text-center font-medium ">{formatCurrentTime('HH:mm:ss')}</p>
*/}
