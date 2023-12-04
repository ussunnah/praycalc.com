// src/hooks/useCurrentTime.ts
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const useCurrentTime = (timezone: string | null, testing: boolean = false) => {
  const [currentTime, setCurrentTime] = useState(DateTime.now().setZone(timezone || 'local'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prevTime => {
        return testing ? prevTime.plus({ hours: 1 }) : DateTime.now().setZone(timezone || 'local');
      });
    }, 1000); // Changed to 1000 for a 1-second interval

    return () => clearInterval(timer);
  }, [timezone, testing]);

  return currentTime;
};

export default useCurrentTime;
