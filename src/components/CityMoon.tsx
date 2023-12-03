import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { getMoon } from 'pray-calc';
import { getHijri } from '../utils/getHijri'; // Make sure the path is correct
import getCycle from '../utils/getCycle';

interface CityMoonProps {
  currentTime: DateTime;
  sunsetTime: string;
}

const CityMoon: React.FC<CityMoonProps> = ({ sunsetTime, currentTime }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  const useDate = DateTime.fromISO(sunsetTime) < currentTime ? currentTime.plus({ days: 1 }) : currentTime;
  const mm = getCycle(useDate.toJSDate());
  const moonData = getMoon(useDate.toJSDate());
  const moonPhase = moonData.phase * 100;
  const moonPhaseName = moonData.phaseName;
  const moonPhaseSymbol = moonData.phaseSymbol;
  const moonVisibility = moonData.visibility * 100;

  const hShort = getHijri(useDate);
  const hLong = getHijri(useDate, 'iMMMM iDD, iYYYY');

  return (
    <div className={`mt-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl`}>
      <div className="p-4 bg-black">
        <div>
          <Image src={'/mm/'+mm} width={256} height={256} alt="moon" />
        </div>
        <div className="text-m text-gray-400 text-center">
          <p onClick={toggleDetails} style={{ cursor: 'pointer' }}>
            {hLong} <span className="text-s pl-2 text-gray-600">{showDetails ? '▲' : '▼'}</span>
          </p>
          {showDetails && (
            <div className="mt-5 text-xs text-gray-500">
              <p>Date: {hShort}</p>
              <p>Cycle: {moonPhase.toFixed(4)}%</p>
              <p>Visibility: {moonVisibility.toFixed(2)}%</p>
              <p>{moonPhaseSymbol} {moonPhaseName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityMoon;
